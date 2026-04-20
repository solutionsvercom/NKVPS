import React, { useState } from 'react';
import { activitiesApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Palette, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const emptyActivity = { title: '', description: '', program: '', type: 'learning', date: '', notes: '' };
const typeColors = { art: '#FF8A5B', music: '#C79BFF', dance: '#FF6F61', sports: '#6ED3A3', learning: '#FFD84D', play: '#FF8A5B', other: '#4A3F35' };

export default function DashboardActivities() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyActivity);
  const queryClient = useQueryClient();

  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: () => activitiesApi.list('-date'),
  });

  const createMut = useMutation({
    mutationFn: (d) => activitiesApi.create(d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      closeForm();
      toast.success('Activity added!');
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => activitiesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      closeForm();
      toast.success('Updated!');
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => activitiesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Deleted');
    },
  });

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyActivity);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateMut.mutate({ id: editing.id, data: form }) : createMut.mutate(form);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <Palette className="w-6 h-6 text-[#C79BFF]" /> Activities
        </h1>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Activity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((a, i) => (
          <Card key={a.id} className="p-5 rounded-2xl border-none shadow-md bg-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-[#4A3F35]">{a.title}</h3>
                <Badge variant="outline" className="text-xs capitalize mt-1" style={{ borderColor: typeColors[a.type], color: typeColors[a.type] }}>
                  {a.type}
                </Badge>
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
            <p className="text-sm text-[#4A3F35]/60">{a.description}</p>
            <p className="text-xs text-[#4A3F35]/40 mt-2">
              {a.date} {a.program && `· ${a.program}`}
            </p>
          </Card>
        ))}
        {activities.length === 0 && (
          <Card className="p-10 text-center rounded-2xl border-none shadow-md col-span-full">
            <p className="text-[#4A3F35]/60">No activities</p>
          </Card>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={(v) => !v && closeForm()}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} Activity</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-xl" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl" rows={2} />
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
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="dance">Dance</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="play">Play</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl" />
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
