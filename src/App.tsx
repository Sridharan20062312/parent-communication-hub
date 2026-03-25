import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminPortal from './pages/AdminPortal';
import AdvisorPortal from './pages/AdvisorPortal';
import StaffDashboard from './pages/StaffDashboard';
import ParentDashboard from './pages/ParentDashboard';
import StudentPortal from './pages/StudentPortal';
import StaffRegister from './pages/StaffRegister';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Entry Points */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<StaffRegister />} />
        
        {/* Portals */}
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/advisor" element={<AdvisorPortal />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/student" element={<StudentPortal />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
