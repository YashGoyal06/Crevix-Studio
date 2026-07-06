export const sendAgreementEmail = async ({ type, agreement, signature, signedPdf }) => {
  const endpoint = import.meta.env.VITE_SENDGRID_AGREEMENT_ENDPOINT;

  const payload = {
    type,
    agreement_id: agreement.id,
    document_id: agreement.document_id,
    client_name: agreement.client_name,
    client_email: agreement.client_email,
    project_name: agreement.project_name,
    signed_at: signature?.signed_at,
    has_signed_pdf: Boolean(signedPdf),
  };

  if (!endpoint) {
    console.info('SendGrid endpoint not configured. Email payload:', payload);
    return { queued: false, payload };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error('Unable to queue agreement email.');
  return response.json();
};
