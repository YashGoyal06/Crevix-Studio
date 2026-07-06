import { jsPDF } from 'jspdf';
import { COMPANY_PROFILE } from '../../modules/agreements/agreementConstants';
import { formatCurrency, formatDate, formatTime, getTimezone } from '../../modules/agreements/agreementFormatters';
import { buildAgreementLatex } from '../../templates/latex/agreementTemplate';

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;

const addHeader = (doc, agreement, pageTitle) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(COMPANY_PROFILE.name, MARGIN, 16);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(COMPANY_PROFILE.status, MARGIN, 21);
  doc.text(agreement.document_id, PAGE_WIDTH - MARGIN, 16, { align: 'right' });
  doc.setDrawColor(220, 226, 235);
  doc.line(MARGIN, 27, PAGE_WIDTH - MARGIN, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(pageTitle, MARGIN, 36);
};

const addFooter = (doc, pageNumber) => {
  doc.setDrawColor(220, 226, 235);
  doc.line(MARGIN, PAGE_HEIGHT - 18, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`${COMPANY_PROFILE.website} | ${COMPANY_PROFILE.email} | ${COMPANY_PROFILE.phone}`, MARGIN, PAGE_HEIGHT - 11);
  doc.text(`Page ${pageNumber} of 4`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 11, { align: 'right' });
};

const addWrapped = (doc, text, x, y, width, lineHeight = 6) => {
  const lines = doc.splitTextToSize(text || 'Not available', width);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
};

const field = (doc, label, value, x, y) => {
  doc.setFont('helvetica', 'bold');
  doc.text(label, x, y);
  doc.setFont('helvetica', 'normal');
  doc.text(String(value || 'Not available'), x + 44, y);
};

export const buildAuditTrail = ({ agreement, signature }) => {
  const signedAt = signature?.signed_at || new Date().toISOString();
  return {
    title: 'Official Service Agreement',
    document_id: agreement.document_id,
    document_pages: 4,
    status: 'COMPLETED',
    timezone: signature?.timezone || getTimezone(),
    signed_date: formatDate(signedAt),
    signed_time: formatTime(signedAt),
    email: signature?.email || agreement.client_email,
    ip_address: signature?.ip_address || 'Captured on signing',
  };
};

export const generateAgreementPdf = ({ agreement, signature }) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const ai = agreement.ai_content || {};
  const auditTrail = buildAuditTrail({ agreement, signature });

  addHeader(doc, agreement, 'Official Service Agreement');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(COMPANY_PROFILE.tagline, MARGIN, 43);

  let y = 57;
  field(doc, 'Client Name', agreement.client_name, MARGIN, y);
  field(doc, 'Client Email', agreement.client_email, 108, y);
  y += 8;
  field(doc, 'Brand Name', agreement.brand_name, MARGIN, y);
  field(doc, 'Project Name', agreement.project_name, 108, y);
  y += 8;
  field(doc, 'Service Type', agreement.service_type, MARGIN, y);
  field(doc, 'Date', formatDate(agreement.agreement_date), 108, y);

  y += 18;
  doc.setFont('helvetica', 'bold');
  doc.text('Project Summary', MARGIN, y);
  doc.setFont('helvetica', 'normal');
  y = addWrapped(doc, ai.project_summary, MARGIN, y + 7, PAGE_WIDTH - MARGIN * 2);

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Deliverables', MARGIN, y);
  doc.setFont('helvetica', 'normal');
  y = addWrapped(doc, ai.deliverables_description || agreement.deliverables, MARGIN, y + 7, PAGE_WIDTH - MARGIN * 2);

  y += 8;
  field(doc, 'Timeline', agreement.timeline, MARGIN, y);
  field(doc, 'Revisions', agreement.revision_count, 108, y);

  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.text('Pricing Table', MARGIN, y);
  y += 7;
  [
    ['Project Cost', formatCurrency(agreement.project_cost)],
    ['Advance Amount', formatCurrency(agreement.advance_amount)],
    ['Remaining Amount', formatCurrency(agreement.remaining_amount)],
  ].forEach(([label, value]) => {
    doc.setDrawColor(229, 231, 235);
    doc.rect(MARGIN, y - 5, PAGE_WIDTH - MARGIN * 2, 9);
    doc.setFont('helvetica', 'bold');
    doc.text(label, MARGIN + 4, y + 1);
    doc.setFont('helvetica', 'normal');
    doc.text(value, PAGE_WIDTH - MARGIN - 4, y + 1, { align: 'right' });
    y += 9;
  });
  addFooter(doc, 1);

  doc.addPage();
  addHeader(doc, agreement, 'Terms & Conditions');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  y = 49;
  const terms = [
    ['Payment Terms', `The client shall pay ${formatCurrency(agreement.advance_amount)} as advance and ${formatCurrency(agreement.remaining_amount)} before final handover.`],
    ['Revision Policy', `${agreement.revision_count || 0} revision rounds are included. Additional revisions may be billed separately.`],
    ['Scope of Work', ai.scope_of_work],
    ['Ownership Rights', 'Final approved assets transfer to the client after complete payment. Working files remain with Crevix Studio unless agreed in writing.'],
    ['Refund Policy', 'Advance payments cover planning, creative time, and reserved production capacity and are non-refundable once work begins.'],
    ['Delays', 'Timeline changes caused by delayed approvals, missing content, or expanded scope will shift delivery dates accordingly.'],
    ['Portfolio Rights', 'Crevix Studio may display completed work in its portfolio unless a written confidentiality restriction is agreed.'],
    ['Communication', 'Official approvals and scope decisions should be shared through written communication.'],
    ...(ai.recommended_clauses || []).map((clause, index) => [`Recommended Clause ${index + 1}`, clause]),
  ];

  terms.forEach(([title, body], index) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${title}`, MARGIN, y);
    doc.setFont('helvetica', 'normal');
    y = addWrapped(doc, body, MARGIN + 6, y + 6, PAGE_WIDTH - MARGIN * 2 - 6, 5) + 4;
  });
  addFooter(doc, 2);

  doc.addPage();
  addHeader(doc, agreement, 'Acceptance & Signatures');
  y = 55;
  field(doc, 'Client Name', agreement.client_name, MARGIN, y);
  field(doc, 'Brand Name', agreement.brand_name, MARGIN, y + 9);
  field(doc, 'Date', signature ? formatDate(signature.signed_at) : 'Pending', MARGIN, y + 18);
  doc.setDrawColor(17, 24, 39);
  doc.rect(MARGIN, y + 28, 76, 28);
  if (signature?.signature_image) doc.addImage(signature.signature_image, 'PNG', MARGIN + 3, y + 31, 70, 22);
  doc.setFontSize(8);
  doc.text('Client Signature', MARGIN, y + 62);

  field(doc, 'Authorized Representative', COMPANY_PROFILE.representative, MARGIN, y + 82);
  field(doc, 'Designation', COMPANY_PROFILE.designation, MARGIN, y + 91);
  field(doc, 'Date', signature ? formatDate(signature.signed_at) : formatDate(agreement.agreement_date), MARGIN, y + 100);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Crevix Studio', MARGIN, y + 119);
  doc.setFontSize(8);
  doc.text('Company Signature', MARGIN, y + 126);
  addFooter(doc, 3);

  doc.addPage();
  addHeader(doc, agreement, 'Audit Trail');
  y = 54;
  [
    ['TITLE', auditTrail.title],
    ['DOCUMENT ID', auditTrail.document_id],
    ['DOCUMENT PAGES', auditTrail.document_pages],
    ['STATUS', auditTrail.status],
    ['TIME ZONE', auditTrail.timezone],
  ].forEach(([label, value]) => {
    field(doc, label, value, MARGIN, y);
    y += 9;
  });

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('DOCUMENT HISTORY', MARGIN, y);
  y += 11;
  [
    ['Signed date', auditTrail.signed_date],
    ['Signed time', auditTrail.signed_time],
    ['Signed by email', auditTrail.email],
    ['IP address', auditTrail.ip_address],
  ].forEach(([label, value]) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(MARGIN, y - 6, PAGE_WIDTH - MARGIN * 2, 10, 'F');
    field(doc, label, value, MARGIN + 4, y);
    y += 12;
  });
  addFooter(doc, 4);

  const latexSource = buildAgreementLatex({ agreement, signature, auditTrail });
  return { doc, latexSource, auditTrail };
};
