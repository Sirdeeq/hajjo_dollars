import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, UserCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const links = [
  { label: 'About',         to: '/about' },
  { label: 'CPA Marketing', to: '/cpa-marketing' },
  { label: 'Programs',      to: '/programs' },
  { label: 'Results',       to: '/results' },
  { label: 'Blog',          to: '/blog' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const close = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 whitespace-nowrap ${
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block py-4 text-sm font-semibold border-b border-border uppercase tracking-widest transition-colors ${
      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center h-[80px] sm:h-[90px] gap-4 sm:gap-8">

        {/* Logo */}
        <Link to="/" onClick={close} className="flex-shrink-0" aria-label="Hajjo Dollars home">
          <img
            src="/HAJJO DOLLARS WEALTH SOLUTIONS LOGO icon.png"
            alt="Hajjo Dollars Wealth Solutions"
            className="h-14 sm:h-16 lg:h-[72px] w-auto object-contain drop-shadow-lg adaptive-logo"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0 ml-auto" aria-label="Main navigation">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={linkClass}>{l.label}</NavLink>
          ))}
        </nav>

        {/* Desktop Theme Toggle & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-[12px] font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-border"
                  />
                ) : (
                  <UserCircle size={24} className="text-primary" />
                )}
                <span className="hidden md:block">{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 border border-border text-foreground font-bold text-[12px] uppercase tracking-widest px-4 py-2 transition-all rounded-lg"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-bold uppercase tracking-widest text-foreground hover:text-primary transition-all"
              >
                Login
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-bold text-[13px] uppercase tracking-widest px-5 py-2.5 transition-all hover:shadow-lg hover:shadow-primary/30 flex-shrink-0"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <div className="lg:hidden ml-auto flex items-center gap-4">
           <ThemeToggle />
           <button
            className="flex items-center justify-center w-10 h-10 text-foreground"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`lg:hidden bg-card border-t border-border overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!open}
      >
        {/* Logo in drawer */}
        <div className="px-5 sm:px-6 pt-5 pb-2 border-b border-border">
          <img
            src="/HAJJO DOLLARS WEALTH SOLUTIONS LOGO icon.png"
            alt="Hajjo Dollars Wealth Solutions"
            className="h-14 w-auto object-contain adaptive-logo"
          />
        </div>
        <nav className="flex flex-col px-5 sm:px-6 pt-3 pb-5" aria-label="Mobile navigation">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={mobileLinkClass} onClick={close}>
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <div className="space-y-3 pt-4 border-t border-border">
              <Link
                to="/dashboard"
                onClick={close}
                className="flex items-center gap-3 bg-primary/10 text-primary font-black text-[11px] uppercase tracking-widest px-4 py-3 rounded-lg border border-primary/20"
              >
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle size={20} />
                )}
                My Dashboard
              </Link>
              <button
                onClick={() => { logout(); close(); }}
                className="w-full flex items-center gap-3 bg-muted text-muted-foreground font-black text-[11px] uppercase tracking-widest px-4 py-3 rounded-lg border border-border"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-border space-y-3">
              <Link
                to="/login"
                onClick={close}
                className="w-full flex items-center justify-center text-[11px] font-black uppercase tracking-widest py-3 text-foreground hover:text-primary"
              >
                Login
              </Link>
              <Link
                to="/contact"
                onClick={close}
                className="mt-2 bg-primary hover:bg-primary/90 text-black font-black text-sm uppercase tracking-widest text-center py-4 transition-colors rounded-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
