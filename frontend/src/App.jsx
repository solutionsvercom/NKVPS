import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Facilities from './pages/Facilities';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import DashboardStudents from './pages/DashboardStudents';
import DashboardTeachers from './pages/DashboardTeachers';
import DashboardAttendance from './pages/DashboardAttendance';
import DashboardFees from './pages/DashboardFees';
import DashboardEvents from './pages/DashboardEvents';
import DashboardAnnouncements from './pages/DashboardAnnouncements';
import DashboardHomework from './pages/DashboardHomework';
import DashboardActivities from './pages/DashboardActivities';
import DashboardMessages from './pages/DashboardMessages';
import DashboardInquiries from './pages/DashboardInquiries';
import DashboardAITools from './pages/DashboardAITools';
import DashboardAIChat from './pages/DashboardAIChat';
import DashboardProgress from './pages/DashboardProgress';

import WebsiteLayout from './components/website/WebsiteLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';

function ProtectedDashboard() {
  const { user, isLoadingAuth } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FFF6E9]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FF8A5B]/20 border-t-[#FF8A5B] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#4A3F35]/60 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<WebsiteLayout />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Programs" element={<Programs />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Facilities" element={<Facilities />} />
        <Route path="/Admissions" element={<Admissions />} />
        <Route path="/Contact" element={<Contact />} />
      </Route>

      <Route element={<ProtectedDashboard />}>
        <Route element={<DashboardLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard/Students" element={<DashboardStudents />} />
          <Route path="/Dashboard/Teachers" element={<DashboardTeachers />} />
          <Route path="/Dashboard/Attendance" element={<DashboardAttendance />} />
          <Route path="/Dashboard/Fees" element={<DashboardFees />} />
          <Route path="/Dashboard/Events" element={<DashboardEvents />} />
          <Route path="/Dashboard/Announcements" element={<DashboardAnnouncements />} />
          <Route path="/Dashboard/Homework" element={<DashboardHomework />} />
          <Route path="/Dashboard/Activities" element={<DashboardActivities />} />
          <Route path="/Dashboard/Messages" element={<DashboardMessages />} />
          <Route path="/Dashboard/Inquiries" element={<DashboardInquiries />} />
          <Route path="/Dashboard/AITools" element={<DashboardAITools />} />
          <Route path="/Dashboard/AIChat" element={<DashboardAIChat />} />
          <Route path="/Dashboard/Progress" element={<DashboardProgress />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
