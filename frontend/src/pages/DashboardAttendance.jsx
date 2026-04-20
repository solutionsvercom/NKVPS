import React, { useState } from 'react';
import { studentsApi, attendanceApi } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClipboardCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function DashboardAttendance() {
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const queryClient = useQueryClient();

  const { data: students = [] } = useQuery({ queryKey: ['students'], queryFn: () => studentsApi.list() });
  const { data: attendance = [] } = useQuery({
    queryKey: ['attendance', selectedDate],
    queryFn: () => attendanceApi.list(undefined, undefined, selectedDate),
  });

  const markMut = useMutation({
    mutationFn: async ({ studentId, studentName, program, status }) => {
      const existing = attendance.find((a) => a.student_id === studentId);
      if (existing) {
        return attendanceApi.update(existing.id, { status });
      }
      return attendanceApi.create({
        student_id: studentId,
        student_name: studentName,
        program,
        date: selectedDate,
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', selectedDate] });
    },
  });

  const filteredStudents = selectedProgram === 'all' ? students : students.filter((s) => s.program === selectedProgram);
  const getStatus = (studentId) => attendance.find((a) => a.student_id === studentId)?.status || 'unmarked';

  const markAll = async (status) => {
    const promises = filteredStudents.map((s) =>
      markMut.mutateAsync({ studentId: s.id, studentName: s.full_name, program: s.program, status })
    );
    await Promise.all(promises);
    toast.success(`Marked all as ${status}`);
  };

  const statusColors = { present: '#6ED3A3', absent: '#FF6F61', late: '#FFD84D', unmarked: '#4A3F35' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <ClipboardCheck className="w-6 h-6 text-[#6ED3A3]" /> Attendance
        </h1>
      </div>

      <div className="flex flex-wrap gap-3">
        <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-44 rounded-xl" />
        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
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
        <Button onClick={() => markAll('present')} variant="outline" className="rounded-xl border-[#6ED3A3] text-[#6ED3A3]">
          <Check className="w-4 h-4 mr-1" /> Mark All Present
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {['present', 'absent', 'late', 'unmarked'].map((status) => {
          const count =
            status === 'unmarked'
              ? filteredStudents.filter((s) => !attendance.find((a) => a.student_id === s.id)).length
              : attendance.filter((a) => a.status === status && filteredStudents.find((s) => s.id === a.student_id)).length;
          return (
            <Card key={status} className="p-4 rounded-2xl border-none shadow-sm bg-white text-center">
              <p className="text-2xl font-bold" style={{ color: statusColors[status] }}>
                {count}
              </p>
              <p className="text-xs text-[#4A3F35]/50 capitalize">{status}</p>
            </Card>
          );
        })}
      </div>

      <div className="space-y-2">
        {filteredStudents.map((s) => {
          const status = getStatus(s.id);
          return (
            <Card key={s.id} className="p-4 rounded-2xl border-none shadow-sm bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF8A5B]/20 flex items-center justify-center text-sm font-bold text-[#FF8A5B]">{s.full_name?.[0]}</div>
                <div>
                  <p className="text-sm font-medium text-[#4A3F35]">{s.full_name}</p>
                  <p className="text-xs text-[#4A3F35]/50 capitalize">{s.program}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['present', 'absent', 'late'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => markMut.mutate({ studentId: s.id, studentName: s.full_name, program: s.program, status: st })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      status === st ? 'text-white shadow-md' : 'bg-[#F7F2EC] text-[#4A3F35]/60 hover:bg-[#FFF6E9]'
                    }`}
                    style={status === st ? { backgroundColor: statusColors[st] } : {}}
                  >
                    {st.charAt(0).toUpperCase() + st.slice(1)}
                  </button>
                ))}
              </div>
            </Card>
          );
        })}
        {filteredStudents.length === 0 && (
          <Card className="p-10 text-center rounded-2xl border-none shadow-md">
            <p className="text-[#4A3F35]/60">No students found. Add students first.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
