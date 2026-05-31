import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, BookOpen, Lock, MessageCircle, Send } from 'lucide-react';
import PhotoSlot from '../../components/PhotoSlot';
import SEO from '../../components/SEO';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [enrolling, setEnrolling] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = async (program) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (program.type === 'paid') {
      navigate(`/dashboard/enroll/${program._id}`);
      return;
    }

    setEnrolling(program._id);
    try {
      await axios.post(`${API_URL}/enrollments/enroll/${program._id}`);
      navigate('/dashboard/programs');
    } catch (err) {
      console.error('Enrollment error:', err);
      alert(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(null);
    }
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(`${API_URL}/programs`);
        setPrograms(res.data.filter(p => p.status === 'Active'));
      } catch (err) {
        console.error('Error fetching programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      const matchesSearch = (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'ALL' || p.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [programs, searchTerm, selectedType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Academy Catalog — Hajjo Dollars Wealth Solutions"
        description="Explore premium CPA marketing training programs and mentorship."
        path="/programs"
      />

      {/* HERO */}
      <section className="relative bg-background pt-32 sm:pt-40 pb-16 lg:pb-24 overflow-hidden transition-colors duration-300 font-sans">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-6 block text-muted-foreground text-[10px] lg:text-xs font-black uppercase tracking-[0.4em]"
          >
            ⬡ OPERATIONS_CORE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="display-serif text-4xl sm:text-6xl lg:text-8xl font-black text-foreground mb-6 lg:mb-8 transition-colors leading-tight"
          >
            Expert <span className="italic text-primary">Training</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-lg lg:text-xl max-w-2xl mx-auto transition-colors font-medium leading-relaxed"
          >
            Master the architecture of CPA marketing with data-driven guidance designed for high-performance scaling.
          </motion.p>
        </div>
      </section>

      {/* FILTER & SEARCH */}
      <div className="bg-card/80 backdrop-blur-md py-4 lg:py-6 border-y border-border sticky top-[64px] lg:top-[80px] z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
            {['ALL', 'free', 'paid'].map(t => (
              <button key={t} onClick={() => setSelectedType(t)} 
                className={`px-5 py-2.5 text-[9px] lg:text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap rounded-lg ${selectedType === t ? 'bg-primary border-primary text-black shadow-lg shadow-primary/20' : 'border-border text-muted-foreground hover:border-primary/40 hover:text-primary'}`}>
                {t === 'ALL' ? 'View All' : t === 'free' ? 'Free Access' : 'Premium Nodes'}
              </button>
            ))}
          </div>
          <div className="relative w-full md:max-w-sm group">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="SEARCH PROTOCOLS..." 
              className="w-full bg-background border border-border rounded-xl py-3 pl-11 pr-4 text-foreground text-[10px] focus:outline-none focus:border-primary/40 transition-all font-bold uppercase tracking-widest placeholder:text-muted-foreground/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* PROGRAM GRID */}
      <section className="bg-background py-16 lg:py-24 transition-colors duration-300 font-sans">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-32 text-muted-foreground/40 uppercase tracking-widest text-[10px] font-black border border-dashed border-border rounded-[2rem] lg:rounded-[3rem]">
              No active nodes detected in current sector
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredPrograms.map((p) => (
                <motion.div 
                  layout
                  key={p._id} 
                  className="bg-card border border-border rounded-[2rem] overflow-hidden group hover:border-primary/20 transition-all flex flex-col shadow-sm hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="relative h-56 lg:h-64 overflow-hidden">
                    <PhotoSlot src={p.img} alt={p.title} className="group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-5 left-5">
                      <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl ${p.type === 'paid' ? 'bg-amber-500 text-black' : 'bg-primary text-black'}`}>
                        {p.type === 'paid' ? 'Premium Access' : 'Free Entry'}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                        <span className="text-primary">{p.level} LEVEL</span>
                        <span className="text-muted-foreground/40">{p.studentCount || 0} ENROLLED</span>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">{p.title}</h3>
                      <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed line-clamp-3 font-medium opacity-80 transition-colors">{p.description}</p>
                    </div>

                    <div className="pt-6 mt-auto border-t border-border flex flex-col gap-5 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-[9px] lg:text-[10px] uppercase font-black tracking-widest transition-colors opacity-40 italic">Node Value</span>
                        <span className="text-foreground font-black text-xl lg:text-2xl font-mono transition-colors tracking-tighter">{p.price}</span>
                      </div>
                      
                      {p.type === 'paid' ? (
                        <button 
                          onClick={() => handleEnroll(p)}
                          className="w-full py-4 lg:py-5 bg-gradient-to-r from-primary to-amber-700 text-black text-center text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] rounded-xl lg:rounded-2xl hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group/btn"
                        >
                          Unlock Access <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEnroll(p)}
                          disabled={enrolling === p._id}
                          className="w-full py-4 lg:py-5 bg-primary text-black text-center text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] rounded-xl lg:rounded-2xl hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group/btn"
                        >
                          {enrolling === p._id ? 'Enrolling...' : (
                            <>Initialize Entry <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" /></>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
