import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, FileCheck2, Loader2, Lock, Sparkles } from 'lucide-react';
import { useParams } from 'react-router-dom';
import AgreementDocument from '../../components/agreements/AgreementDocument';
import SignaturePad from '../../components/agreements/SignaturePad';
import {
  getAgreementByToken,
  getLocalSignature,
  getSignatureForAgreement,
  recordAgreementEmail,
  saveSignedAgreement,
} from '../../api/agreements/agreementRepository';
import { AGREEMENT_STATUS } from './agreementConstants';
import { assertCsrfToken, assertSigningRateLimit, getCsrfToken, isExpired } from './agreementSecurity';
import { buildBrowserInfo, getTimezone } from './agreementFormatters';
import { buildAuditTrail, generateAgreementPdf } from '../../services/pdf/agreementPdfService';
import { sendAgreementEmail } from '../../services/sendgrid/agreementEmailService';

export default function AgreementPage() {
  const { token } = useParams();
  const [agreement, setAgreement] = useState(null);
  const [signature, setSignature] = useState(null);
  const [signatureDraft, setSignatureDraft] = useState({ image: '', method: 'draw' });
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const csrfToken = useMemo(() => getCsrfToken(token), [token]);
  const expired = agreement ? isExpired(agreement) : false;
  const locked = Boolean(signature) || agreement?.status === AGREEMENT_STATUS.COMPLETED || expired;
  const auditTrail = signature && agreement ? buildAuditTrail({ agreement, signature }) : null;

  useEffect(() => {
    let active = true;

    const loadAgreement = async () => {
      setLoading(true);
      setError('');
      const loadedAgreement = await getAgreementByToken(token);
      const savedSignature = (await getSignatureForAgreement(loadedAgreement.id)) || getLocalSignature(token);

      if (!active) return;
      setAgreement(savedSignature ? { ...loadedAgreement, status: AGREEMENT_STATUS.COMPLETED } : loadedAgreement);
      setSignature(savedSignature);
      setLoading(false);
    };

    loadAgreement();
    return () => {
      active = false;
    };
  }, [token]);

  const handleSignatureChange = useCallback((nextSignature) => {
    setSignatureDraft(nextSignature);
  }, []);

  const downloadPdf = (currentSignature = signature) => {
    if (!agreement) return null;
    const { doc } = generateAgreementPdf({ agreement, signature: currentSignature });
    const fileName = `${agreement.document_id}-${currentSignature ? 'signed' : 'unsigned'}.pdf`;
    doc.save(fileName);
    return doc.output('blob');
  };

  const downloadLatex = () => {
    if (!agreement) return;
    const { latexSource } = generateAgreementPdf({ agreement, signature });
    const blob = new Blob([latexSource], { type: 'application/x-tex' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${agreement.document_id}.tex`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleSign = async () => {
    setError('');
    setSuccess('');

    try {
      if (!signatureDraft.image) throw new Error('Add your signature before confirming.');
      if (locked) throw new Error('This agreement is locked and cannot be edited.');
      assertCsrfToken(token, csrfToken);
      assertSigningRateLimit(token);

      setSigning(true);
      const savedSignature = await saveSignedAgreement({
        agreement,
        signatureImage: signatureDraft.image,
        signatureMethod: signatureDraft.method,
        browserInfo: buildBrowserInfo(),
        timezone: getTimezone(),
      });

      const signedPdf = generateAgreementPdf({ agreement, signature: savedSignature }).doc.output('blob');
      const emailResult = await sendAgreementEmail({
        type: 'SIGNED_AGREEMENT_ATTACHED',
        agreement,
        signature: savedSignature,
        signedPdf,
      });

      await recordAgreementEmail({
        agreement,
        emailType: 'SIGNED_AGREEMENT_ATTACHED',
        recipient: agreement.client_email,
        status: emailResult.queued ? 'queued' : 'not_configured',
        providerResponse: emailResult,
      });

      setSignature(savedSignature);
      setAgreement((current) => ({ ...current, status: AGREEMENT_STATUS.COMPLETED, signed_at: savedSignature.signed_at }));
      setSuccess('Agreement signed successfully. A signed PDF is ready to download.');
    } catch (nextError) {
      setError(nextError.message || 'Unable to sign agreement.');
    } finally {
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-950">
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="animate-spin" size={28} />
        </div>
      </main>
    );
  }

  if (!agreement) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 text-slate-950">
        <div className="mx-auto mt-20 max-w-xl rounded-md border border-slate-200 bg-white p-6 text-center">
          <h1 className="text-xl font-bold">Agreement not found</h1>
          <p className="mt-2 text-sm text-slate-600">Please check the secure link and try again.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              <Sparkles size={14} />
              Secure Agreement
            </p>
            <h1 className="mt-1 text-xl font-bold text-slate-950">{agreement.project_name}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
              type="button"
              onClick={() => downloadPdf()}
            >
              <Download size={16} />
              PDF
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
              type="button"
              onClick={downloadLatex}
            >
              <FileCheck2 size={16} />
              LaTeX
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <AgreementDocument agreement={agreement} signature={signature} auditTrail={auditTrail} />

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
                <Lock size={18} />
              </div>
              <div>
                <h2 className="font-bold text-slate-950">{locked ? 'Agreement Locked' : 'Sign Agreement'}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {expired
                    ? 'This secure signing link has expired.'
                    : locked
                      ? 'This agreement has been completed and can no longer be edited.'
                      : 'Add your signature and confirm to complete the agreement.'}
                </p>
              </div>
            </div>

            {!locked && (
              <div className="mt-5">
                <SignaturePad clientName={agreement.client_name} onChange={handleSignatureChange} />
                <input type="hidden" value={csrfToken} readOnly />
                <button
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                  type="button"
                  onClick={handleSign}
                  disabled={signing}
                >
                  {signing ? <Loader2 className="animate-spin" size={16} /> : <FileCheck2 size={16} />}
                  Confirm Signature
                </button>
              </div>
            )}

            {signature && (
              <button
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-3 text-sm font-bold text-white"
                type="button"
                onClick={() => downloadPdf(signature)}
              >
                <Download size={16} />
                Download Signed PDF
              </button>
            )}

            {error && <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            {success && <p className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{success}</p>}
          </div>
        </aside>
      </div>
    </main>
  );
}
