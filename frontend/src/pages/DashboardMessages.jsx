import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { messagesApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, Send, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function DashboardMessages() {
  const { user } = useAuth();
  const [selectedConv, setSelectedConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: () => messagesApi.list('-created_date', 100),
    refetchInterval: 5000,
  });

  const sendMut = useMutation({
    mutationFn: (msg) => messagesApi.create(msg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setNewMessage('');
    },
  });

  const conversations = useMemo(() => {
    const convMap = {};
    messages.forEach((m) => {
      const otherId = m.sender_email === user?.email ? m.receiver_email : m.sender_email;
      const otherName = m.sender_email === user?.email ? m.receiver_name : m.sender_name;
      if (!otherId) return;
      if (!convMap[otherId]) convMap[otherId] = { email: otherId, name: otherName || otherId, messages: [], lastMessage: m };
      convMap[otherId].messages.push(m);
    });
    return Object.values(convMap).sort((a, b) => new Date(b.lastMessage.created_date || b.lastMessage.createdAt) - new Date(a.lastMessage.created_date || a.lastMessage.createdAt));
  }, [messages, user]);

  const convMessages = selectedConv
    ? messages.filter((m) => m.sender_email === selectedConv.email || m.receiver_email === selectedConv.email).reverse()
    : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConv) return;
    sendMut.mutate({
      sender_email: user?.email,
      sender_name: user?.full_name,
      receiver_email: selectedConv.email,
      receiver_name: selectedConv.name,
      content: newMessage.trim(),
      conversation_id: selectedConv.email,
    });
  };

  const filteredConvs = conversations.filter((c) => c.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-[#FF8A5B]" /> Messages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
        <Card className="rounded-2xl border-none shadow-md bg-white overflow-hidden flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A3F35]/40" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-9 rounded-xl text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvs.length === 0 ? (
              <p className="text-sm text-[#4A3F35]/50 text-center py-8">No conversations yet</p>
            ) : (
              filteredConvs.map((c) => (
                <button
                  key={c.email}
                  type="button"
                  onClick={() => setSelectedConv(c)}
                  className={`w-full text-left p-3 border-b hover:bg-[#FFF6E9] transition-all ${
                    selectedConv?.email === c.email ? 'bg-[#FFF6E9]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#C79BFF]/20 flex items-center justify-center text-sm font-bold text-[#C79BFF]">
                      {c.name?.[0] || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#4A3F35] truncate">{c.name}</p>
                      <p className="text-xs text-[#4A3F35]/50 truncate">{c.lastMessage?.content}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        <Card className="md:col-span-2 rounded-2xl border-none shadow-md bg-white overflow-hidden flex flex-col">
          {!selectedConv ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-[#4A3F35]/20 mx-auto mb-3" />
                <p className="text-[#4A3F35]/50">Select a conversation to start messaging</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 border-b bg-[#FFF6E9]">
                <p className="font-semibold text-[#4A3F35]">{selectedConv.name}</p>
                <p className="text-xs text-[#4A3F35]/50">{selectedConv.email}</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {convMessages.map((m) => {
                  const isMine = m.sender_email === user?.email;
                  return (
                    <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                          isMine ? 'bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white' : 'bg-[#F7F2EC] text-[#4A3F35]'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
                <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="rounded-xl" />
                <Button type="submit" className="bg-[#FF8A5B] text-white rounded-xl px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
