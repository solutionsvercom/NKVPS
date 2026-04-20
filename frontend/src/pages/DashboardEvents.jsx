import React, { useState } from 'react';
import { eventsApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CalendarDays, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const emptyEvent = { title: '', description: '', date: '', time: '', location: '', type: 'celebration', is_public: true };
const typeColors = { celebration: '#FF8A5B', sports: '#6ED3A3', cultural: '#C79BFF', parent_meeting: '#FFD84D', holiday: '#FF6F61', other: '#4A3F35' };

export default function DashboardEvents() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyEvent);
  const queryClient = useQueryClient();

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: () => eventsApi.list('-date'),
  });

  const createMut = useMutation({
    mutationFn: (d) => eventsApi.create(d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      closeForm();
      toast.success('Event created!');
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => eventsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      closeForm();
      toast.success('Event updated!');
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => eventsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted');
    },
  });

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyEvent);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateMut.mutate({ id: editing.id, data: form }) : createMut.mutate(form);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-[#6ED3A3]" /> Events
        </h1>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="p-10 text-center rounded-2xl border-none shadow-md">
          <p className="text-[#4A3F35]/60">No events yet</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((e, i) => (
            <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5 rounded-2xl border-none shadow-md bg-white hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#4A3F35]">{e.title}</h3>
                    <Badge variant="outline" className="text-xs capitalize mt-1" style={{ borderColor: typeColors[e.type], color: typeColors[e.type] }}>
                      {e.type?.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setForm(e);
                        setEditing(e);
                        setShowForm(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-[#FFF6E9]"
                    >
                      <Edit className="w-4 h-4 text-[#4A3F35]/50" />
                    </button>
                    <button type="button" onClick={() => deleteMut.mutate(e.id)} className="p-1.5 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#4A3F35]/60 mb-2">{e.description}</p>
                <div className="flex gap-4 text-xs text-[#4A3F35]/50">
                  <span>📅 {e.date}</span>
                  {e.time && <span>🕐 {e.time}</span>}
                  {e.location && <span>📍 {e.location}</span>}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={(v) => !v && closeForm()}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} Event</DialogTitle>
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
                <Label>Date *</Label>
                <Input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Time</Label>
                <Input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="10:00 AM" className="rounded-xl" />
              </div>
            </div>
            <div>
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-xl" />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celebration">Celebration</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="parent_meeting">Parent Meeting</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
              {editing ? 'Update' : 'Create'} Event
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
