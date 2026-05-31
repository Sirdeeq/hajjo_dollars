import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Search,
  Moon,
  Sun,
  UserCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: BookOpen, label: 'My Programs', path: '/dashboard/programs' },
    { icon: Award, label: 'Certificates', path: '/dashboard/certificates' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: User, label: 'Profile Settings', path: '/dashboard/profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside 
        className={`hidden lg:flex flex-col bg-card border-r border-border transition-all duration-500 relative z-50 ${isSidebarOpen ? 'w-72' : 'w-20'}`}
      >
        <div className="p-6 h-24 flex items-center gap-4 shrink-0">
          <Link to="/" className="flex-shrink-0">
            <img src="/HAJJO DOLLARS WEALTH SOLUTIONS LOGO icon.png" alt="Logo" className="h-12 w-auto object-contain adaptive-logo drop-shadow-xl" />
          </Link>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black text-xl uppercase tracking-tighter transition-colors">
              Hajjo <span className="text-primary italic">Dollars</span>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                  isActive ? 'bg-primary text-black font-bold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-black' : 'text-muted-foreground group-hover:text-primary transition-colors'} />
                {isSidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest truncate">
                    {item.label}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-black rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all group"
          >
            <LogOut size={20} />
            {isSidebarOpen && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest font-bold">
                Exit Portal
              </motion.span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 lg:h-24 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 lg:px-10 shrink-0 z-40">
          <div className="flex items-center gap-2 lg:gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-foreground">
              <Menu size={24} />
            </button>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden lg:block p-2 text-muted-foreground hover:text-primary transition-colors">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-muted rounded-2xl border border-border group w-48 lg:w-96 transition-all focus-within:border-primary/40">
              <Search size={16} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="SEARCH ACADEMY..." className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest text-foreground focus:outline-none w-full placeholder:text-muted-foreground/30" />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <button onClick={toggleTheme} className="p-2 lg:p-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-primary transition-all">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className="flex items-center gap-3 lg:gap-4 pl-3 lg:pl-6 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black uppercase tracking-tight text-foreground truncate max-w-[100px] lg:max-w-[200px]">{user?.name}</p>
                <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Certified Scholar</p>
              </div>
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-br from-primary to-emerald-700 p-[1px] overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-full h-full rounded-[11px] lg:rounded-[15px] object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-[11px] lg:rounded-[15px] bg-card flex items-center justify-center text-primary font-black text-base lg:text-lg border border-black/10">
                    {user?.name?.[0]}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10 relative custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-card border-r border-border z-[101] flex flex-col p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <img src="/HAJJO DOLLARS WEALTH SOLUTIONS LOGO icon.png" alt="Logo" className="h-10 w-auto adaptive-logo" />
                  <div className="font-black text-xl uppercase tracking-tighter">Hajjo <span className="text-primary italic">Dollars</span></div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-muted-foreground"><X size={24} /></button>
              </div>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                      location.pathname === item.path ? 'bg-primary text-black font-bold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="text-xs uppercase tracking-widest font-black">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="pt-6 border-t border-border mt-auto">
                 <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all font-black uppercase text-xs tracking-widest">
                   <LogOut size={20} /> Sign Out
                 </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
