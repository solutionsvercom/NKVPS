import React, { useState } from 'react';
import { homeworkApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookOpen, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const emptyHw = { title: '', description: '', program: '', subject: '', due_date: '', status: 'active' };

export default function DashboardHomework() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyHw);
  const queryClient = useQueryClient();

  const { data: homework = [] } = useQuery({
    queryKey: ['homework'],
    queryFn: () => homeworkApi.list('-created_date'),
  });

  const createMut = useMutation({
    mutationFn: (d) => homeworkApi.create(d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homework'] });
      closeForm();
      toast.success('Homework added!');
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => homeworkApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homework'] });
      closeForm();
      toast.success('Updated!');
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => homeworkApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homework'] });
      toast.success('Deleted');
    },
  });

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyHw);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateMut.mutate({ id: editing.id, data: form }) : createMut.mutate(form);
  };

  const statusColors = { active: '#6ED3A3', completed: '#C79BFF', overdue: '#FF6F61' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#FF8A5B]" /> Homework
        </h1>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Homework
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homework.map((h, i) => (
          <Card key={h.id} className="p-5 rounded-2xl border-none shadow-md bg-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-[#4A3F35]">{h.title}</h3>
                <Badge variant="outline" className="text-xs capitalize mt-1" style={{ borderColor: statusColors[h.status], color: statusColors[h.status] }}>
                  {h.status}
                </Badge>
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => { setForm(h); setEditing(h); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-[#FFF6E9]">
                  <Edit className="w-4 h-4 text-[#4A3F35]/50" />
                </button>
                <button type="button" onClick={() => deleteMut.mutate(h.id)} className="p-1.5 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
            <p className="text-sm text-[#4A3F35]/60 line-clamp-2">{h.description}</p>
            <p className="text-xs text-[#4A3F35]/40 mt-2 capitalize">
              {h.program} {h.subject && `· ${h.subject}`} {h.due_date && `· Due ${h.due_date}`}
            </p>
          </Card>
        ))}
        {homework.length === 0 && (
          <Card className="p-10 text-center rounded-2xl border-none shadow-md col-span-full">
            <p className="text-[#4A3F35]/60">No homework assigned</p>
          </Card>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={(v) => !v && closeForm()}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} Homework</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Program</Label>
                <Select value={form.program} onValueChange={(v) => setForm({ ...form, program: v })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select" />
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
                <Label>Subject</Label>
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="rounded-xl" />
              </div>
            </div>
            <div>
              <Label>Due date</Label>
              <Input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="rounded-xl" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
              {editing ? 'Update' : 'Add'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
