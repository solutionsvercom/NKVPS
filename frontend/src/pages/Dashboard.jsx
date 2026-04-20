import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, UserCheck, GraduationCap, DollarSign, CalendarDays, Bell, TrendingUp, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { studentsApi, teachersApi, eventsApi, announcementsApi, feesApi } from '@/services/api';

const COLORS = ['#FF8A5B', '#6ED3A3', '#C79BFF', '#FFD84D'];

export default function Dashboard() {
  const { user } = useAuth();

  const { data: students = [] } = useQuery({ queryKey: ['students'], queryFn: () => studentsApi.list() });
  const { data: teachers = [] } = useQuery({ queryKey: ['teachers'], queryFn: () => teachersApi.list() });
  const { data: events = [] } = useQuery({ queryKey: ['events'], queryFn: () => eventsApi.list('-date', 5) });
  const { data: announcements = [] } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => announcementsApi.list('-created_date', 5),
  });
  const { data: fees = [] } = useQuery({ queryKey: ['fees'], queryFn: () => feesApi.list() });

  const role = user?.role || 'parent';
  const isAdmin = role === 'admin';

  const programCounts = ['playgroup', 'nursery', 'lkg', 'ukg'].map((p) => ({
    name: p.charAt(0).toUpperCase() + p.slice(1),
    count: students.filter((s) => s.program === p).length,
  }));

  const feeStats = {
    total: fees.reduce((s, f) => s + (f.amount || 0), 0),
    paid: fees.filter((f) => f.status === 'paid').reduce((s, f) => s + (f.amount || 0), 0),
    pending: fees.filter((f) => f.status === 'pending').reduce((s, f) => s + (f.amount || 0), 0),
  };

  const stats = [
    { icon: Users, label: 'Students', value: students.length, color: '#FF8A5B' },
    { icon: UserCheck, label: 'Teachers', value: teachers.length, color: '#C79BFF' },
    { icon: CalendarDays, label: 'Events', value: events.length, color: '#6ED3A3' },
    { icon: DollarSign, label: 'Revenue', value: `₹${(feeStats.paid / 1000).toFixed(0)}K`, color: '#FFD84D' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#4A3F35]">
          Welcome back, <span className="text-[#FF8A5B]">{user?.full_name || 'there'}</span> 👋
        </h1>
        <p className="text-[#4A3F35]/60 mt-1">Here&apos;s what&apos;s happening at Nav Jyoti Kid&apos;s Villa today</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-5 rounded-2xl border-none shadow-md hover:shadow-lg transition-all bg-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}20` }}>
                  <s.icon className="w-6 h-6" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#4A3F35]">{s.value}</p>
                  <p className="text-xs text-[#4A3F35]/50">{s.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-2xl border-none shadow-md bg-white">
          <h3 className="font-bold text-[#4A3F35] mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#FF8A5B]" /> Students by Program
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programCounts}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {programCounts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {isAdmin && (
          <Card className="p-6 rounded-2xl border-none shadow-md bg-white">
            <h3 className="font-bold text-[#4A3F35] mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#FFD84D]" /> Fee Collection
            </h3>
            <div className="h-52 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Paid', value: feeStats.paid || 1 },
                      { name: 'Pending', value: feeStats.pending || 1 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#6ED3A3" />
                    <Cell fill="#FF6F61" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2 text-sm">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#6ED3A3]" /> Paid
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#FF6F61]" /> Pending
              </span>
            </div>
          </Card>
        )}

        {!isAdmin && (
          <Card className="p-6 rounded-2xl border-none shadow-md bg-white">
            <h3 className="font-bold text-[#4A3F35] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#6ED3A3]" /> Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#FFF6E9] rounded-xl">
                <span className="text-sm text-[#4A3F35]">Active Students</span>
                <span className="font-bold text-[#FF8A5B]">{students.filter((s) => s.status === 'active').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FFF6E9] rounded-xl">
                <span className="text-sm text-[#4A3F35]">Upcoming Events</span>
                <span className="font-bold text-[#C79BFF]">{events.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FFF6E9] rounded-xl">
                <span className="text-sm text-[#4A3F35]">Announcements</span>
                <span className="font-bold text-[#6ED3A3]">{announcements.length}</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-2xl border-none shadow-md bg-white">
          <h3 className="font-bold text-[#4A3F35] mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#6ED3A3]" /> Upcoming Events
          </h3>
          {events.length === 0 ? (
            <p className="text-sm text-[#4A3F35]/50 text-center py-8">No upcoming events</p>
          ) : (
            <div className="space-y-3">
              {events.slice(0, 4).map((e, i) => (
                <div key={e.id || i} className="flex items-center gap-3 p-3 bg-[#FFF6E9] rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-[#6ED3A3]/20 flex items-center justify-center text-lg">📅</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#4A3F35] truncate">{e.title}</p>
                    <p className="text-xs text-[#4A3F35]/50">{e.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 rounded-2xl border-none shadow-md bg-white">
          <h3 className="font-bold text-[#4A3F35] mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#FFD84D]" /> Recent Announcements
          </h3>
          {announcements.length === 0 ? (
            <p className="text-sm text-[#4A3F35]/50 text-center py-8">No announcements yet</p>
          ) : (
            <div className="space-y-3">
              {announcements.slice(0, 4).map((a, i) => (
                <div key={a.id || i} className="flex items-center gap-3 p-3 bg-[#FFF6E9] rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD84D]/20 flex items-center justify-center text-lg">📢</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#4A3F35] truncate">{a.title}</p>
                    <p className="text-xs text-[#4A3F35]/50 truncate">{a.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
