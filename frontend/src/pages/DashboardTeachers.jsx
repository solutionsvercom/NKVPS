import React, { useState } from 'react';
import { teachersApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { UserCheck, Plus, Edit, Trash2, Search, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const emptyTeacher = { full_name: '', email: '', phone: '', program: '', qualification: '', specialization: '', status: 'active' };

export default function DashboardTeachers() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTeacher);
  const queryClient = useQueryClient();

  const { data: teachers = [] } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => teachersApi.list('-created_date'),
  });

  const createMut = useMutation({
    mutationFn: (d) => teachersApi.create(d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      closeForm();
      toast.success('Teacher added!');
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => teachersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      closeForm();
      toast.success('Updated!');
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => teachersApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast.success('Removed');
    },
  });

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyTeacher);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateMut.mutate({ id: editing.id, data: form }) : createMut.mutate(form);
  };

  const filtered = teachers.filter((t) => t.full_name?.toLowerCase().includes(search.toLowerCase()));
  const programColors = { playgroup: '#FF8A5B', nursery: '#C79BFF', lkg: '#6ED3A3', ukg: '#FFD84D' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#C79BFF]" /> Teachers
          </h1>
          <p className="text-sm text-[#4A3F35]/60">{teachers.length} teachers</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Teacher
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A3F35]/40" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search teachers..." className="pl-10 rounded-xl max-w-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="p-5 rounded-2xl border-none shadow-md hover:shadow-lg transition-all bg-white">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: programColors[t.program] || '#C79BFF' }}
                  >
                    {t.full_name?.[0] || '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-[#4A3F35]">{t.full_name}</p>
                    <Badge variant="outline" className="text-xs capitalize">
                      {t.program || 'All'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => { setForm(t); setEditing(t); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-[#FFF6E9]">
                    <Edit className="w-4 h-4 text-[#4A3F35]/50" />
                  </button>
                  <button type="button" onClick={() => deleteMut.mutate(t.id)} className="p-1.5 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="text-xs text-[#4A3F35]/50 space-y-1">
                {t.email && (
                  <p className="flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {t.email}
                  </p>
                )}
                {t.phone && (
                  <p className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {t.phone}
                  </p>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-10 text-center rounded-2xl border-none shadow-md">
          <p className="text-[#4A3F35]/60">No teachers found</p>
        </Card>
      )}

      <Dialog open={showForm} onOpenChange={(v) => !v && closeForm()}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} Teacher</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label>Full Name *</Label>
                <Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl" />
              </div>
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
                <Label>Qualification</Label>
                <Input value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="rounded-xl" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
              {editing ? 'Update' : 'Add'} Teacher
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
