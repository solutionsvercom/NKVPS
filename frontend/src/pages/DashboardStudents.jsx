import React, { useState } from 'react';
import { studentsApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Search, Users, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const emptyStudent = {
  full_name: '',
  date_of_birth: '',
  gender: '',
  program: '',
  section: '',
  parent_email: '',
  parent_name: '',
  parent_phone: '',
  address: '',
  status: 'active',
};

export default function DashboardStudents() {
  const [search, setSearch] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyStudent);
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => studentsApi.list('-created_date'),
  });

  const createMut = useMutation({
    mutationFn: (data) => studentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      closeForm();
      toast.success('Student added!');
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => studentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      closeForm();
      toast.success('Student updated!');
    },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => studentsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student removed');
    },
  });

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyStudent);
  };
  const openEdit = (s) => {
    setForm(s);
    setEditing(s);
    setShowForm(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateMut.mutate({ id: editing.id, data: form }) : createMut.mutate(form);
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.parent_name?.toLowerCase().includes(search.toLowerCase());
    const matchProgram = filterProgram === 'all' || s.program === filterProgram;
    return matchSearch && matchProgram;
  });

  const programColors = { playgroup: '#FF8A5B', nursery: '#C79BFF', lkg: '#6ED3A3', ukg: '#FFD84D' };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#FF8A5B]" /> Students
          </h1>
          <p className="text-sm text-[#4A3F35]/60">{students.length} total students</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Student
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A3F35]/40" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." className="pl-10 rounded-xl" />
        </div>
        <Select value={filterProgram} onValueChange={setFilterProgram}>
          <SelectTrigger className="w-40 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            <SelectItem value="playgroup">Playgroup</SelectItem>
            <SelectItem value="nursery">Nursery</SelectItem>
            <SelectItem value="lkg">LKG</SelectItem>
            <SelectItem value="ukg">UKG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#FF8A5B]/20 border-t-[#FF8A5B] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-10 text-center rounded-2xl border-none shadow-md">
          <Users className="w-12 h-12 text-[#4A3F35]/20 mx-auto mb-3" />
          <p className="text-[#4A3F35]/60">No students found</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="p-5 rounded-2xl border-none shadow-md hover:shadow-lg transition-all bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: programColors[s.program] || '#FF8A5B' }}
                    >
                      {s.full_name?.[0] || '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-[#4A3F35]">{s.full_name}</p>
                      <Badge variant="outline" className="text-xs capitalize" style={{ borderColor: programColors[s.program], color: programColors[s.program] }}>
                        {s.program || 'N/A'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-[#FFF6E9]">
                      <Edit className="w-4 h-4 text-[#4A3F35]/50" />
                    </button>
                    <button type="button" onClick={() => deleteMut.mutate(s.id)} className="p-1.5 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-[#4A3F35]/50 space-y-1">
                  <p>Parent: {s.parent_name || '-'}</p>
                  <p>Phone: {s.parent_phone || '-'}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={(v) => !v && closeForm()}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#4A3F35]">{editing ? 'Edit' : 'Add'} Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Full Name *</Label>
                <Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input type="date" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Program *</Label>
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
                <Label>Parent Name *</Label>
                <Input required value={form.parent_name} onChange={(e) => setForm({ ...form, parent_name: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Parent Email *</Label>
                <Input required type="email" value={form.parent_email} onChange={(e) => setForm({ ...form, parent_email: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Parent Phone</Label>
                <Input value={form.parent_phone} onChange={(e) => setForm({ ...form, parent_phone: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Section</Label>
                <Input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="rounded-xl" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
              {editing ? 'Update' : 'Add'} Student
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
