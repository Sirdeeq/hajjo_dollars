import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const navLinks = [
  { label: 'Home',          to: '/' },
  { label: 'About',         to: '/about' },
  { label: 'CPA Marketing', to: '/cpa-marketing' },
  { label: 'Programs',      to: '/programs' },
  { label: 'Results',       to: '/results' },
  { label: 'Blog',          to: '/blog' },
  { label: 'Contact',       to: '/contact' },
];

export default function Footer() {
  const [biodata, setBiodata] = useState({
    email: 'hello@hajjodollars.com',
    whatsapp: '2348000000000',
    tiktok: '@hajjodollars',
    instagram: '@hajjodollars',
    facebook: 'Hajjo Dollars',
    youtube: 'Hajjo Dollars'
  });

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/biodata`);
        if (response.ok) {
          const data = await response.json();
          setBiodata(data);
        }
      } catch (err) {
        console.error('Error fetching footer biodata:', err);
      }
    };
    fetchBiodata();
  }, []);

  const formatSocialUrl = (type, value) => {
    if (!value) return '#';
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    
    switch (type) {
      case 'tiktok':
        return `https://www.tiktok.com/${value.startsWith('@') ? value : '@' + value}`;
      case 'instagram':
        return `https://instagram.com/${value.startsWith('@') ? value.slice(1) : value}`;
      case 'facebook':
        return `https://facebook.com/${value}`;
      case 'youtube':
        return `https://youtube.com/${value.startsWith('@') ? value : '@' + value}`;
      default:
        return '#';
    }
  };

  const cleanWhatsappNumber = (num) => {
    if (!num) return '2348000000000';
    return num.replace(/[^0-9]/g, '');
  };

  const footerSocials = [
    { icon: '🎵', url: formatSocialUrl('tiktok', biodata.tiktok), label: 'TikTok' },
    { icon: '📸', url: formatSocialUrl('instagram', biodata.instagram), label: 'Instagram' },
    { icon: '👥', url: formatSocialUrl('facebook', biodata.facebook), label: 'Facebook' },
    { icon: '▶️', url: formatSocialUrl('youtube', biodata.youtube), label: 'YouTube' }
  ];

  return (
    <footer className="bg-card border-t border-border transition-colors duration-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 py-12 sm:py-16 border-b border-border transition-colors">

          {/* Brand — full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/HAJJO DOLLARS WEALTH SOLUTIONS LOGO icon.png"
                alt="Hajjo Dollars Wealth Solutions"
                className="h-20 sm:h-24 w-auto object-contain adaptive-logo"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-xs transition-colors">
              A global CPA marketing education platform founded in Nigeria — teaching
              beginners worldwide how to build real online income through digital skills.
            </p>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] italic transition-colors">
              "Learn the skill. Build the income."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-muted-foreground/40 text-[10px] uppercase tracking-[0.3em] mb-5 sm:mb-6 transition-colors">Navigation</p>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2.5 gap-x-4">
              {navLinks.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-muted-foreground hover:text-foreground text-sm uppercase tracking-widest transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-muted-foreground/40 text-[10px] uppercase tracking-[0.3em] mb-5 sm:mb-6 transition-colors">Contact</p>
            <ul className="flex flex-col gap-3 mb-7">
              <li>
                <a href={`https://wa.me/${cleanWhatsappNumber(biodata.whatsapp)}`} target="_blank" rel="noreferrer"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors font-semibold">
                  💬 WhatsApp Us
                </a>
              </li>
              <li>
                <a href={`mailto:${biodata.email}`}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors break-all transition-colors">
                  ✉️ {biodata.email}
                </a>
              </li>
            </ul>
            <p className="text-muted-foreground/40 text-[10px] uppercase tracking-[0.3em] mb-4 transition-colors">Follow</p>
            <div className="flex gap-2.5 flex-wrap">
              {footerSocials.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  className="w-9 h-9 border border-border bg-background hover:border-primary hover:bg-primary/10 flex items-center justify-center text-base transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 py-5 text-[11px] text-muted-foreground/30 uppercase tracking-widest text-center sm:text-left transition-colors">
          <p>© {new Date().getFullYear()} Hajjo Dollars Wealth Solutions. All rights reserved.</p>
          <p>Built to educate. Designed to empower.</p>
        </div>
      </div>
    </footer>
  );
}
