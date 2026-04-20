import React, { useState } from 'react';
import { announcementsApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const emptyAnnouncement = { title: '', content: '', target: 'all', priority: 'normal', is_active: true };
const priorityColors = { low: '#6ED3A3', normal: '#FFD84D', high: '#FF8A5B', urgent: '#FF6F61' };

export default function DashboardAnnouncements() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyAnnouncement);
  const queryClient = useQueryClient();

  const { data: announcements = [] } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => announcementsApi.list('-created_date'),
  });

  const createMut = useMutation({
    mutationFn: (d) => announcementsApi.create(d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      closeForm();
      toast.success('Announcement created!');
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => announcementsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      closeForm();
      toast.success('Updated!');
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => announcementsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Deleted');
    },
  });

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyAnnouncement);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateMut.mutate({ id: editing.id, data: form }) : createMut.mutate(form);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <Bell className="w-6 h-6 text-[#FFD84D]" /> Announcements
        </h1>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> New Announcement
        </Button>
      </div>

      <div className="space-y-3">
        {announcements.map((a, i) => (
          <Card key={a.id} className="p-5 rounded-2xl border-none shadow-md bg-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD84D]/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[#FFD84D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#4A3F35]">{a.title}</h3>
                  <Badge variant="outline" className="text-xs mt-1 capitalize" style={{ borderColor: priorityColors[a.priority], color: priorityColors[a.priority] }}>
                    {a.priority}
                  </Badge>
                  <p className="text-sm text-[#4A3F35]/60 mt-2 line-clamp-2">{a.content}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => { setForm(a); setEditing(a); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-[#FFF6E9]">
                  <Edit className="w-4 h-4 text-[#4A3F35]/50" />
                </button>
                <button type="button" onClick={() => deleteMut.mutate(a.id)} className="p-1.5 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </Card>
        ))}
        {announcements.length === 0 && (
          <Card className="p-10 text-center rounded-2xl border-none shadow-md">
            <p className="text-[#4A3F35]/60">No announcements</p>
          </Card>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={(v) => !v && closeForm()}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Create'} Announcement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl" />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="rounded-xl" rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Target</Label>
                <Select value={form.target} onValueChange={(v) => setForm({ ...form, target: v })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="parents">Parents</SelectItem>
                    <SelectItem value="teachers">Teachers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
              {editing ? 'Update' : 'Publish'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
