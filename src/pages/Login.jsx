import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/authStore';

export default function Login() {
  const { isAuthenticated, loading, signInWithGoogle, signInWithEmail } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('gamingyash54@gmail.com');
  const [password, setPassword] = useState('Yash@123');
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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsLoggingIn(false);
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

          <form onSubmit={handleEmailLogin} className="mt-10 flex flex-col gap-4 text-left">
            <div>
              <label className="mb-2 block font-sans text-[13px] text-text-secondary" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-4 font-sans text-[15px] text-white outline-none focus:border-white/[0.2] focus:bg-white/[0.05]"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-sans text-[13px] text-text-secondary" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-4 font-sans text-[15px] text-white outline-none focus:border-white/[0.2] focus:bg-white/[0.05]"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="mt-2 flex w-full items-center justify-center rounded-full bg-white px-8 py-4 font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85 disabled:opacity-50"
            >
              {isLoggingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/[0.08]"></span>
            </div>
            <div className="relative flex justify-center text-[12px] uppercase tracking-widest text-text-secondary">
              <span className="bg-[#0E0E0E] px-4">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] px-8 py-4 font-sans text-[15px] font-medium text-white transition-all duration-150 hover:bg-white/[0.08]"
          >
            Continue with Google
          </button>

          {error && <p className="mt-4 font-sans text-[13px] text-red-400">{error}</p>}
        </div>
      </section>
    </Layout>
  );
}
