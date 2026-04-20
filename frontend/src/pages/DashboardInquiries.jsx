import React, { useState } from 'react';
import { admissionsApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, Search, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const statusColors = { new: '#FF8A5B', contacted: '#FFD84D', visit_scheduled: '#C79BFF', enrolled: '#6ED3A3', closed: '#4A3F35' };

export default function DashboardInquiries() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const queryClient = useQueryClient();

  const { data: inquiries = [] } = useQuery({
    queryKey: ['inquiries'],
    queryFn: () => admissionsApi.list('-created_date'),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, status }) => admissionsApi.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast.success('Status updated');
    },
  });

  const filtered = inquiries.filter((i) => {
    const matchSearch =
      i.child_name?.toLowerCase().includes(search.toLowerCase()) || i.parent_name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#FF8A5B]" /> Admission Inquiries
        </h1>
        <p className="text-sm text-[#4A3F35]/60">{inquiries.length} total inquiries</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Object.entries(statusColors).map(([status, color]) => (
          <Card key={status} className="p-3 rounded-2xl border-none shadow-sm bg-white text-center">
            <p className="text-xl font-bold" style={{ color }}>
              {inquiries.filter((i) => i.status === status).length}
            </p>
            <p className="text-xs text-[#4A3F35]/50 capitalize">{status.replace('_', ' ')}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A3F35]/40" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-10 rounded-xl" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="visit_scheduled">Visit Scheduled</SelectItem>
            <SelectItem value="enrolled">Enrolled</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((inq) => (
          <Card key={inq.id} className="p-5 rounded-2xl border-none shadow-md bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#4A3F35]">{inq.child_name}</h3>
                  {inq.child_age != null && <span className="text-xs text-[#4A3F35]/50">({inq.child_age} yrs)</span>}
                  {inq.program_interest && <Badge variant="outline" className="text-xs capitalize">{inq.program_interest}</Badge>}
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-[#4A3F35]/60">
                  <span>Parent: {inq.parent_name}</span>
                  {inq.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {inq.phone}
                    </span>
                  )}
                  {inq.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {inq.email}
                    </span>
                  )}
                </div>
                {inq.message && <p className="text-sm text-[#4A3F35]/50 mt-1">{inq.message}</p>}
              </div>
              <Select value={inq.status || 'new'} onValueChange={(v) => updateMut.mutate({ id: inq.id, status: v })}>
                <SelectTrigger className="w-36 rounded-lg h-9 text-xs" style={{ borderColor: statusColors[inq.status] || statusColors.new, color: statusColors[inq.status] || statusColors.new }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="visit_scheduled">Visit Scheduled</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="p-10 text-center rounded-2xl border-none shadow-md">
            <p className="text-[#4A3F35]/60">No inquiries found</p>
          </Card>
        )}
      </div>
    </div>
  );
}
