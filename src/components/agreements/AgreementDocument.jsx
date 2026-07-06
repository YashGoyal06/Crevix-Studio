import { CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { COMPANY_PROFILE } from '../../modules/agreements/agreementConstants';
import { formatCurrency, formatDate, formatTime } from '../../modules/agreements/agreementFormatters';

const SectionTitle = ({ children }) => (
  <h2 className="mb-4 border-b border-slate-200 pb-2 text-lg font-bold text-slate-950">{children}</h2>
);

const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-sm text-slate-950">{value || 'Not available'}</p>
  </div>
);

const PageShell = ({ children, pageNumber }) => (
  <section className="mx-auto mb-8 min-h-[980px] max-w-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
    {children}
    <footer className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <span>
        {COMPANY_PROFILE.website} | {COMPANY_PROFILE.email} | {COMPANY_PROFILE.phone}
      </span>
      <span>Page {pageNumber} of 4</span>
    </footer>
  </section>
);

export default function AgreementDocument({ agreement, signature, auditTrail }) {
  const ai = agreement.ai_content || {};
  const clauses = ai.recommended_clauses || [];

  return (
    <div className="agreement-document">
      <PageShell pageNumber={1}>
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{COMPANY_PROFILE.status}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">{COMPANY_PROFILE.name}</h1>
            <p className="mt-1 text-sm text-slate-600">{COMPANY_PROFILE.tagline}</p>
          </div>
          <div className="rounded-md border border-slate-200 px-4 py-3 text-left sm:text-right">
            <p className="text-xs font-bold uppercase text-slate-500">Document ID</p>
            <p className="mt-1 font-mono text-sm text-slate-950">{agreement.document_id}</p>
          </div>
        </header>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-950">Official Service Agreement</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This agreement records the service terms between Crevix Studio and the client named below.
          </p>
        </div>

        <SectionTitle>Client Information</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <InfoRow label="Client Name" value={agreement.client_name} />
          <InfoRow label="Client Email" value={agreement.client_email} />
          <InfoRow label="Brand Name" value={agreement.brand_name} />
          <InfoRow label="Project Name" value={agreement.project_name} />
          <InfoRow label="Service Type" value={agreement.service_type} />
          <InfoRow label="Agreement Date" value={formatDate(agreement.agreement_date)} />
        </div>

        <div className="mt-8 space-y-7">
          <div>
            <SectionTitle>Project Summary</SectionTitle>
            <p className="text-sm leading-7 text-slate-700">{ai.project_summary}</p>
          </div>
          <div>
            <SectionTitle>Deliverables</SectionTitle>
            <p className="text-sm leading-7 text-slate-700">{ai.deliverables_description || agreement.deliverables}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <InfoRow label="Timeline" value={agreement.timeline} />
            <InfoRow label="Revision Count" value={agreement.revision_count} />
          </div>
          <div>
            <SectionTitle>Pricing Table</SectionTitle>
            <div className="overflow-hidden rounded-md border border-slate-200">
              {[
                ['Project Cost', formatCurrency(agreement.project_cost)],
                ['Advance Amount', formatCurrency(agreement.advance_amount)],
                ['Remaining Amount', formatCurrency(agreement.remaining_amount)],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 border-b border-slate-200 last:border-b-0">
                  <div className="bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">{label}</div>
                  <div className="px-4 py-3 text-right text-sm font-semibold text-slate-950">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageShell>

      <PageShell pageNumber={2}>
        <SectionTitle>Terms & Conditions</SectionTitle>
        <div className="space-y-5 text-sm leading-7 text-slate-700">
          {[
            ['Payment Terms', `The client shall pay ${formatCurrency(agreement.advance_amount)} as advance and ${formatCurrency(agreement.remaining_amount)} before final handover.`],
            ['Revision Policy', `${agreement.revision_count || 0} revision rounds are included. Additional revisions may be billed separately.`],
            ['Scope of Work', ai.scope_of_work],
            ['Ownership Rights', 'Final approved assets transfer to the client after complete payment. Working files remain with Crevix Studio unless agreed in writing.'],
            ['Refund Policy', 'Advance payments cover planning, creative time, and reserved production capacity and are non-refundable once work begins.'],
            ['Delays', 'Timeline changes caused by delayed approvals, missing content, or expanded scope will shift delivery dates accordingly.'],
            ['Portfolio Rights', 'Crevix Studio may display completed work in its portfolio unless a written confidentiality restriction is agreed.'],
            ['Communication', 'Official approvals and scope decisions should be shared through written communication.'],
          ].map(([title, body], index) => (
            <div key={title}>
              <h3 className="font-bold text-slate-950">
                {index + 1}. {title}
              </h3>
              <p>{body}</p>
            </div>
          ))}
          {clauses.map((clause, index) => (
            <div key={clause}>
              <h3 className="font-bold text-slate-950">Recommended Clause {index + 1}</h3>
              <p>{clause}</p>
            </div>
          ))}
        </div>
      </PageShell>

      <PageShell pageNumber={3}>
        <SectionTitle>Acceptance & Signatures</SectionTitle>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-md border border-slate-200 p-5">
            <h3 className="font-bold text-slate-950">Client Section</h3>
            <div className="mt-5 space-y-4">
              <InfoRow label="Client Name" value={agreement.client_name} />
              <InfoRow label="Brand Name" value={agreement.brand_name} />
              <InfoRow label="Date" value={signature ? formatDate(signature.signed_at) : 'Pending'} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Signature</p>
                <div className="mt-2 flex h-28 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50">
                  {signature?.signature_image ? (
                    <img className="max-h-24 max-w-full object-contain" src={signature.signature_image} alt="Client signature" />
                  ) : (
                    <span className="text-sm text-slate-400">Pending signature</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-slate-200 p-5">
            <h3 className="font-bold text-slate-950">Company Section</h3>
            <div className="mt-5 space-y-4">
              <InfoRow label="Authorized Representative" value={COMPANY_PROFILE.representative} />
              <InfoRow label="Designation" value={COMPANY_PROFILE.designation} />
              <InfoRow label="Date" value={signature ? formatDate(signature.signed_at) : formatDate(agreement.agreement_date)} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Signature</p>
                <div className="mt-2 flex h-28 items-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-4">
                  <span className="text-2xl font-bold text-slate-950">Crevix Studio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageShell>

      <PageShell pageNumber={4}>
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-950">Audit Trail Page</h2>
            <p className="text-sm text-slate-600">Professional e-sign completion certificate</p>
          </div>
        </div>

        <div className="grid gap-4 rounded-md border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
          <InfoRow label="TITLE" value="Official Service Agreement" />
          <InfoRow label="DOCUMENT ID" value={agreement.document_id} />
          <InfoRow label="DOCUMENT PAGES" value="4" />
          <InfoRow label="STATUS" value={signature ? 'COMPLETED' : 'PENDING'} />
          <InfoRow label="TIME ZONE" value={auditTrail?.timezone || 'Pending'} />
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <FileText size={18} />
            <h3 className="font-bold text-slate-950">Document History</h3>
          </div>
          <div className="rounded-md border border-slate-200">
            {[
              ['Signed date', auditTrail?.signed_date || 'Pending'],
              ['Signed time', auditTrail?.signed_time || 'Pending'],
              ['Signed by email', auditTrail?.email || agreement.client_email],
              ['IP address', auditTrail?.ip_address || 'Captured on signing'],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-2 border-b border-slate-200 px-4 py-4 last:border-b-0 sm:grid-cols-[180px_1fr]">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
                <span className="text-sm text-slate-950">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {signature && (
          <div className="mt-8 flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            <CheckCircle2 size={20} />
            <span className="text-sm font-semibold">COMPLETED on {formatDate(signature.signed_at)} at {formatTime(signature.signed_at)}</span>
          </div>
        )}
      </PageShell>
    </div>
  );
}
