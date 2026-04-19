import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Footer = ({ t }) => {
  return (
    <footer>
      <div className="footer-content">
        <Link to="/" className="logo">
          <Activity color="#d1ff27" /> V<span>FITNESS</span>
        </Link>
        <div className="footer-links">
          <a href="https://voon.fi" target="_blank" rel="noopener noreferrer">{t.footerAbout}</a>
          <a href="mailto:info@voon.fi">{t.footerContact}</a>
          <a href="https://voon.fi" target="_blank" rel="noopener noreferrer">{t.footerTerms}</a>
          <a href="https://voon.fi" target="_blank" rel="noopener noreferrer">{t.footerPrivacy}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} V FITNESS. All rights reserved.</div>
        <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          {t.footerMadeBy} <a href="https://voon.fi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>voon.fi</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
