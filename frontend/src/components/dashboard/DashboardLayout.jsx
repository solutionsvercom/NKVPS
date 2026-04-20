import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  DollarSign, Bell, MessageSquare, BookOpen, ClipboardCheck,
  Sparkles, Menu, X, ChevronRight, LogOut, BarChart3, FileText
} from 'lucide-react';
import SchoolLogo from '@/components/website/SchoolLogo';

const adminLinks = [
  { path: '/Dashboard', icon: LayoutDashboard, label: 'Overview' },
  { path: '/Dashboard/Students', icon: Users, label: 'Students' },
  { path: '/Dashboard/Teachers', icon: UserCheck, label: 'Teachers' },
  { path: '/Dashboard/Attendance', icon: ClipboardCheck, label: 'Attendance' },
  { path: '/Dashboard/Fees', icon: DollarSign, label: 'Fees' },
  { path: '/Dashboard/Events', icon: CalendarDays, label: 'Events' },
  { path: '/Dashboard/Announcements', icon: Bell, label: 'Announcements' },
  { path: '/Dashboard/Inquiries', icon: FileText, label: 'Inquiries' },
  { path: '/Dashboard/AITools', icon: Sparkles, label: 'AI Tools' },
  { path: '/Dashboard/Messages', icon: MessageSquare, label: 'Messages' },
];

const teacherLinks = [
  { path: '/Dashboard', icon: LayoutDashboard, label: 'Overview' },
  { path: '/Dashboard/Homework', icon: BookOpen, label: 'Homework' },
  { path: '/Dashboard/Activities', icon: Sparkles, label: 'Activities' },
  { path: '/Dashboard/Attendance', icon: ClipboardCheck, label: 'Attendance' },
  { path: '/Dashboard/Announcements', icon: Bell, label: 'Announcements' },
  { path: '/Dashboard/Messages', icon: MessageSquare, label: 'Messages' },
  { path: '/Dashboard/AITools', icon: Sparkles, label: 'AI Tools' },
];

const parentLinks = [
  { path: '/Dashboard', icon: LayoutDashboard, label: 'Overview' },
  { path: '/Dashboard/Progress', icon: BarChart3, label: 'Progress' },
  { path: '/Dashboard/Homework', icon: BookOpen, label: 'Homework' },
  { path: '/Dashboard/Attendance', icon: ClipboardCheck, label: 'Attendance' },
  { path: '/Dashboard/Fees', icon: DollarSign, label: 'Fees' },
  { path: '/Dashboard/Events', icon: CalendarDays, label: 'Events' },
  { path: '/Dashboard/Messages', icon: MessageSquare, label: 'Messages' },
  { path: '/Dashboard/AIChat', icon: Sparkles, label: 'AI Assistant' },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const role = user?.role || 'parent';
  const links = role === 'admin' ? adminLinks : role === 'teacher' ? teacherLinks : parentLinks;
  const roleLabel = role === 'admin' ? 'Admin' : role === 'teacher' ? 'Teacher' : 'Parent';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#F7F2EC]">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#FFD84D]/20 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="p-5 border-b border-[#FFD84D]/20">
          <Link to="/Home" className="flex items-center gap-2 min-w-0">
            <SchoolLogo className="w-10 h-10 object-contain shrink-0 rounded-full" />
            <span className="font-bold text-[#4A3F35] leading-tight text-sm">Nav Jyoti <span className="text-[#FF8A5B]">Kid&apos;s Villa</span></span>
          </Link>
          <div className="mt-3 px-3 py-1.5 rounded-full bg-[#FF8A5B]/10 text-[#FF8A5B] text-xs font-semibold inline-block">
            {roleLabel} Dashboard
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF8A5B] to-[#FF6F61] text-white shadow-md'
                    : 'text-[#4A3F35]/70 hover:bg-[#FFF6E9] hover:text-[#FF8A5B]'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#FFD84D]/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#C79BFF]/20 flex items-center justify-center text-sm font-bold text-[#C79BFF]">
              {user?.full_name?.[0] || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#4A3F35] truncate">{user?.full_name || 'User'}</p>
              <p className="text-xs text-[#4A3F35]/50 truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[#4A3F35]/50 hover:text-[#FF6F61] transition-colors w-full px-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#FFD84D]/20 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button type="button" onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-[#FFF6E9]">
            <Menu className="w-5 h-5 text-[#4A3F35]" />
          </button>
          <div className="flex-1" />
          <Link to="/Home" className="text-sm text-[#FF8A5B] hover:underline">← Back to Website</Link>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
