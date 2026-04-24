import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import SchoolLogo from '@/components/website/SchoolLogo';
import { invokeLLM } from '@/services/api';
import ReactMarkdown from 'react-markdown';

const SCHOOL_CONTEXT = `You are a friendly school assistant for Navjyoti Kids Villa School. Answer questions from parents and visitors about:
- Admission process: Submit inquiry form online or visit school. Admissions open for Playgroup, Nursery, LKG, UKG. Visit school → meet teachers → enroll.
- Fee structure: Playgroup ₹3,000/month, Nursery ₹3,500/month, LKG ₹4,000/month, UKG ₹4,500/month. Registration fee ₹5,000 one-time.
- Programs: Playgroup (1.5–2.5 yrs), Nursery (2.5–3.5 yrs), LKG (3.5–4.5 yrs), UKG (4.5–5.5 yrs). All play-based learning.
- Facilities: Smart classrooms with interactive boards, outdoor play areas, art room, music room, safe campus with CCTV, nutritious meals provided.
- Timings: School hours 8:30 AM – 1:30 PM (Mon–Sat). Extended care 1:30–4:00 PM available.
- Contact: 9953240430, 9718977004 | hello@navjyotikidsvilla.edu | House No 315, Block A, Gali no 6, Chhatarpur Enclave Phase 1, South Delhi, Delhi-110074.
Be warm, concise, and helpful. Keep responses short and friendly.`;

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! 👋 I'm the Navjyoti Kids Villa School assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    const history = messages.map(m => `${m.role === 'user' ? 'Parent' : 'Assistant'}: ${m.content}`).join('\n');
    try {
      const response = await invokeLLM(
        `${SCHOOL_CONTEXT}\n\nConversation so far:\n${history}\n\nParent: ${text}\n\nAssistant:`
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I could not reach the assistant. Please try again or contact the school.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = ['Admission process?', 'Fee structure?', 'School timings?', 'Programs offered?'];

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#7BAE7F] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#6a9d6e] transition-colors ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F2A65A] rounded-full text-[9px] font-bold flex items-center justify-center">AI</span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-[#7BAE7F] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <SchoolLogo className="w-9 h-9 rounded-full object-contain ring-2 ring-white/40 bg-white/10 shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">School Assistant</p>
                  <p className="text-white/70 text-xs">Navjyoti Kids Villa School · Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#7BAE7F] text-white rounded-br-sm'
                      : 'bg-[#F5EFE6] text-[#333333] rounded-bl-sm'
                  }`}>
                    {m.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none prose-p:my-0.5"><ReactMarkdown>{m.content}</ReactMarkdown></div>
                    ) : m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#F5EFE6] px-4 py-3 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-[#7BAE7F]" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {quickQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#7BAE7F]/30 text-[#7BAE7F] hover:bg-[#F5EFE6] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2 flex-shrink-0">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about admissions, programs..."
                className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7BAE7F] bg-gray-50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 bg-[#7BAE7F] text-white rounded-xl flex items-center justify-center hover:bg-[#6a9d6e] disabled:opacity-40 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}