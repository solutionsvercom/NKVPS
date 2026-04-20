import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { contactApi } from '@/services/api';

const fadeUp = (delay = 0) => ({
  initial: { y: 28 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay },
});

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '9953240430, 9718977004', sub: 'Mon–Sat, 8:00 AM – 5:00 PM' },
  { icon: Mail, label: 'Email', value: 'hello@navjyotikidsvilla.edu', sub: 'We reply within 24 hours' },
  { icon: MapPin, label: 'Address', value: '302, Block A, Phase-1, Chattarpur Enclave, New Delhi-110074', sub: 'New Delhi - 110074' },
  { icon: Clock, label: 'School Hours', value: '8:30 AM – 1:30 PM', sub: 'Extended care until 4:00 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.submit(form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      toast.success('Message sent successfully!');
    } catch {
      toast.error('Could not send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 245, 250, 0.85), rgba(255, 245, 250, 0.85)), url('https://res.cloudinary.com/dmuoamdsu/image/upload/v1776687934/ChatGPT_Image_Apr_20_2026_05_54_58_PM_blyu3o.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-medium text-[#4A90E2] uppercase tracking-wider mb-3">Get in Touch</p>
            <h1 className="text-5xl font-light text-[#333333] mb-5">
              We're Here to<br />
              <span className="font-semibold">Help You</span>
            </h1>
            <p className="text-gray-500">Have questions? Our team is always happy to talk and help you find the best fit for your child.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 section-green">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((c, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E6F9F0]">
                <div className="w-10 h-10 bg-[#EAF4FF] rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <c.icon className="w-5 h-5 text-[#4A90E2]" />
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{c.label}</p>
                <p className="font-semibold text-[#333333]">{c.value}</p>
                <p className="text-xs text-gray-400 mt-1">{c.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div {...fadeUp()}>
              <h2 className="text-2xl font-semibold text-[#333333] mb-7">Send a Message</h2>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-10 text-center shadow-sm border border-[#E6F9F0]"
                >
                  <div className="w-16 h-16 bg-[#4A90E2] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#333333] mb-2">Message sent successfully!</h3>
                  <p className="text-gray-500 text-sm mb-6">Thank you for contacting us. We will get back to you shortly.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-sm font-medium text-[#4A90E2] hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Your Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A90E2]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Phone</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A90E2]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A90E2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A90E2] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#4A90E2] text-white py-3.5 rounded-xl font-medium hover:bg-[#3d7fcf] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="space-y-6">
              <div className="bg-white rounded-2xl h-64 flex items-center justify-center shadow-sm border border-[#E6F9F0]">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-[#4A90E2] mx-auto mb-3" />
                  <p className="font-medium text-[#333333]">302, Block A, Phase-1, Chattarpur Enclave</p>
                  <p className="text-sm text-gray-500">New Delhi-110074</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#4A90E2] font-medium mt-3 hover:underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
              <div className="bg-[#FF4D4D] rounded-2xl p-7 text-white">
                <h4 className="font-semibold mb-4 text-white">Visit Us</h4>
                <p className="text-white/90 text-sm leading-relaxed mb-5">
                  We welcome walk-in visits on weekdays between 9:00 AM – 12:00 PM. Call ahead to schedule a guided tour with one of our admissions counsellors.
                </p>
                <div className="text-sm space-y-2 text-white/90">
                  <p>🕘 Mon–Fri: 9:00 AM – 4:00 PM</p>
                  <p>📅 Sat: 9:00 AM – 12:00 PM</p>
                  <p>🚗 Free parking available</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
