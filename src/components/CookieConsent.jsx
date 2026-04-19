import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

const CookieConsent = ({ t }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vfitness_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('vfitness_cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-consent">
      <ShieldCheck size={32} color="#d1ff27" style={{ flexShrink: 0 }} />
      <p className="cookie-text">{t.cookieText}</p>
      <button className="btn btn-primary" onClick={acceptCookies}>
        {t.cookieAccept}
      </button>
    </div>
  );
};

export default CookieConsent;
