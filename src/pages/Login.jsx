import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/authStore';

export default function Login() {
  const { isAuthenticated, loading, signInWithGoogle } = useAuth();
  const location = useLocation();
  const [error, setError] = useState('');
  const nextPath = location.state?.from || '/profile';

  if (!loading && isAuthenticated) {
    return <Navigate to={nextPath} replace />;
  }

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Unable to start Google sign-in.');
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-[780px] px-4 pb-24 pt-20 sm:px-6 md:pt-28">
        <div className="rounded-[16px] border border-white/[0.08] bg-[#0E0E0E]/85 p-7 text-center sm:p-10 md:p-12">
          <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary">Account</p>
          <h1 className="font-syne text-[38px] font-[800] leading-[1.03] text-white md:text-[52px]">Continue with Google</h1>
          <p className="mx-auto mt-4 max-w-[520px] font-sans text-[15px] leading-[1.7] text-text-secondary">
            Sign in to save your business profile and keep your cart synced to your account.
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-9 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85 sm:w-auto"
          >
            Continue with Google
          </button>

          {error && <p className="mt-4 font-sans text-[13px] text-red-400">{error}</p>}
        </div>
      </section>
    </Layout>
  );
}
