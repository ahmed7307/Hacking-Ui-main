import { Switch, Route, Redirect } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster as HotToaster } from 'react-hot-toast';
import { getCurrentUser } from './lib/auth';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CTFList from './pages/CTFList';
import CTFDetail from './pages/CTFDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import WriteupList from './pages/WriteupList';
import WriteupDetail from './pages/WriteupDetail';
import ReportList from './pages/ReportList';
import ReportDetail from './pages/ReportDetail';
import Leaderboard from './pages/Leaderboard';
import HallOfFame from './pages/HallOfFame';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReports from './pages/admin/AdminReports';
import AdminHallOfFame from './pages/admin/AdminHallOfFame';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import NotFound from './pages/not-found';
import AdminLogin from './pages/admin/login';

function Router() {
  const user = getCurrentUser();
  
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/ctfs" component={CTFList} />
      <Route path="/ctf/:id" component={CTFDetail} />
      <Route path="/blogs" component={BlogList} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route path="/writeups" component={WriteupList} />
      <Route path="/writeup/:id" component={WriteupDetail} />
      <Route path="/reports" component={ReportList} />
      <Route path="/reports/:id" component={ReportDetail} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/halloffame" component={HallOfFame} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/about" component={About} />
      
      {/* Guest Only Routes (Login/Register) - Redirect if already logged in */}
      <Route path="/login">
        {() => (
          <GuestRoute>
            <Login />
          </GuestRoute>
        )}
      </Route>
      
      <Route path="/register">
        {() => (
          <GuestRoute>
            <Register />
          </GuestRoute>
        )}
      </Route>
      
      <Route path="/admin/login">
        {() => (
          <GuestRoute>
            <AdminLogin />
          </GuestRoute>
        )}
      </Route>
      
      {/* Protected User Routes - Require login */}
      <Route path="/dashboard">
        {() => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/profile">
        {() => (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/settings">
        {() => (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        )}
      </Route>
      
      {/* Protected Admin Routes - Require admin role */}
      <Route path="/admin/dashboard">
        {() => (
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/admin/reports">
        {() => (
          <ProtectedRoute requireAdmin={true}>
            <AdminReports />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/admin/halloffame">
        {() => (
          <ProtectedRoute requireAdmin={true}>
            <AdminHallOfFame />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/admin/users">
        {() => (
          <ProtectedRoute requireAdmin={true}>
            <AdminUsers />
          </ProtectedRoute>
        )}
      </Route>
      
      <Route path="/admin/settings">
        {() => (
          <ProtectedRoute requireAdmin={true}>
            <AdminSettings />
          </ProtectedRoute>
        )}
      </Route>
      
      {/* 404 Not Found */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <HotToaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--primary) / 0.2)',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--card))',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}