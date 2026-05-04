import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/authStore';
import { supabase } from '../lib/supabaseClient';

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

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      if (!user) return;
      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('business_profiles')
        .select('business_name, phone, website, about')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!active) return;

      if (fetchError) {
        setError('Unable to load profile right now.');
      } else if (data) {
        setHasSavedProfile(true);
        setIsEditing(false);
        setForm({
          businessName: data.business_name || '',
          phone: data.phone || '',
          website: data.website || '',
          about: data.about || '',
        });
      } else {
        setHasSavedProfile(false);
        setIsEditing(true);
      }
      setLoading(false);
    };

    loadProfile();
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

  return (
    <Layout>
      <section className="mx-auto max-w-[980px] px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary">Business Profile</p>
          <h1 className="font-syne text-[38px] font-[800] leading-[1.02] text-white md:text-[56px]">Your Account.</h1>
          <p className="mx-auto mt-4 max-w-[560px] font-sans text-[15px] leading-[1.7] text-text-secondary">
            Logged in as {user?.email}. This profile can be reused during checkout and onboarding.
          </p>
        </div>

        <form onSubmit={handleSave} className="rounded-[16px] border border-white/[0.08] bg-[#0E0E0E]/85 p-5 sm:p-8">
          {loading ? (
            <div className="py-8 text-center font-sans text-[14px] text-text-secondary">Loading profile...</div>
          ) : hasSavedProfile && !isEditing ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Business Name</p>
                  <p className="font-sans text-[15px] text-white">{form.businessName || '-'}</p>
                </div>
                <div className="rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Phone</p>
                  <p className="font-sans text-[15px] text-white">{form.phone || '-'}</p>
                </div>
                <div className="rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-4 sm:col-span-2">
                  <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Website</p>
                  <p className="font-sans text-[15px] text-white">{form.website || '-'}</p>
                </div>
                <div className="rounded-[12px] border border-white/[0.08] bg-white/[0.02] p-4 sm:col-span-2">
                  <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">About</p>
                  <p className="font-sans text-[15px] leading-[1.7] text-white/90 whitespace-pre-wrap">{form.about || '-'}</p>
                </div>
              </div>

              {message && <p className="mt-5 font-sans text-[13px] text-emerald-300">{message}</p>}
              {error && <p className="mt-5 font-sans text-[13px] text-red-400">{error}</p>}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={handleSignOut} className="rounded-full border border-white/[0.12] px-6 py-3.5 text-center font-sans text-[15px] font-medium text-white transition-colors duration-150 hover:border-white/[0.24]">
                  Sign Out
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setMessage('');
                    setError('');
                  }}
                  className="rounded-full bg-white px-6 py-3.5 text-center font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85"
                >
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Business Name</span>
                  <input name="businessName" value={form.businessName} onChange={handleChange} className="w-full rounded-[12px] border border-white/[0.09] bg-transparent px-[18px] py-[14px] font-sans text-[15px] text-white outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-white/[0.35]" placeholder="Your business name" />
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Phone</span>
                  <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-[12px] border border-white/[0.09] bg-transparent px-[18px] py-[14px] font-sans text-[15px] text-white outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-white/[0.35]" placeholder="+91 99999 99999" />
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Website</span>
                  <input name="website" value={form.website} onChange={handleChange} className="w-full rounded-[12px] border border-white/[0.09] bg-transparent px-[18px] py-[14px] font-sans text-[15px] text-white outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-white/[0.35]" placeholder="https://yourdomain.com" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">About</span>
                  <textarea name="about" value={form.about} onChange={handleChange} rows={4} className="w-full rounded-[12px] border border-white/[0.09] bg-transparent px-[18px] py-[14px] font-sans text-[15px] text-white outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-white/[0.35]" placeholder="Tell us briefly about your business." />
                </label>
              </div>

              {message && <p className="mt-5 font-sans text-[13px] text-emerald-300">{message}</p>}
              {error && <p className="mt-5 font-sans text-[13px] text-red-400">{error}</p>}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button type="button" onClick={handleSignOut} className="rounded-full border border-white/[0.12] px-6 py-3.5 text-center font-sans text-[15px] font-medium text-white transition-colors duration-150 hover:border-white/[0.24]">
                  Sign Out
                </button>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {hasSavedProfile && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setMessage('');
                        setError('');
                      }}
                      className="rounded-full border border-white/[0.12] px-6 py-3.5 text-center font-sans text-[15px] font-medium text-white transition-colors duration-150 hover:border-white/[0.24]"
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={saving} className="rounded-full bg-white px-6 py-3.5 text-center font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-45">
                    {saving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </section>
    </Layout>
  );
}
