import React, { useState } from 'react';
import { invokeLLM } from '@/services/api';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, FileText, Brain, Palette, Loader2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

const tools = [
  { id: 'homework', icon: BookOpen, title: 'AI Homework Generator', desc: 'Generate age-appropriate homework', color: '#FF8A5B' },
  { id: 'lesson', icon: FileText, title: 'AI Lesson Planner', desc: 'Create engaging lesson plans', color: '#C79BFF' },
  { id: 'activity', icon: Palette, title: 'AI Activity Generator', desc: 'Fun activities for kids', color: '#6ED3A3' },
  { id: 'progress', icon: Brain, title: 'AI Progress Analyzer', desc: 'Analyze student progress', color: '#FFD84D' },
];

export default function DashboardAITools() {
  const [activeTool, setActiveTool] = useState(null);
  const [program, setProgram] = useState('nursery');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic) {
      toast.error('Please enter a topic');
      return;
    }
    if (!activeTool) return;
    setLoading(true);
    setResult('');
    const prompts = {
      homework: `Generate a fun, age-appropriate homework assignment for ${program} level preschool children on the topic: "${topic}"${subject ? ` for the subject: ${subject}` : ''}. Include clear instructions, activities, and parent guidance. Make it playful and engaging.`,
      lesson: `Create a detailed lesson plan for ${program} level preschool on the topic: "${topic}"${subject ? ` for ${subject}` : ''}. Include objectives, materials needed, warm-up activity, main activity, assessment, and cool-down. Keep it play-based and fun.`,
      activity: `Generate 5 fun, creative activities for ${program} level preschool children related to: "${topic}". Include materials needed, step-by-step instructions, learning outcomes, and safety tips. Make them hands-on and engaging.`,
      progress: `As a preschool education expert, provide a detailed analysis framework for tracking a ${program} level student's progress in: "${topic}". Include key milestones, observation indicators, suggested activities for improvement, and parent communication tips.`,
    };

    try {
      const response = await invokeLLM(prompts[activeTool]);
      setResult(response);
    } catch {
      toast.error('Could not generate. Check API connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#C79BFF]" /> AI Tools
        </h1>
        <p className="text-sm text-[#4A3F35]/60">Powered by your server (optional OpenAI key)</p>
      </div>

      {!activeTool ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTool(t.id)}
              className="text-left p-6 rounded-2xl border-none shadow-md bg-white hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${t.color}20` }}>
                <t.icon className="w-6 h-6" style={{ color: t.color }} />
              </div>
              <h3 className="font-semibold text-[#4A3F35]">{t.title}</h3>
              <p className="text-sm text-[#4A3F35]/50 mt-1">{t.desc}</p>
            </motion.button>
          ))}
        </div>
      ) : (
        <Card className="p-6 rounded-2xl border-none shadow-md bg-white space-y-4">
          <Button variant="ghost" size="sm" onClick={() => { setActiveTool(null); setResult(''); }} className="text-[#FF8A5B]">
            ← Back
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Program</Label>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger className="rounded-xl mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="playgroup">Playgroup</SelectItem>
                  <SelectItem value="nursery">Nursery</SelectItem>
                  <SelectItem value="lkg">LKG</SelectItem>
                  <SelectItem value="ukg">UKG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject (optional)</Label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-xl mt-1" placeholder="e.g. Literacy" />
            </div>
          </div>
          <div>
            <Label>Topic *</Label>
            <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-xl mt-1" rows={3} placeholder="What should we focus on?" />
          </div>
          <Button onClick={generate} disabled={loading} className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
          </Button>

          {result && (
            <div className="mt-4 p-4 bg-[#FFF6E9] rounded-xl prose prose-sm max-w-none">
              <ReactMarkdown>{result}</ReactMarkdown>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  toast.success('Copied');
                }}
              >
                <Copy className="w-4 h-4 mr-1" /> Copy
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
