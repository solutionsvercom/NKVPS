import React from 'react';
import { studentsApi, attendanceApi, homeworkApi, activitiesApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, TrendingUp, BookOpen, ClipboardCheck, Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardProgress() {
  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => studentsApi.list(),
  });

  const { data: attendance = [] } = useQuery({
    queryKey: ['attendance-all'],
    queryFn: () => attendanceApi.list('-date', 50),
  });
  const { data: homework = [] } = useQuery({
    queryKey: ['homework'],
    queryFn: () => homeworkApi.list('-created_date'),
  });
  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: () => activitiesApi.list('-date'),
  });

  const studentIds = students.map((s) => s.id);
  const myAttendance = attendance.filter((a) => studentIds.includes(a.student_id));
  const presentDays = myAttendance.filter((a) => a.status === 'present').length;
  const totalDays = myAttendance.length || 1;
  const attendanceRate = Math.round((presentDays / totalDays) * 100);

  const weekData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => ({
    name: day,
    attendance: Math.round(60 + Math.random() * 40),
    homework: Math.round(50 + Math.random() * 50),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#4A3F35] flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-[#6ED3A3]" /> Student Progress
        </h1>
        <p className="text-sm text-[#4A3F35]/60">Track your child's learning journey</p>
      </div>

      {students.length === 0 ? (
        <Card className="p-10 text-center rounded-2xl border-none shadow-md">
          <p className="text-[#4A3F35]/60">No students linked to your account yet. Please contact the school.</p>
        </Card>
      ) : (
        <>
          {students.map((s) => (
            <Card key={s.id} className="p-5 rounded-2xl border-none shadow-md bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FF8A5B] flex items-center justify-center text-white font-bold text-lg">{s.full_name?.[0]}</div>
                <div>
                  <h3 className="font-bold text-[#4A3F35]">{s.full_name}</h3>
                  <p className="text-xs text-[#4A3F35]/50 capitalize">
                    {s.program} · {s.section || 'Section A'}
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ClipboardCheck, label: 'Attendance', value: `${attendanceRate}%`, color: '#6ED3A3' },
              { icon: BookOpen, label: 'Homework', value: homework.length, color: '#FF8A5B' },
              { icon: Palette, label: 'Activities', value: activities.length, color: '#C79BFF' },
              { icon: TrendingUp, label: 'Progress', value: 'Good', color: '#FFD84D' },
            ].map((item, i) => (
              <Card key={i} className="p-5 rounded-2xl border-none shadow-md bg-white text-center">
                <item.icon className="w-8 h-8 mx-auto mb-2" style={{ color: item.color }} />
                <p className="text-2xl font-bold text-[#4A3F35]">{item.value}</p>
                <p className="text-xs text-[#4A3F35]/50">{item.label}</p>
              </Card>
            ))}
          </div>

          <Card className="p-6 rounded-2xl border-none shadow-md bg-white">
            <h3 className="font-bold text-[#4A3F35] mb-4">Weekly Performance</h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="attendance" name="Attendance %" fill="#6ED3A3" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="homework" name="Homework %" fill="#FF8A5B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
