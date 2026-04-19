import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const ProgramsPage = ({ t, user }) => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // Form states
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [time, setTime] = useState('18:00');
  const [sets, setSets] = useState(3);
  const [submitting, setSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const days = [t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday, t.sunday];

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const { data, error } = await supabase.from('workout_programs').select('*').order('created_at', { ascending: true });
    if (!error && data) {
      setPrograms(data);
    }
    setLoading(false);
  };

  const handleOpenForm = (program) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedProgram(program);
  };

  const handleSaveWorkout = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const { error } = await supabase.from('user_workouts').insert({
      user_id: user.id,
      program_id: selectedProgram.id,
      day_of_week: dayOfWeek,
      time: time,
      sets: sets
    });

    setSubmitting(false);
    
    if (!error) {
      setSelectedProgram(null);
      navigate('/calendar');
    } else {
      alert(t.errorOccurred);
    }
  };

  if (loading) return <div className="dashboard-container">{t.loading}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>{t.programsTitle}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t.programsSubtitle}</p>
        </div>
      </div>

      <div className="stats-grid">
        {programs.map(p => (
          <div key={p.id} className="stat-card">
            <h3 style={{ color: 'var(--accent-color)' }}>{p.name}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{p.description}</p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem' }} onClick={() => handleOpenForm(p)}>
                {t.addToCalendar}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProgram && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}>
          <div className="auth-card" style={{ position: 'relative' }}>
            <button 
              onClick={() => setSelectedProgram(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}
            >
              ×
            </button>
            <h3 style={{ marginBottom: '1.5rem' }}>{selectedProgram.name}</h3>
            
            <form onSubmit={handleSaveWorkout}>
              <div className="form-group">
                <label>{t.selectDay}</label>
                <select className="form-control" value={dayOfWeek} onChange={(e) => setDayOfWeek(Number(e.target.value))}>
                  {days.map((d, i) => (
                    <option key={i} value={i + 1}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>{t.timeLabel}</label>
                <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{t.setsPlaceholder}</label>
                <input type="number" min="1" max="10" className="form-control" value={sets} onChange={(e) => setSets(Number(e.target.value))} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                {submitting ? '...' : t.saveWorkout}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsPage;
