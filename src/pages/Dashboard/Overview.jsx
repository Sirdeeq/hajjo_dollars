import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Zap, 
  ArrowRight, 
  Play,
  CheckCircle2,
  TrendingUp,
  Users
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    enrolled: 0,
    active: 0,
    completed: 0,
    certificates: 0
  });
  const [recentPrograms, setRecentPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${API_URL}/enrollments/my`);
        const enrollments = res.data;
        
        setStats({
          enrolled: enrollments.length,
          active: enrollments.filter(e => e.status === 'Active' && e.progress < 100).length,
          completed: enrollments.filter(e => e.progress === 100).length,
          certificates: enrollments.filter(e => e.progress === 100).length
        });
        
        setRecentPrograms(enrollments.slice(0, 3));
      } catch (err) {
        console.error('Error fetching overview:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8 lg:space-y-12 pb-20 font-sans">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground uppercase tracking-tight leading-tight">
            Welcome Back, <span className="text-primary italic">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
            <TrendingUp size={14} className="text-primary shrink-0" /> <span className="truncate">Your Momentum is Peak</span>
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <Link to="/programs" className="w-full sm:w-auto px-6 py-4 bg-card border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary/40 transition-all flex items-center justify-center gap-3">
             Catalog <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {[
          { label: 'Enrolled', value: stats.enrolled, icon: BookOpen, color: 'text-blue-500' },
          { label: 'Active', value: stats.active, icon: Zap, color: 'text-primary' },
          { label: 'Mastery', value: stats.completed, icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Badges', value: stats.certificates, icon: Award, color: 'text-amber-500' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            variants={item}
            className="bg-card border border-border p-5 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] relative overflow-hidden group hover:border-primary/20 transition-all"
          >
            <div className="absolute top-0 right-0 p-3 lg:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={48} className="lg:size-16" />
            </div>
            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-muted flex items-center justify-center ${stat.color} mb-3 lg:mb-4 shrink-0`}>
              <stat.icon size={16} className="lg:size-20" />
            </div>
            <div className="space-y-1">
              <p className="text-xl lg:text-2xl font-black text-foreground font-mono">{stat.value}</p>
              <p className="text-[8px] lg:text-[10px] font-black text-muted-foreground uppercase tracking-widest truncate">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-lg lg:text-xl font-black text-foreground uppercase tracking-tight italic">Continue <span className="text-primary">Learning</span></h2>
              <Link to="/dashboard/programs" className="text-[9px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors shrink-0">View All</Link>
           </div>

           <div className="space-y-4">
              {recentPrograms.length > 0 ? recentPrograms.map((enrollment) => (
                <Link 
                  to={`/dashboard/programs/${enrollment.program._id}`} 
                  key={enrollment._id}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 p-4 lg:p-6 bg-card border border-border rounded-[1.5rem] lg:rounded-[2.5rem] hover:border-primary/30 transition-all relative overflow-hidden"
                >
                  <div className="w-full sm:w-32 h-24 sm:h-20 rounded-xl lg:rounded-2xl overflow-hidden shrink-0 border border-border">
                    <img src={enrollment.program.img} alt={enrollment.program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 space-y-2 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black px-2 py-0.5 bg-primary/10 text-primary rounded uppercase tracking-widest">{enrollment.program.level}</span>
                      <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest truncate">{new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors truncate">{enrollment.program.title}</h3>
                    <div className="flex items-center gap-3">
                       <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${enrollment.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-primary shadow-[0_0_8px_rgba(212,175,55,0.3)]"
                          />
                       </div>
                       <span className="text-[10px] font-black font-mono text-primary">{enrollment.progress}%</span>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all shadow-xl shadow-transparent group-hover:shadow-primary/20 shrink-0">
                      <Play size={20} className="ml-1" />
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="py-16 lg:py-24 text-center bg-card border border-dashed border-border rounded-[1.5rem] lg:rounded-[2.5rem] space-y-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground/30 shrink-0">
                    <BookOpen size={28} className="lg:size-32" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs lg:text-sm font-black text-foreground uppercase">No Active Enrollments</p>
                    <p className="text-[10px] text-muted-foreground max-w-xs mx-auto uppercase font-bold tracking-widest">Initialize your learning path now.</p>
                  </div>
                  <Link to="/programs" className="inline-block px-8 py-3 bg-primary text-black text-[9px] lg:text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">Browse Catalog</Link>
                </div>
              )}
           </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-8">
           <h2 className="text-lg lg:text-xl font-black text-foreground uppercase tracking-tight italic">Academy <span className="text-primary">Status</span></h2>
           
           <div className="bg-card border border-border rounded-[1.5rem] lg:rounded-[2.5rem] p-6 lg:p-8 space-y-6">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Mastery Level</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Beginner</span>
                 </div>
                 <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/4 shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                 </div>
              </div>

              <div className="space-y-4 pt-4 lg:pt-6 border-t border-border">
                 <div className="flex items-center gap-4">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-muted flex items-center justify-center text-primary shrink-0">
                       <Zap size={18} className="lg:size-20" />
                    </div>
                    <div className="overflow-hidden">
                       <p className="text-[11px] lg:text-xs font-black text-foreground uppercase tracking-tight truncate">Active Streak</p>
                       <p className="text-[9px] lg:text-[10px] text-muted-foreground font-mono uppercase truncate">2 Days Current</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-muted flex items-center justify-center text-primary shrink-0">
                       <Award size={18} className="lg:size-20" />
                    </div>
                    <div className="overflow-hidden">
                       <p className="text-[11px] lg:text-xs font-black text-foreground uppercase tracking-tight truncate">Next Badge</p>
                       <p className="text-[9px] lg:text-[10px] text-muted-foreground font-mono uppercase truncate">Course Finisher</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Announcement Card */}
           <div className="bg-primary border border-primary/20 rounded-[1.5rem] lg:rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-black/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                 <h3 className="text-black text-base lg:text-lg font-black uppercase tracking-tight leading-tight">Content <br className="hidden lg:block"/> Release</h3>
                 <p className="text-black/70 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest leading-relaxed">Advanced strategies detected in sector.</p>
                 <button className="w-full lg:w-auto px-5 py-2.5 bg-black text-primary text-[9px] font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-all">Explore</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
