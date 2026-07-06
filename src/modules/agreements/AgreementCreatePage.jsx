import { useState } from 'react';
import { Copy, FilePlus2, Loader2, WandSparkles } from 'lucide-react';
import { createAgreement } from '../../api/agreements/agreementRepository';

const initialForm = {
  client_name: '',
  client_email: '',
  brand_name: '',
  project_name: '',
  service_type: 'Logo Design',
  deliverables: '',
  project_description: '',
  timeline: '14 working days',
  revision_count: 3,
  project_cost: 25000,
  advance_amount: 10000,
  remaining_amount: 15000,
  agreement_date: new Date().toISOString(),
};

const fields = [
  ['client_name', 'Client Name', 'text'],
  ['client_email', 'Client Email', 'email'],
  ['brand_name', 'Brand Name', 'text'],
  ['project_name', 'Project Name', 'text'],
  ['deliverables', 'Deliverables', 'textarea'],
  ['project_description', 'Project Description', 'textarea'],
  ['timeline', 'Timeline', 'text'],
  ['revision_count', 'Revision Count', 'number'],
  ['project_cost', 'Project Cost', 'number'],
  ['advance_amount', 'Advance Amount', 'number'],
  ['remaining_amount', 'Remaining Amount', 'number'],
];

export default function AgreementCreatePage() {
  const [form, setForm] = useState(initialForm);
  const [creating, setCreating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreating(true);
    setError('');
    setResult(null);

    try {
      const payload = {
        ...form,
        revision_count: Number(form.revision_count || 0),
        project_cost: Number(form.project_cost || 0),
        advance_amount: Number(form.advance_amount || 0),
        remaining_amount: Number(form.remaining_amount || 0),
        agreement_date: new Date().toISOString(),
      };
      const created = await createAgreement(payload);
      setResult(created);
    } catch (nextError) {
      setError(nextError.message || 'Unable to create agreement.');
    } finally {
      setCreating(false);
    }
  };

  const copyLink = async () => {
    if (!result?.signingUrl) return;
    await navigator.clipboard.writeText(result.signingUrl);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-950 text-white">
            <FilePlus2 size={22} />
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              <WandSparkles size={14} />
              Hidden Agreement Generator
            </p>
            <h1 className="mt-1 text-2xl font-bold">Create Test Agreement</h1>
          </div>
        </div>

        <form className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="service_type">
                Service Type
              </label>
              <select
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-500"
                id="service_type"
                value={form.service_type}
                onChange={(event) => updateField('service_type', event.target.value)}
              >
                <option>Logo Design</option>
                <option>Website Development</option>
                <option>Social Media</option>
                <option>Branding</option>
              </select>
            </div>

            {fields.map(([field, label, type]) => (
              <div key={field} className={type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor={field}>
                  {label}
                </label>
                {type === 'textarea' ? (
                  <textarea
                    className="min-h-24 w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-500"
                    id={field}
                    required
                    value={form[field]}
                    onChange={(event) => updateField(field, event.target.value)}
                  />
                ) : (
                  <input
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-500"
                    id={field}
                    required
                    type={type}
                    value={form[field]}
                    onChange={(event) => updateField(field, event.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white disabled:bg-slate-300"
            type="submit"
            disabled={creating}
          >
            {creating ? <Loader2 className="animate-spin" size={16} /> : <FilePlus2 size={16} />}
            Generate Agreement
          </button>
        </form>

        {error && <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {result && (
          <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="font-bold text-emerald-950">Agreement Created</h2>
            <p className="mt-2 break-all text-sm text-emerald-900">{result.signingUrl}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-3 py-2 text-sm font-bold text-white"
                type="button"
                onClick={copyLink}
              >
                <Copy size={16} />
                Copy Link
              </button>
              <a
                className="inline-flex items-center gap-2 rounded-md border border-emerald-300 bg-white px-3 py-2 text-sm font-bold text-emerald-800"
                href={result.signingUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Agreement
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
