import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Play, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Filter,
  BookOpen
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function MyPrograms() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL'); // ALL, ACTIVE, COMPLETED, PENDING

  useEffect(() => {
    const fetchMyPrograms = async () => {
      try {
        const res = await axios.get(`${API_URL}/enrollments/my`);
        setEnrollments(res.data);
      } catch (err) {
        console.error('Error fetching my programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPrograms();
  }, []);

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter(e => {
      const matchesSearch = e.program.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = 
        filter === 'ALL' || 
        (filter === 'ACTIVE' && e.status === 'Active' && e.progress < 100) ||
        (filter === 'COMPLETED' && e.progress === 100) ||
        (filter === 'PENDING' && e.status === 'Pending');
      return matchesSearch && matchesFilter;
    });
  }, [enrollments, searchTerm, filter]);

  if (loading) return <div className="h-full flex items-center justify-center font-sans"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8 lg:space-y-10 pb-20 font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-foreground uppercase tracking-tight italic leading-tight">My <span className="text-primary">Curriculum</span></h1>
          <p className="text-muted-foreground text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Manage Your Active Learning Nodes</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-card border border-border p-4 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] transition-colors">
        <div className="flex gap-2 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto scrollbar-hide no-scrollbar">
          {['ALL', 'ACTIVE', 'COMPLETED', 'PENDING'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === f ? 'bg-primary text-black' : 'bg-background border border-border text-muted-foreground hover:border-primary/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-96 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="SEARCH ENROLLMENTS..." 
            className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-primary/40 transition-all placeholder:text-muted-foreground/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {filteredEnrollments.length > 0 ? filteredEnrollments.map((enr) => (
          <motion.div 
            layout
            key={enr._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group bg-card border border-border rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden flex flex-col hover:border-primary/20 transition-all shadow-sm"
          >
            <div className="relative h-48 lg:h-56 overflow-hidden">
               <img src={enr.program.img} alt={enr.program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                    enr.status === 'Active' ? 'bg-emerald-500 text-black' : 'bg-amber-500 text-black'
                  }`}>
                    {enr.status}
                  </span>
                  {enr.progress === 100 && (
                    <span className="px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest bg-primary text-black flex items-center gap-1">
                       <CheckCircle2 size={10} /> Mastery
                    </span>
                  )}
               </div>
            </div>

            <div className="p-6 lg:p-8 flex flex-col flex-1 space-y-6">
               <div className="space-y-2">
                  <div className="flex items-center justify-between text-[8px] lg:text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                     <span>{enr.program.level} Node</span>
                     <span>{enr.progress}% COMPLETE</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-black text-foreground uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem] lg:min-h-[3.5rem] leading-tight">
                    {enr.program.title}
                  </h3>
               </div>

               <div className="space-y-2">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${enr.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                     />
                  </div>
               </div>

               <div className="pt-4 border-t border-border mt-auto">
                  {enr.status === 'Active' ? (
                    <Link 
                      to={`/dashboard/programs/${enr.program._id}`}
                      className="w-full py-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-2 group-hover:gap-3 transition-all active:scale-[0.98] shadow-xl shadow-primary/10"
                    >
                      {enr.progress === 100 ? 'Review Modules' : 'Resume Learning'} <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <div className="w-full py-4 bg-muted text-muted-foreground font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-2 border border-border/50 cursor-not-allowed">
                       <Clock size={14} /> Awaiting Approval
                    </div>
                  )}
               </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-24 lg:py-40 text-center space-y-6 bg-card border border-dashed border-border rounded-[2rem] lg:rounded-[3rem]">
             <div className="w-16 h-16 lg:w-20 lg:h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground/20">
                <BookOpen size={32} className="lg:size-40" />
             </div>
             <div className="space-y-2">
                <p className="text-base lg:text-lg font-black text-foreground uppercase tracking-tight italic">No Matching <span className="text-primary">Protocols</span></p>
                <p className="text-[9px] lg:text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] max-w-xs mx-auto">Adjust filters or explore our expert training catalog.</p>
             </div>
             <Link to="/programs" className="inline-block px-10 py-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-all">Explore Academy</Link>
          </div>
        )}
      </div>
    </div>
  );
}
