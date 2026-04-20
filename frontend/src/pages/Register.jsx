import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import SchoolLogo from '@/components/website/SchoolLogo';
import { toast } from 'sonner';

export default function Register() {
  const { register, user, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('parent');
  const [admin_registration_key, setAdminRegistrationKey] = useState('');
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (!isLoadingAuth && user) navigate('/Dashboard', { replace: true });
  }, [user, isLoadingAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { full_name, email, password, role };
      if (role === 'admin' && admin_registration_key.trim()) {
        payload.admin_registration_key = admin_registration_key.trim();
      }
      await register(payload);
      toast.success('Account created!');
      navigate('/Dashboard', { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Registration failed';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF6E9] to-[#F7F2EC] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#FFD84D]/20 p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <SchoolLogo className="w-20 h-20 object-contain mb-3 rounded-full" />
          <h1 className="text-xl font-bold text-[#4A3F35]">Create account</h1>
          <p className="text-sm text-[#4A3F35]/60 mt-1">Parents, teachers, and school admins can register here</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#4A3F35]/70 mb-1.5">Full name</label>
            <input
              required
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A5B]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A3F35]/70 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A5B]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A3F35]/70 mb-1.5">Password (min 6 characters)</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A5B]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#4A3F35]/70 mb-1.5">I am a</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                if (e.target.value !== 'admin') setAdminRegistrationKey('');
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A5B]"
            >
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin (school management)</option>
            </select>
          </div>
          {role === 'admin' && (
            <div>
              <label className="block text-xs font-medium text-[#4A3F35]/70 mb-1.5">Admin registration key</label>
              <input
                type="password"
                required
                value={admin_registration_key}
                onChange={(e) => setAdminRegistrationKey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FF8A5B]"
                placeholder="Provided by your school / IT (backend ADMIN_REGISTRATION_KEY)"
                autoComplete="off"
              />
              <p className="text-[11px] text-[#4A3F35]/50 mt-1.5">
                Admins get full dashboard access (students, teachers, fees, etc.). Without a key, use{' '}
                <code className="text-[10px] bg-gray-100 px-1 rounded">npm run seed</code> in the backend to create the first admin.
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white font-medium text-sm hover:opacity-95 disabled:opacity-60"
          >
            {submitting ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-[#4A3F35]/60 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#FF8A5B] font-medium hover:underline">
            Sign in
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
