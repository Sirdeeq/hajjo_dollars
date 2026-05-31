import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  Video, 
  FileText, 
  Download, 
  ArrowLeft,
  Lock,
  MessageCircle,
  Menu,
  X,
  Send,
  Upload,
  BookOpen
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ProgramPlayer() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [program, setProgram] = useState(null);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState({}); // { moduleId: [lessons] }
  const [activeLesson, setActiveLesson] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});
  const [activeTab, setActiveTab] = useState('content'); // content, comments, assignments, feedback
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [moduleFeedback, setModuleFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsCurriculumOpen(true);
      else setIsCurriculumOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchData = async () => {
    try {
      const [progRes, enrRes] = await Promise.all([
        axios.get(`${API_URL}/programs`),
        axios.get(`${API_URL}/enrollments/my`)
      ]);
      
      const currentProg = progRes.data.find(p => p._id === programId);
      const currentEnr = enrRes.data.find(e => e.program._id === programId);
      
      if (!currentProg || !currentEnr || currentEnr.status !== 'Active') {
        navigate('/dashboard/programs');
        return;
      }
      
      setProgram(currentProg);
      setEnrollment(currentEnr);

      const modRes = await axios.get(`${API_URL}/modules/program/${programId}`);
      setModules(modRes.data);
      
      const lessonData = {};
      const initialExpanded = {};
      
      for (const mod of modRes.data) {
        const lesRes = await axios.get(`${API_URL}/lessons/module/${mod._id}`);
        lessonData[mod._id] = lesRes.data;
        initialExpanded[mod._id] = true;
      }
      
      setLessons(lessonData);
      setExpandedModules(initialExpanded);

      if (modRes.data.length > 0 && lessonData[modRes.data[0]._id]?.length > 0) {
        setActiveLesson(lessonData[modRes.data[0]._id][0]);
      }
      
      const assignRes = await axios.get(`${API_URL}/assignments/program/${programId}`);
      setAssignments(assignRes.data);
    } catch (err) {
      console.error('Error fetching program player data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [programId]);
  
  useEffect(() => {
    if (activeLesson) {
      fetchComments();
      fetchModuleFeedback();
    }
  }, [activeLesson]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_URL}/comments/lesson/${activeLesson._id}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };
  
  const fetchModuleFeedback = async () => {
    const currentModule = modules.find(mod => (lessons[mod._id] || []).some(les => les._id === activeLesson?._id));
    if (!currentModule) return;
    try {
      const res = await axios.get(`${API_URL}/module-feedback/module/${currentModule._id}`);
      setModuleFeedback(res.data);
    } catch (err) {
      console.error('Error fetching module feedback:', err);
    }
  };

  const toggleModule = (id) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const markComplete = async () => {
    if (!activeLesson || !enrollment) return;
    try {
      await axios.put(`${API_URL}/enrollments/complete-lesson/${enrollment._id}/${activeLesson._id}`);
      const res = await axios.get(`${API_URL}/enrollments/my`);
      setEnrollment(res.data.find(e => e._id === enrollment._id));
      playNextLesson();
    } catch (err) {
      console.error('Error marking lesson complete:', err);
    }
  };

  const playNextLesson = () => {
    let currentFound = false;
    for (const mod of modules) {
      const modLessons = lessons[mod._id] || [];
      for (const les of modLessons) {
        if (currentFound) {
          setActiveLesson(les);
          return;
        }
        if (les._id === activeLesson?._id) currentFound = true;
      }
    }
  };
  
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(`${API_URL}/comments`, {
        content: newComment,
        lesson: activeLesson._id,
        program: programId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };
  
  const handleAddFeedback = async () => {
    if (!newFeedback.trim()) return;
    const currentModule = modules.find(mod => (lessons[mod._id] || []).some(les => les._id === activeLesson?._id));
    if (!currentModule) return;
    try {
      await axios.post(`${API_URL}/module-feedback`, {
        content: newFeedback,
        module: currentModule._id,
        program: programId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewFeedback('');
      fetchModuleFeedback();
    } catch (err) {
      console.error('Error adding feedback:', err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const currentModule = modules.find(mod => (lessons[mod._id] || []).some(les => les._id === activeLesson?._id));

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden text-foreground font-sans">
      <header className="h-16 lg:h-20 border-b border-border bg-card/50 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-2 lg:gap-4 overflow-hidden">
          <Link to="/dashboard/programs" className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground shrink-0">
            <ArrowLeft size={20} />
          </Link>
          <div className="overflow-hidden">
            <h2 className="text-[11px] lg:text-sm font-black uppercase tracking-tight truncate max-w-[150px] sm:max-w-[300px]">{program?.title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
               <div className="w-16 lg:w-24 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${enrollment?.progress}%` }} />
               </div>
               <span className="text-[8px] lg:text-[9px] font-bold text-primary uppercase">{enrollment?.progress}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
           {program?.whatsappLink && (
             <a href={program.whatsappLink} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2 bg-[#25D366]/10 text-[#25D366] text-[9px] lg:text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[#25D366]/20 transition-all">
               <MessageCircle size={14} /> <span className="hidden lg:inline">Community</span>
             </a>
           )}
           <button onClick={() => setIsCurriculumOpen(!isCurriculumOpen)} className="p-2 bg-muted rounded-xl text-foreground lg:hidden">
             {isCurriculumOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <AnimatePresence>
          {isCurriculumOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => window.innerWidth < 1024 && setIsCurriculumOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.aside 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-card border-l border-border z-[61] flex flex-col lg:relative lg:translate-x-0 lg:w-[400px] lg:z-10"
              >
                <div className="p-6 border-b border-border flex justify-between items-center shrink-0">
                  <h3 className="text-sm font-black uppercase tracking-tight italic">Curriculum <span className="text-primary">Node</span></h3>
                  <button onClick={() => setIsCurriculumOpen(false)} className="lg:hidden p-2 text-muted-foreground"><X size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                  {modules.map((mod, mIdx) => (
                    <div key={mod._id} className="space-y-2">
                        <button 
                          onClick={() => toggleModule(mod._id)}
                          className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-2xl transition-all group"
                        >
                          <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-muted-foreground/30 font-mono">0{mIdx + 1}</span>
                              <span className="text-[11px] font-black uppercase tracking-tight text-left">{mod.title}</span>
                          </div>
                          {expandedModules[mod._id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>

                        <AnimatePresence>
                          {expandedModules[mod._id] && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="space-y-1 pl-4 overflow-hidden"
                            >
                              {(lessons[mod._id] || []).map((les, lIdx) => {
                                const isActive = activeLesson?._id === les._id;
                                const isCompleted = enrollment?.completedLessons?.includes(les._id);
                                return (
                                  <button 
                                    key={les._id}
                                    onClick={() => {
                                      setActiveLesson(les);
                                      if (window.innerWidth < 1024) setIsCurriculumOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left group ${
                                      isActive ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5' : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                                  >
                                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                        isCompleted ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500' : 
                                        isActive ? 'bg-primary/20 border-primary/30 text-primary' : 'border-border'
                                      }`}>
                                        {isCompleted ? <CheckCircle2 size={12} /> : isActive ? <Play size={12} className="ml-0.5" /> : <Video size={12} />}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className={`text-[10px] font-bold uppercase truncate ${isActive ? 'text-primary' : ''}`}>{les.title}</p>
                                        <p className="text-[8px] font-medium opacity-40 uppercase font-mono">{les.duration || '00:00'}</p>
                                      </div>
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-10">
           <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
              <div className="aspect-video bg-black rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl border border-border relative group">
                {activeLesson?.videoUrl ? (
                   <iframe 
                    src={activeLesson.videoUrl.replace('watch?v=', 'embed/')} 
                    className="w-full h-full"
                    allowFullScreen
                    title={activeLesson.title}
                   />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                    <Video size={48} className="text-muted-foreground/20" />
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/40">No Video Source Detected</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-2">
                   <h1 className="text-xl lg:text-2xl font-black uppercase tracking-tight">{activeLesson?.title}</h1>
                   <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-[9px] lg:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Play size={12} className="text-primary" /> {activeLesson?.duration || '00:00'} Duration</span>
                      <span className="hidden sm:inline text-border">/</span>
                      <span className="flex items-center gap-1.5"><FileText size={12} className="text-primary" /> Assets Attached</span>
                   </div>
                </div>
                <button 
                  onClick={markComplete}
                  className={`w-full lg:w-auto px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                    enrollment?.completedLessons?.includes(activeLesson?._id) 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : 'bg-primary text-black shadow-xl shadow-primary/20 hover:scale-[1.02]'
                  }`}
                >
                  {enrollment?.completedLessons?.includes(activeLesson?._id) ? (
                    <><CheckCircle2 size={16} /> Mastery Achieved</>
                  ) : (
                    <><CheckCircle2 size={16} /> Mark as Complete</>
                  )}
                </button>
              </div>
              
              <div className="flex gap-2 lg:gap-4 border-b border-border pb-1">
                {[
                  { id: 'content', label: 'Lesson', icon: Video },
                  { id: 'comments', label: 'Comments', icon: MessageCircle },
                  { id: 'assignments', label: 'Assignments', icon: FileText },
                  { id: 'feedback', label: 'Module Feedback', icon: BookOpen }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${
                      activeTab === tab.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <tab.icon size={14} className="inline mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="bg-card border border-border rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-12 space-y-8">
                {activeTab === 'content' && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Theoretical Foundations</h3>
                      <div className="prose prose-invert prose-sm lg:prose-base max-w-none text-muted-foreground text-xs lg:text-sm leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: activeLesson?.content || 'No theoretical notes provided for this lesson.' }} 
                      />
                    </div>

                    {activeLesson?.resources?.length > 0 && (
                      <div className="space-y-4 pt-8 border-t border-border">
                        <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Downloadable Assets</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {activeLesson.resources.map((res, i) => (
                             <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-primary/40 transition-all group">
                                <div className="flex items-center gap-3 overflow-hidden">
                                   <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                                      <Download size={14} />
                                   </div>
                                   <span className="text-[10px] font-black uppercase tracking-tight truncate">{res.title}</span>
                                </div>
                                <span className="text-[8px] font-bold text-muted-foreground uppercase shrink-0">{res.type}</span>
                             </a>
                           ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {activeTab === 'comments' && (
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Lesson Discussion</h3>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        value={newComment} 
                        onChange={e => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="flex-1 bg-background border border-border rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-primary/40"
                        onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                      />
                      <button onClick={handleAddComment} className="bg-primary text-black px-4 rounded-xl text-[10px] font-black uppercase flex items-center gap-2">
                        <Send size={14} /> Send
                      </button>
                    </div>
                    <div className="space-y-4">
                      {comments.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-8">No comments yet. Be the first!</p>
                      ) : comments.map(comment => (
                        <div key={comment._id} className="p-4 bg-background border border-border rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase text-primary">{comment.user?.name || 'Anonymous'}</span>
                            <span className="text-[8px] text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'assignments' && (
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Your Assignments</h3>
                    {assignments.filter(a => 
                      a.module === currentModule?._id || a.lesson === activeLesson?._id
                    ).length === 0 ? (
                      <p className="text-xs text-muted-foreground text-center py-8">No assignments for this lesson or module.</p>
                    ) : assignments.filter(a => 
                      a.module === currentModule?._id || a.lesson === activeLesson?._id
                    ).map(assign => (
                      <div key={assign._id} className="p-6 bg-background border border-border rounded-xl">
                        <h4 className="text-sm font-black uppercase mb-2">{assign.title}</h4>
                        <p className="text-xs text-muted-foreground mb-4">{assign.description}</p>
                        {assign.resources && assign.resources.length > 0 && (
                          <div className="space-y-2 mb-4">
                            <p className="text-[10px] font-bold uppercase text-primary">Resources:</p>
                            {assign.resources.map((res, i) => (
                              <a key={i} href={res.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-primary hover:underline">
                                <FileText size={12} /> {res.title}
                              </a>
                            ))}
                          </div>
                        )}
                        <button className="w-full py-3 bg-muted text-muted-foreground rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2">
                          <Upload size={14} /> Submit Assignment
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'feedback' && currentModule && (
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em]">Module Feedback: {currentModule.title}</h3>
                    <div className="flex gap-3">
                      <textarea 
                        value={newFeedback} 
                        onChange={e => setNewFeedback(e.target.value)}
                        placeholder="What did you learn in this module?"
                        rows={3}
                        className="flex-1 bg-background border border-border rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-primary/40"
                      />
                    </div>
                    <button onClick={handleAddFeedback} className="bg-primary text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase flex items-center gap-2">
                      <Send size={14} /> Share Your Learning
                    </button>
                    <div className="space-y-4">
                      {moduleFeedback.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-8">No feedback shared yet.</p>
                      ) : moduleFeedback.map(fb => (
                        <div key={fb._id} className="p-4 bg-background border border-border rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase text-primary">{fb.user?.name || 'Anonymous'}</span>
                            <span className="text-[8px] text-muted-foreground">{new Date(fb.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{fb.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}
