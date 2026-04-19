import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, User, Menu, X } from 'lucide-react';

const Navigation = ({ t, lang, toggleLang, user, handleLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Activity color="#d1ff27" /> V<span>FITNESS</span>
      </Link>
      
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>{t.navHome}</Link>
        <Link to="/programs" className={`nav-link ${isActive('/programs')}`} onClick={closeMenu}>{t.navPrograms}</Link>
        <Link to="/calendar" className={`nav-link ${isActive('/calendar')}`} onClick={closeMenu}>{t.navCalendar}</Link>
        {user && <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`} onClick={closeMenu}>{t.navDashboard}</Link>}
      </div>

      <div className="nav-actions">
        <button className="lang-switch" onClick={toggleLang} style={{ zIndex: 1000 }}>
          {lang === 'en' ? 'FI' : 'EN'}
        </button>
        {user ? (
          <button className="btn btn-secondary" onClick={() => { handleLogout(); closeMenu(); }} style={{ zIndex: 1000 }}>
            <User size={18} /> <span className="hide-on-mobile">{t.navLogout}</span>
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary" onClick={closeMenu} style={{ zIndex: 1000 }}>
            <User size={18} /> <span className="hide-on-mobile">{t.navLogin}</span>
          </Link>
        )}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} color="#d1ff27" /> : <Menu size={28} color="#ffffff" />}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
