import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = ({ t }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6; // Videoyu %40 yavaşlatır
    }
  }, []);

  return (
    <div className="hero">
      <div className="hero-video-wrapper">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
          poster="/fitness-poster.jpg"
        >
          <source src="/fitness-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSubtitle}</p>
        <Link to="/login" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          {t.heroBtn} <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
