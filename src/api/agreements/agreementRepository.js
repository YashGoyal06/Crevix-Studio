import { supabase } from '../../lib/supabaseClient';
import { AGREEMENT_STATUS } from '../../modules/agreements/agreementConstants';
import { createSampleAgreement } from '../../modules/agreements/sampleAgreement';
import { generateAgreementAiContent } from '../../services/ai/agreementAi';
import { generateAgreementPdf } from '../../services/pdf/agreementPdfService';
import { sendAgreementEmail } from '../../services/sendgrid/agreementEmailService';

const TABLES = {
  agreements: 'agreements',
  signatures: 'agreement_signatures',
  auditLogs: 'agreement_audit_logs',
  emails: 'agreement_emails',
};

const getIpAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('IP lookup failed');
    const payload = await response.json();
    return payload.ip;
  } catch {
    return 'Unavailable';
  }
};

const normalizeAgreement = async (agreement) => {
  if (agreement.ai_content) return agreement;

  const aiContent = await generateAgreementAiContent(agreement);
  return { ...agreement, ai_content: aiContent };
};

const createToken = () => {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const createAgreement = async (input) => {
  const token = input.token || createToken();
  const documentId = input.document_id || `CREVIX-${token.slice(0, 8).toUpperCase()}`;
  const aiContent = await generateAgreementAiContent(input);
  const agreement = {
    ...input,
    token,
    document_id: documentId,
    status: AGREEMENT_STATUS.SENT,
    ai_content: aiContent,
    expires_at: input.expires_at || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  };
  const { doc } = generateAgreementPdf({ agreement, signature: null });
  const unsignedPdf = doc.output('blob');

  try {
    const { data, error } = await supabase.from(TABLES.agreements).insert(agreement).select('*').single();
    if (error) throw error;

    const emailResult = await sendAgreementEmail({
      type: 'AGREEMENT_SENT',
      agreement: data,
      signature: null,
      signedPdf: unsignedPdf,
    });

    await recordAgreementEmail({
      agreement: data,
      emailType: 'AGREEMENT_SENT',
      recipient: data.client_email,
      status: emailResult.queued ? 'queued' : 'not_configured',
      providerResponse: emailResult,
    });

    return {
      agreement: data,
      signingUrl: `${window.location.origin}/agreement/${token}`,
      unsignedPdf,
    };
  } catch (error) {
    console.warn(error);
    localStorage.setItem(`crevix_agreement_${token}`, JSON.stringify(agreement));
    return {
      agreement,
      signingUrl: `${window.location.origin}/agreement/${token}`,
      unsignedPdf,
    };
  }
};

export const getAgreementByToken = async (token) => {
  const localAgreement = localStorage.getItem(`crevix_agreement_${token}`);
  if (localAgreement) return normalizeAgreement(JSON.parse(localAgreement));

  try {
    const { data, error } = await supabase
      .from(TABLES.agreements)
      .select('*')
      .eq('token', token)
      .maybeSingle();

    if (error || !data) return normalizeAgreement(createSampleAgreement(token));
    return normalizeAgreement(data);
  } catch {
    return normalizeAgreement(createSampleAgreement(token));
  }
};

export const getSignatureForAgreement = async (agreementId) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.signatures)
      .select('*')
      .eq('agreement_id', agreementId)
      .maybeSingle();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
};

export const saveSignedAgreement = async ({ agreement, signatureImage, signatureMethod, browserInfo, timezone }) => {
  const signedAt = new Date().toISOString();
  const ipAddress = await getIpAddress();
  const signature = {
    agreement_id: agreement.id,
    signature_image: signatureImage,
    signature_method: signatureMethod,
    signed_at: signedAt,
    timezone,
    ip_address: ipAddress,
    email: agreement.client_email,
    browser_info: browserInfo,
  };

  const auditLog = {
    agreement_id: agreement.id,
    event_type: 'SIGNED',
    event_at: signedAt,
    actor_email: agreement.client_email,
    ip_address: ipAddress,
    browser_info: browserInfo,
    metadata: {
      document_id: agreement.document_id,
      timezone,
      status: AGREEMENT_STATUS.COMPLETED,
    },
  };

  try {
    const existing = await getSignatureForAgreement(agreement.id);
    if (existing) throw new Error('This agreement has already been signed.');

    const { data: savedSignature, error: signatureError } = await supabase
      .from(TABLES.signatures)
      .insert(signature)
      .select('*')
      .single();
    if (signatureError) throw signatureError;

    await supabase
      .from(TABLES.agreements)
      .update({ status: AGREEMENT_STATUS.COMPLETED, signed_at: signedAt })
      .eq('id', agreement.id);

    await supabase.from(TABLES.auditLogs).insert(auditLog);

    return savedSignature;
  } catch (error) {
    const localSignature = { id: `sig_${agreement.id}`, ...signature };
    localStorage.setItem(`crevix_signature_${agreement.token}`, JSON.stringify(localSignature));
    localStorage.setItem(`crevix_audit_${agreement.token}`, JSON.stringify(auditLog));
    if (String(error.message || '').includes('already')) throw error;
    return localSignature;
  }
};

export const getLocalSignature = (token) => {
  const raw = localStorage.getItem(`crevix_signature_${token}`);
  return raw ? JSON.parse(raw) : null;
};

export const recordAgreementEmail = async ({ agreement, emailType, recipient, status, providerResponse }) => {
  const emailLog = {
    agreement_id: agreement.id,
    email_type: emailType,
    recipient,
    status,
    provider_response: providerResponse,
    sent_at: new Date().toISOString(),
  };

  try {
    await supabase.from(TABLES.emails).insert(emailLog);
  } catch {
    localStorage.setItem(`crevix_email_${agreement.token}_${emailType}`, JSON.stringify(emailLog));
  }
};
