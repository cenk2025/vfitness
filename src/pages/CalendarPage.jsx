import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { Trash2, Play, Pause, Square } from 'lucide-react';

const CalendarPage = ({ t, user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Timer states
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);
  
  const navigate = useNavigate();

  const days = [t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday, t.sunday];

  useEffect(() => {
    fetchUserWorkouts();
  }, [user]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout);
    setTimer(0);
    setIsPlaying(false);
  };

  const handleFinishWorkout = () => {
    // Burada ileride veritabanına kaydedilebilir
    setActiveWorkout(null);
    setTimer(0);
    setIsPlaying(false);
  };

  const fetchUserWorkouts = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_workouts')
        .select(`
          id, day_of_week, time, sets,
          workout_programs (name)
        `)
        .eq('user_id', user.id)
        .order('time', { ascending: true });
      
      if (error) throw error;
      setWorkouts(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (workoutId) => {
    try {
      const { error } = await supabase
        .from('user_workouts')
        .delete()
        .eq('id', workoutId);
      
      if (error) throw error;
      setWorkouts(workouts.filter(w => w.id !== workoutId));
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  if (!user) {
    return (
      <div className="calendar-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <h2>{t.calendarTitle}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Takviminizi görmek için giriş yapmalısınız.</p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>Giriş Yap</button>
      </div>
    );
  }

  if (loading) return <div className="calendar-container">Yükleniyor...</div>;

  return (
    <div className="calendar-container">
      <h2>{t.calendarTitle}</h2>
      
      <div className="calendar-grid">
        {days.map((day, index) => (
          <div key={index} className="calendar-day-column">
            <div className="calendar-day-header">{day}</div>
            <div className="calendar-day">
              {workouts.filter(w => w.day_of_week === index + 1).map(w => (
                <div 
                  key={w.id} 
                  className="class-event booked"
                  style={{ position: 'relative', cursor: 'default' }}
                >
                  <div className="class-time">{w.time}</div>
                  <div className="class-name" style={{ fontWeight: 'bold' }}>{w.workout_programs?.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{w.sets} Set</div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
                    <button 
                      onClick={() => handleStartWorkout(w)}
                      className="btn btn-primary" 
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', width: '100%' }}
                    >
                      <Play size={12} /> Başla
                    </button>
                  </div>

                  <button 
                    onClick={() => handleDelete(w.id)}
                    style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                    title={t.calendarDelete}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {workouts.filter(w => w.day_of_week === index + 1).length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', opacity: 0.5, fontSize: '0.8rem', marginTop: '1rem' }}>
                  Boş
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {activeWorkout && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}>
          <div className="auth-card" style={{ textAlign: 'center', border: '1px solid var(--accent-color)' }}>
            <h2 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{activeWorkout.workout_programs?.name}</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Hedef: {activeWorkout.sets} Set</p>
            
            <div style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '2rem', fontFamily: 'monospace' }}>
              {formatTime(timer)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                className="btn btn-primary"
                style={{ width: '120px' }}
              >
                {isPlaying ? <><Pause size={20} /> Durdur</> : <><Play size={20} /> Devam Et</>}
              </button>
              
              <button 
                onClick={handleFinishWorkout} 
                className="btn btn-secondary"
                style={{ width: '120px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
              >
                <Square size={20} /> Bitir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
