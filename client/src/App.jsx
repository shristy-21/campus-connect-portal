import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AuthModule from './components/AuthModule.jsx';
import StudentPortal from './components/StudentPortal.jsx';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Automatically scroll down to the React app container on route changes
  useEffect(() => {
    const authElem = document.getElementById('auth-section');
    if (authElem) {
      authElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <div style={{ padding: '20px 0' }}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthModule initialMode="login" />} />
        <Route path="/login" element={<AuthModule initialMode="login" />} />
        <Route path="/register" element={<AuthModule initialMode="register" />} />

        {/* Student Portal Route */}
        <Route 
          path="/student/*" 
          element={<StudentPortal onBackToHome={() => navigate('/')} />} 
        />
      </Routes>
    </div>
  );
}