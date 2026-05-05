import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/authStore';

export default function Login() {
  const { isAuthenticated, loading, signInWithGoogle, signInWithEmail } = useAuth();
  const location = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
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
          <h1 className="font-syne text-[38px] font-[800] leading-[1.03] text-white md:text-[52px]">Welcome Back</h1>
          <p className="mx-auto mt-4 max-w-[520px] font-sans text-[15px] leading-[1.7] text-text-secondary">
            Sign in to access your profile and managed services.
          </p>

          <div className="mt-12 flex flex-col gap-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-5 font-sans text-[16px] font-bold text-[#080808] transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <p className="font-sans text-[13px] text-white/30">
              New to Crevix? Just click above to create your account instantly.
            </p>
          </div>

          {error && <p className="mt-6 font-sans text-[13px] text-red-400">{error}</p>}
        </div>
      </section>
    </Layout>
  );
}
