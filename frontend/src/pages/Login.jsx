import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import SchoolLogo from '@/components/website/SchoolLogo';
import { toast } from 'sonner';

export default function Login() {
  const { login, user, isLoadingAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/Dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (!isLoadingAuth && user) navigate(from, { replace: true });
  }, [user, isLoadingAuth, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Login failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF6E9]">
        <div className="w-10 h-10 border-4 border-[#FF8A5B]/20 border-t-[#FF8A5B] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF6E9] to-[#F7F2EC] px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#FFD84D]/20 p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <SchoolLogo className="w-20 h-20 object-contain mb-3 rounded-full" />
          <h1 className="text-xl font-bold text-[#4A3F35] leading-snug text-center">Navjyoti Kids Villa School</h1>
          <p className="text-sm text-[#4A3F35]/60 mt-1">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#4A3F35]/70 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A5B]"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A3F35]/70 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A5B]"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white font-medium text-sm hover:opacity-95 disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-[#4A3F35]/60 mt-6">
          No account?{' '}
          <Link to="/register" className="text-[#FF8A5B] font-medium hover:underline">
            Register
          </Link>
        </p>
        <p className="text-center mt-4">
          <Link to="/Home" className="text-sm text-[#4A3F35]/50 hover:text-[#FF8A5B]">
            ← Back to website
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
