import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';

// Layout
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import FoundersPage from './pages/FoundersPage';
import VCsPage from './pages/VCsPage';
import ProfilePage from './pages/ProfilePage';
import IdeasPage from './pages/IdeasPage';
import IdeaDetailPage from './pages/IdeaDetailPage';
import NewIdeaPage from './pages/NewIdeaPage';
import StartupsPage from './pages/StartupsPage';
import StartupDetailPage from './pages/StartupDetailPage';
import NewStartupPage from './pages/NewStartupPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { currentUser, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
}

// Public Route Component (redirect to dashboard if logged in)
function PublicRoute({ children }) {
  const { currentUser, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/founders" element={<ProtectedRoute><FoundersPage /></ProtectedRoute>} />
      <Route path="/vcs" element={<ProtectedRoute><VCsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/ideas" element={<ProtectedRoute><IdeasPage /></ProtectedRoute>} />
      <Route path="/ideas/new" element={<ProtectedRoute><NewIdeaPage /></ProtectedRoute>} />
      <Route path="/ideas/:id" element={<ProtectedRoute><IdeaDetailPage /></ProtectedRoute>} />
      <Route path="/startups" element={<ProtectedRoute><StartupsPage /></ProtectedRoute>} />
      <Route path="/startups/new" element={<ProtectedRoute><NewStartupPage /></ProtectedRoute>} />
      <Route path="/startups/:id" element={<ProtectedRoute><StartupDetailPage /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <AppRoutes />
      </Router>
    </DataProvider>
  );
}

export default App;
