import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Dumbbell, Clock, Flame } from 'lucide-react';
import { supabase } from '../supabase';

const Dashboard = ({ t, user }) => {
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    const { count } = await supabase
      .from('user_workouts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    
    setBookingCount(count || 0);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>{t.dashboardTitle}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t.welcome} {user.email}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Dumbbell size={24} />
          </div>
          <div className="stat-value">{bookingCount}</div>
          <div className="stat-label">{t.statsWorkouts}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-value">{bookingCount * 1.5}</div>
          <div className="stat-label">{t.statsHours}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Flame size={24} />
          </div>
          <div className="stat-value">{bookingCount * 450}</div>
          <div className="stat-label">{t.statsCalories}</div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1.5rem' }}>{t.recentActivity}</h3>
        {/* Placeholder for recent activity list */}
        <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', color: 'var(--text-secondary)' }}>
          No recent activity to show yet.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
