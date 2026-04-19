import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import ProgramsPage from './pages/ProgramsPage';
import { translations } from './i18n';
import { supabase } from './supabase';

function App() {
  const [lang, setLang] = useState('fi');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const t = translations[lang];

  useEffect(() => {
    // Mevcut oturumu al
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Oturum değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'fi' : 'en');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-color)', color: 'var(--accent-color)' }}>Loading...</div>;
  }

  return (
    <Router>
      <Navigation t={t} lang={lang} toggleLang={toggleLang} user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/programs" element={<ProgramsPage t={t} user={user} />} />
          <Route path="/login" element={<Login t={t} user={user} />} />
          <Route path="/dashboard" element={<Dashboard t={t} user={user} />} />
          <Route path="/calendar" element={<CalendarPage t={t} user={user} />} />
        </Routes>
      </main>
      <Footer t={t} />
      <CookieConsent t={t} />
    </Router>
  );
}

export default App;
