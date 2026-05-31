import { useRouteError, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Home, MessageSquare } from 'lucide-react';

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error('Application Error:', error);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-card border border-border rounded-[3rem] p-10 sm:p-12 shadow-2xl text-center space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto border border-red-500/20">
          <AlertTriangle size={40} />
        </div>

        <div className="space-y-3">
          <h1 className="display-serif text-3xl font-black text-foreground uppercase tracking-tight">System <span className="italic text-red-500">Anomaly</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em]">Critical Execution Failure Detected</p>
        </div>

        <div className="bg-muted/50 border border-border rounded-2xl p-5 text-left">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2 opacity-40 italic">Error_Payload_Log:</p>
          <p className="text-xs font-mono text-red-400 leading-relaxed break-words">
            {error.statusText || error.message || 'Unknown protocol violation in current sector.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw size={14} /> Re-Initialize Node
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/"
              className="py-4 border border-border text-foreground font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-muted transition-all flex items-center justify-center gap-2"
            >
              <Home size={14} /> Base
            </Link>
            <Link 
              to="/contact"
              className="py-4 border border-border text-foreground font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-muted transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={14} /> Support
            </Link>
          </div>
        </div>

        <p className="text-[9px] text-muted-foreground/30 uppercase font-bold tracking-[0.2em]">Hajjo Dollars — Automated Error Protocol</p>
      </motion.div>
    </div>
  );
}
