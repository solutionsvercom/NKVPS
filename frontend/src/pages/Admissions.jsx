import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, FileText, Calendar, Users, GraduationCap } from 'lucide-react';
import { admissionsApi } from '@/services/api';
import { toast } from 'sonner';

const fadeUp = (delay = 0) => ({
  initial: { y: 28 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay },
});

const steps = [
  { icon: FileText, step: '01', title: 'Submit Inquiry', desc: "Fill in the online form with your child's details." },
  { icon: Calendar, step: '02', title: 'Campus Visit', desc: 'Schedule a guided tour at your convenience.' },
  { icon: Users, step: '03', title: 'Meet Educators', desc: 'Interact with our teachers and understand our approach.' },
  { icon: GraduationCap, step: '04', title: 'Enrol', desc: "Complete documentation and secure your child's place." },
];

export default function Admissions() {
  const [form, setForm] = useState({
    child_name: '',
    child_age: '',
    parent_name: '',
    email: '',
    phone: '',
    program_interest: '',
    message: '',
    source: 'website',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let child_age;
      if (form.child_age !== '' && form.child_age != null) {
        const n = Number(form.child_age);
        if (Number.isFinite(n)) child_age = n;
      }
      await admissionsApi.create({
        ...form,
        child_age,
      });
      setSubmitted(true);
      toast.success('Your inquiry has been submitted successfully!');
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        (typeof err?.message === 'string' ? err.message : null) ||
        'Could not submit. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="py-20 section-pink">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Admissions 2026–27</p>
            <h1 className="text-5xl font-light text-[#333333] mb-5">
              Begin Your Child's<br />
              <span className="font-semibold">Journey With Us</span>
            </h1>
            <p className="text-gray-500">We welcome families who share our belief in the transformative power of quality early education.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 section-green">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-3xl font-light text-[#333333]">
              Simple <span className="font-semibold">Admission Process</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-[#E6F9F0]">
                  <s.icon className="w-6 h-6 text-[#4A90E2]" />
                </div>
                <p className="text-xs font-bold text-[#F2A65A] tracking-widest mb-2">STEP {s.step}</p>
                <h4 className="font-semibold text-[#333333] mb-2">{s.title}</h4>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 section-blue">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl font-light text-[#333333]">
              Admission <span className="font-semibold">Inquiry Form</span>
            </h2>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#EAF4FF]">
              <div className="w-16 h-16 bg-[#4A90E2] rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-[#333333] mb-3">Thank You!</h3>
              <p className="text-gray-500">We've received your inquiry and will reach out within 24 hours to schedule a campus visit.</p>
            </motion.div>
          ) : (
            <motion.form {...fadeUp(0.1)} onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-5 shadow-sm border border-[#EAF4FF]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Child's Name *</label>
                  <input
                    required
                    value={form.child_name}
                    onChange={(e) => setForm({ ...form, child_name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#4A90E2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Child's Age</label>
                  <input
                    type="number"
                    value={form.child_age}
                    onChange={(e) => setForm({ ...form, child_age: e.target.value })}
                    placeholder="Age in years"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#4A90E2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Parent's Name *</label>
                  <input
                    required
                    value={form.parent_name}
                    onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#4A90E2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Phone *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#4A90E2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#4A90E2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Program of Interest</label>
                  <select
                    value={form.program_interest}
                    onChange={(e) => setForm({ ...form, program_interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#4A90E2]"
                  >
                    <option value="">Select program</option>
                    <option value="playgroup">Playgroup</option>
                    <option value="nursery">Nursery</option>
                    <option value="lkg">Lower KG</option>
                    <option value="ukg">Upper KG</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Any questions or special requirements?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#4A90E2] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4A90E2] text-white py-3.5 rounded-xl font-medium hover:bg-[#3d7fcf] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
