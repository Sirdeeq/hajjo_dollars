import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  Trash2,
  Inbox,
  Clock
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/notifications`);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const markRead = async (id) => {
    try {
      await axios.put(`${API_URL}/notifications/read/${id}`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) { console.error(err); }
  };

  const markAllRead = async () => {
    try {
      await axios.put(`${API_URL}/notifications/read-all`);
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (err) { console.error(err); }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API_URL}/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) { console.error(err); }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'enrollment': return <BookOpen className="text-blue-500" />;
      case 'achievement': return <Award className="text-amber-500" />;
      case 'system': return <AlertTriangle className="text-red-500" />;
      default: return <Bell className="text-primary" />;
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight italic">Notification <span className="text-primary">Center</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Real-time Operational Intelligence</p>
        </div>
        <button 
          onClick={markAllRead}
          className="px-6 py-3 bg-muted hover:bg-card border border-border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Clear All Unread
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {notifications.length > 0 ? notifications.map((n) => (
            <motion.div 
              layout
              key={n._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`group flex items-start gap-6 p-6 rounded-[2rem] border transition-all ${
                n.isRead ? 'bg-card/50 border-border/50 opacity-60' : 'bg-card border-primary/20 shadow-lg shadow-primary/5'
              }`}
            >
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                 n.isRead ? 'bg-muted border-border' : 'bg-primary/10 border-primary/20'
               }`}>
                  {getIcon(n.type)}
               </div>

               <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                     <h3 className={`text-sm font-black uppercase tracking-tight ${n.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>{n.title}</h3>
                     <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={10} /> {new Date(n.createdAt).toLocaleDateString()}
                     </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed uppercase font-medium">{n.message}</p>
                  
                  {!n.isRead && (
                    <button 
                      onClick={() => markRead(n._id)}
                      className="mt-3 text-[9px] font-black text-primary uppercase tracking-widest hover:underline"
                    >
                      Mark as Read
                    </button>
                  )}
               </div>

               <button 
                onClick={() => deleteNotification(n._id)}
                className="p-2 text-muted-foreground/20 hover:text-red-500 transition-colors"
               >
                  <Trash2 size={16} />
               </button>
            </motion.div>
          )) : (
            <div className="py-40 text-center space-y-6 bg-card border border-dashed border-border rounded-[3rem]">
               <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground/20">
                  <Inbox size={40} />
               </div>
               <div className="space-y-2">
                  <p className="text-lg font-black text-foreground uppercase tracking-tight italic">Inbox <span className="text-primary">Clear</span></p>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">No operational signals detected in your sector.</p>
               </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
