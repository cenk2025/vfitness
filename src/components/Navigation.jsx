import { Link, useLocation } from 'react-router-dom';
import { Activity, User } from 'lucide-react';

const Navigation = ({ t, lang, toggleLang, user, handleLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Activity color="#d1ff27" /> V<span>FITNESS</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/')}`}>{t.navHome}</Link>
        <Link to="/programs" className={`nav-link ${isActive('/programs')}`}>{t.navPrograms}</Link>
        <Link to="/calendar" className={`nav-link ${isActive('/calendar')}`}>{t.navCalendar}</Link>
        {user && <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>{t.navDashboard}</Link>}
      </div>

      <div className="nav-actions">
        <button className="lang-switch" onClick={toggleLang}>
          {lang === 'en' ? 'FI' : 'EN'}
        </button>
        {user ? (
          <button className="btn btn-secondary" onClick={handleLogout}>
            <User size={18} /> {t.navLogout}
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            <User size={18} /> {t.navLogin}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
