import React, { useState, useRef, useEffect } from 'react';
import { invokeLLM } from '@/services/api';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

export default function DashboardAIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! 👋 I'm your Nav Jyoti Kid's Villa AI assistant. I can help you with questions about your child's education, school programs, activities, homework help, and more. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await invokeLLM(
        `You are a friendly, helpful AI assistant for Nav Jyoti Kid's Villa. You help parents with questions about their children's education, school programs (Playgroup, Nursery, LKG, UKG), homework, activities, child development, and parenting tips. Be warm, supportive, and encouraging. Keep responses concise but informative.\n\nParent's question: ${userMsg}`
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#C79BFF]" /> AI Assistant
        </h1>
        <p className="text-sm text-[#4A3F35]/60">Ask me anything about your child's education</p>
      </div>

      <Card className="rounded-2xl border-none shadow-md bg-white overflow-hidden flex flex-col h-[calc(100vh-240px)]">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.role === 'user' ? 'bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white' : 'bg-[#F7F2EC] text-[#4A3F35]'
                }`}
              >
                {m.role === 'assistant' ? <ReactMarkdown className="prose prose-sm max-w-none">{m.content}</ReactMarkdown> : m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#F7F2EC] px-4 py-2 rounded-2xl flex items-center gap-2 text-sm text-[#4A3F35]/60">
                <Loader2 className="w-4 h-4 animate-spin" /> Thinking…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <form onSubmit={handleSend} className="p-3 border-t flex gap-2 bg-white">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="rounded-xl" />
          <Button type="submit" disabled={loading} className="bg-[#C79BFF] text-white rounded-xl">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
