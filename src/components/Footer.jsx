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
          <a href="#">{t.footerAbout}</a>
          <a href="#">{t.footerContact}</a>
          <a href="#">{t.footerTerms}</a>
          <a href="#">{t.footerPrivacy}</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} V FITNESS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
