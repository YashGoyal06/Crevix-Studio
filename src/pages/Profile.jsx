import { useEffect, useState, useMemo } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/authStore';
import { supabase } from '../lib/supabaseClient';
import { webPlans, addOns, designServices, designPackages } from '../data/pricing';

/* ── Palette ── */
const C = {
  deepForest: '#0D3B2E',
  sage:       '#6F8A6E',
  warmStone:  '#D8D2C4',
  gold:       '#B88C3A',
  charcoal:   '#2B2F2E',
};

const emptyForm = {
  businessName: '',
  phone: '',
  website: '',
  about: '',
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSavedProfile, setHasSavedProfile] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    let active = true;
    const loadProfileAndPurchases = async () => {
      if (!user) return;
      setLoading(true);
      setError('');

      const [profileResult, purchasesResult] = await Promise.all([
        supabase
          .from('business_profiles')
          .select('business_name, phone, website, about')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('purchased_plans')
          .select('plan_id, status')
          .eq('user_id', user.id)
      ]);

      if (!active) return;

      if (profileResult.error) {
        setError('Unable to load profile right now.');
      } else if (profileResult.data) {
        setHasSavedProfile(true);
        setIsEditing(false);
        setForm({
          businessName: profileResult.data.business_name || '',
          phone: profileResult.data.phone || '',
          website: profileResult.data.website || '',
          about: profileResult.data.about || '',
        });
      } else {
        setHasSavedProfile(false);
        setIsEditing(true);
      }

      if (purchasesResult.data) {
        setPurchasedItems(purchasesResult.data.map(item => ({ id: item.plan_id, status: item.status })));
      }

      setLoading(false);
    };

    loadProfileAndPurchases();
    return () => {
      active = false;
    };
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setMessage('');
    setError('');
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage('');
    setError('');

    const { error: upsertError } = await supabase.from('business_profiles').upsert(
      {
        user_id: user.id,
        email: user.email,
        business_name: form.businessName.trim(),
        phone: form.phone.trim(),
        website: form.website.trim(),
        about: form.about.trim(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );

    if (upsertError) {
      setError('Unable to save profile. Please try again.');
    } else {
      setMessage('Profile saved successfully.');
      setHasSavedProfile(true);
      setIsEditing(false);
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      setError('Unable to sign out right now.');
    }
  };

  const inputClass = "w-full rounded-[12px] border px-[18px] py-[14px] font-sans text-[15px] outline-none transition-all duration-200";
  const inputStyle = {
    color: C.deepForest,
    borderColor: 'rgba(13,59,46,0.25)',
    background: 'rgba(216,210,196,0.4)',
  };

  return (
    <Layout>
      {/* ── Page background ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: C.deepForest }} />

      <section className="relative z-10 mx-auto max-w-[980px] px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em]" style={{ color: C.sage }}>Business Profile</p>
          <h1 className="font-syne text-[38px] font-[800] leading-[1.02] md:text-[56px]" style={{ color: C.warmStone }}>Your Account.</h1>
          <p className="mx-auto mt-4 max-w-[560px] font-sans text-[15px] leading-[1.7]" style={{ color: C.sage }}>
            Logged in as {user?.email}. This profile can be reused during checkout and onboarding.
          </p>
        </div>

        {/* ── Profile Card ── */}
        <form onSubmit={handleSave} className="rounded-[16px] p-5 sm:p-8"
          style={{ background: C.warmStone, border: '1px solid rgba(13,59,46,0.15)', boxShadow: '0 24px 80px rgba(0,0,0,0.15)' }}>
          {loading ? (
            <div className="py-8 text-center font-sans text-[14px]" style={{ color: C.deepForest }}>Loading profile...</div>
          ) : hasSavedProfile && !isEditing ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  { label: 'Business Name', val: form.businessName },
                  { label: 'Phone', val: form.phone },
                  { label: 'Website', val: form.website, span: true },
                  { label: 'About', val: form.about, span: true, pre: true },
                ].map(({ label, val, span, pre }) => (
                  <div key={label} className={`rounded-[12px] p-4 ${span ? 'sm:col-span-2' : ''}`}
                    style={{ border: '1px solid rgba(13,59,46,0.1)', background: 'rgba(13,59,46,0.04)' }}>
                    <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.15em]" style={{ color: C.sage }}>{label}</p>
                    <p className={`font-sans text-[15px] ${pre ? 'leading-[1.7] whitespace-pre-wrap' : ''}`}
                      style={{ color: C.deepForest }}>{val || '—'}</p>
                  </div>
                ))}
              </div>

              {message && <p className="mt-5 font-sans text-[13px]" style={{ color: C.deepForest }}>{message}</p>}
              {error && <p className="mt-5 font-sans text-[13px] text-red-600">{error}</p>}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={handleSignOut}
                  className="rounded-full px-6 py-3.5 text-center font-sans text-[15px] font-medium transition-all duration-200"
                  style={{ border: '1px solid rgba(13,59,46,0.3)', color: C.deepForest }}
                  onMouseEnter={(e) => e.target.style.borderColor = C.gold}
                  onMouseLeave={(e) => e.target.style.borderColor = 'rgba(13,59,46,0.3)'}>
                  Sign Out
                </button>
                <button type="button"
                  onClick={() => { setIsEditing(true); setMessage(''); setError(''); }}
                  className="rounded-full px-6 py-3.5 text-center font-sans text-[15px] font-semibold transition-all duration-200"
                  style={{ background: C.deepForest, color: C.warmStone }}>
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  { label: 'Business Name', name: 'businessName', ph: 'Your business name' },
                  { label: 'Phone', name: 'phone', ph: '+91 99999 99999' },
                  { label: 'Website', name: 'website', ph: 'https://yourdomain.com' },
                ].map((f) => (
                  <label key={f.name} className="block">
                    <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em]" style={{ color: C.deepForest }}>{f.label}</span>
                    <input name={f.name} value={form[f.name]} onChange={handleChange}
                      className={inputClass} style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = C.gold; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(13,59,46,0.25)'; }}
                      placeholder={f.ph} />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em]" style={{ color: C.deepForest }}>About</span>
                  <textarea name="about" value={form.about} onChange={handleChange} rows={4}
                    className={`${inputClass} resize-none`} style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = C.gold; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(13,59,46,0.25)'; }}
                    placeholder="Tell us briefly about your business." />
                </label>
              </div>

              {message && <p className="mt-5 font-sans text-[13px]" style={{ color: C.deepForest }}>{message}</p>}
              {error && <p className="mt-5 font-sans text-[13px] text-red-600">{error}</p>}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={handleSignOut}
                  className="rounded-full px-6 py-3.5 text-center font-sans text-[15px] font-medium transition-all duration-200"
                  style={{ border: '1px solid rgba(13,59,46,0.3)', color: C.deepForest }}
                  onMouseEnter={(e) => e.target.style.borderColor = C.gold}
                  onMouseLeave={(e) => e.target.style.borderColor = 'rgba(13,59,46,0.3)'}>
                  Sign Out
                </button>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {hasSavedProfile && (
                    <button type="button"
                      onClick={() => { setIsEditing(false); setMessage(''); setError(''); }}
                      className="rounded-full px-6 py-3.5 text-center font-sans text-[15px] font-medium transition-all duration-200"
                      style={{ border: '1px solid rgba(13,59,46,0.3)', color: C.deepForest }}
                      onMouseEnter={(e) => e.target.style.borderColor = C.gold}
                      onMouseLeave={(e) => e.target.style.borderColor = 'rgba(13,59,46,0.3)'}>
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={saving}
                    className="rounded-full px-6 py-3.5 text-center font-sans text-[15px] font-semibold transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
                    style={{ background: C.deepForest, color: C.warmStone }}>
                    {saving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </div>
            </>
          )}
        </form>

        {/* ── Your Plans ── */}
        <div className="mt-16">
          <div className="mb-8 pb-6" style={{ borderBottom: '1px solid rgba(216,210,196,0.15)' }}>
            <h2 className="font-syne text-[28px] font-[800]" style={{ color: C.warmStone }}>Your Plans</h2>
            <p className="mt-2 font-sans text-[15px]" style={{ color: C.sage }}>View your active plans and payment status.</p>
          </div>

          <div className="flex flex-col gap-4">
            {purchasedItems.length === 0 ? (
              <div className="rounded-[16px] p-8 text-center font-sans text-[14px]"
                style={{ background: C.warmStone, border: '1px solid rgba(13,59,46,0.15)', color: C.deepForest }}>
                You haven't purchased any plans yet.
              </div>
            ) : (
              purchasedItems.map((item, index) => {
                const allPlans = [...webPlans, ...addOns, ...designServices, ...designPackages];
                const planDetails = allPlans.find(p => p.id === item.id) || { name: item.id, type: 'Custom Plan' };

                return (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-[16px] p-6"
                    style={{ background: C.warmStone, border: '1px solid rgba(13,59,46,0.15)' }}>
                    <div>
                      <h3 className="font-syne text-[18px] font-bold" style={{ color: C.deepForest }}>{planDetails.name}</h3>
                      <p className="mt-1 font-sans text-[13px]" style={{ color: C.sage }}>{planDetails.type}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-3">
                      {item.status === 'full' ? (
                        <div className="rounded-full px-4 py-2 text-[12px] font-sans uppercase tracking-[0.1em]"
                          style={{ border: `1px solid ${C.deepForest}`, background: 'rgba(13,59,46,0.1)', color: C.deepForest }}>
                          Full Amount Done
                        </div>
                      ) : (
                        <div className="rounded-full px-4 py-2 text-[12px] font-sans uppercase tracking-[0.1em]"
                          style={{ border: `1px solid ${C.gold}`, background: 'rgba(184,140,58,0.18)', color: C.gold }}>
                          Advance Given
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
