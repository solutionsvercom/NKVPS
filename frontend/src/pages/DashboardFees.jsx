import React, { useState } from 'react';
import { studentsApi, feesApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DollarSign, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const statusColors = { pending: '#FFD84D', paid: '#6ED3A3', overdue: '#FF6F61', partial: '#FF8A5B' };

export default function DashboardFees() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    student_id: '',
    student_name: '',
    parent_email: '',
    program: '',
    amount: '',
    month: '',
    year: 2026,
    status: 'pending',
  });
  const queryClient = useQueryClient();

  const { data: fees = [] } = useQuery({
    queryKey: ['fees'],
    queryFn: () => feesApi.list('-created_date'),
  });
  const { data: students = [] } = useQuery({ queryKey: ['students'], queryFn: () => studentsApi.list() });

  const createMut = useMutation({
    mutationFn: (d) => feesApi.create(d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      setShowForm(false);
      toast.success('Fee record added!');
    },
  });
  const updateStatus = useMutation({
    mutationFn: ({ id, status }) =>
      feesApi.update(id, { status, paid_date: status === 'paid' ? new Date().toISOString().split('T')[0] : '' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees'] });
      toast.success('Status updated');
    },
  });

  const filtered = fees.filter((f) => {
    const matchSearch = f.student_name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const selectStudent = (studentId) => {
    const s = students.find((st) => st.id === studentId);
    if (s) setForm({ ...form, student_id: s.id, student_name: s.full_name, parent_email: s.parent_email, program: s.program });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-[#FFD84D]" /> Fee Management
        </h1>
        <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Fee Record
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(statusColors).map(([status, color]) => {
          const count = fees.filter((f) => f.status === status).length;
          const total = fees.filter((f) => f.status === status).reduce((s, f) => s + (f.amount || 0), 0);
          return (
            <Card key={status} className="p-4 rounded-2xl border-none shadow-sm bg-white">
              <p className="text-xs text-[#4A3F35]/50 capitalize">{status}</p>
              <p className="text-xl font-bold" style={{ color }}>
                ₹{total.toLocaleString()}
              </p>
              <p className="text-xs text-[#4A3F35]/40">{count} records</p>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A3F35]/40" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by student name..." className="pl-10 rounded-xl" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-36 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filtered.map((f) => (
          <Card key={f.id} className="p-4 rounded-2xl border-none shadow-sm bg-white flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFD84D]/20 flex items-center justify-center text-sm font-bold text-[#FFD84D]">₹</div>
              <div>
                <p className="text-sm font-medium text-[#4A3F35]">{f.student_name}</p>
                <p className="text-xs text-[#4A3F35]/50">
                  {f.month} {f.year} · {f.program}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-[#4A3F35]">₹{f.amount?.toLocaleString()}</p>
              <Select value={f.status} onValueChange={(v) => updateStatus.mutate({ id: f.id, status: v })}>
                <SelectTrigger className="w-28 rounded-lg h-8 text-xs" style={{ borderColor: statusColors[f.status], color: statusColors[f.status] }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="p-10 text-center rounded-2xl border-none shadow-md">
            <p className="text-[#4A3F35]/60">No fee records</p>
          </Card>
        )}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add Fee Record</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createMut.mutate({ ...form, amount: Number(form.amount) });
            }}
            className="space-y-4"
          >
            <div>
              <Label>Student</Label>
              <Select onValueChange={selectStudent}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.full_name} ({s.program})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Amount *</Label>
                <Input required type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <Label>Month</Label>
                <Input value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} placeholder="March" className="rounded-xl" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white rounded-xl">
              Add Record
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
