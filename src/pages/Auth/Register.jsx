import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6 bg-card border border-border p-12 rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
            <UserPlus size={40} />
          </div>
          <h2 className="display-serif text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">Success <span className="italic text-primary">Unlocked</span></h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto font-medium">
            Your scholar identity has been initialized. Verify your email to activate the access protocol.
          </p>
          <div className="pt-4">
            <Link to="/login" className="text-primary font-black uppercase text-xs tracking-widest hover:underline decoration-2 underline-offset-4">Proceed to Login</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Join the Academy — Hajjo Dollars Wealth Solutions" description="Create your student account to access world-class CPA marketing training." path="/register" />
      
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[30%] sm:w-[40%] h-[40%] bg-primary/5 rounded-full blur-[80px] lg:blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] sm:w-[40%] h-[40%] bg-primary/5 rounded-full blur-[80px] lg:blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="bg-card border border-border rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="text-center space-y-4 mb-8 sm:mb-10">
              <div className="flex justify-center mb-2 transition-colors">
                <img
                  src="/HAJJO DOLLARS WEALTH SOLUTIONS LOGO icon.png"
                  alt="Hajjo Dollars Wealth Solutions Logo"
                  className="h-20 w-auto object-contain drop-shadow-xl adaptive-logo"
                />
              </div>
              <h1 className="display-serif text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight leading-tight">Create <span className="italic text-primary">Account</span></h1>
              <p className="text-muted-foreground text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">Initialize Scholar Identity</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 sm:p-4 flex items-center gap-3 text-red-500 text-[10px] sm:text-xs font-bold mb-6 sm:mb-8"
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Legal Name</label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Sadiq Idris"
                    required
                    className="w-full bg-background border border-border rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-all font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Communication ID</label>
                <div className="relative group">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    required
                    className="w-full bg-background border border-border rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-all font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Access Protocol</label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Create Password"
                    required
                    className="w-full bg-background border border-border rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-all font-medium tracking-widest"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Confirm Protocol</label>
                <div className="relative group">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Confirm Password"
                    required
                    className="w-full bg-background border border-border rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/40 transition-all font-medium tracking-widest"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 sm:py-5 bg-primary text-black font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] rounded-xl sm:rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 group mt-2 sm:mt-4"
              >
                {loading ? 'Initializing...' : (
                  <>
                    Deploy Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border text-center">
              <p className="text-muted-foreground text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                Already a Scholar? <Link to="/login" className="text-primary hover:underline decoration-2 underline-offset-4 ml-1">Sign In</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
