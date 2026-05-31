import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PhotoSlot from '../components/PhotoSlot';
import SEO from '../components/SEO';
import { heroPhoto, storyPhoto, trainingSession, speakingEvent, communityMeetup, behindScenes } from '../assets/images/index.js';

const ticker = ['CPA MARKETING','DIGITAL INCOME','TRAFFIC MASTERY','NIGERIA TO THE WORLD','HAJJO DOLLARS','ONLINE FREEDOM','BEGINNER FRIENDLY','REAL SKILLS'];
const stats = [
  { value:'500+', label:'Students Worldwide' },
  { value:'10+',  label:'CPA Networks' },
  { value:'5',    label:'Traffic Platforms' },
  { value:'100%', label:'Beginner Friendly' },
];
const services = [
  { num:'01', title:'1-on-1 Mentorship',  desc:'Personalised strategy sessions built around your goals. Direct access to the educator behind 500+ trained students worldwide.', to:'/programs', cta:'APPLY NOW' },
  { num:'02', title:'CPA Beginner Course', desc:'The complete A–Z system for starting CPA marketing from zero. Everything you need to run your first campaign — anywhere in the world.', to:'/programs', cta:'ENROLL NOW' },
  { num:'03', title:'Traffic Mastery',     desc:'Turn TikTok, Instagram, Facebook, WhatsApp, and YouTube into daily traffic machines for your CPA offers — no matter where you are.', to:'/programs', cta:'JOIN NOW' },
];
const gallery = [
  { src:trainingSession, alt:'Hajjo Dollars training session' },
  { src:speakingEvent,   alt:'Hajjo speaking at a global event' },
  { src:communityMeetup, alt:'Hajjo Dollars worldwide community' },
  { src:behindScenes,    alt:'Behind the scenes at Hajjo Dollars' },
];

export default function Home() {
  const track = [...ticker, ...ticker];
  return (
    <>
      <SEO
        title="CPA Marketing Training Worldwide"
        description="Hajjo Dollars Wealth Solutions — a global CPA marketing education platform founded in Nigeria. Learn how to earn online with CPA marketing, traffic generation, and digital skills — step by step, no experience needed."
        path="/"
      />

      {/* HERO */}
      <section className="relative min-h-screen bg-background flex flex-col overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none transition-colors duration-500" style={{backgroundImage:'linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 flex justify-center pt-28 sm:pt-36 pb-4 px-4 text-center">
          <span className="section-label text-muted-foreground">NIGERIAN-BORN · GLOBAL ENTREPRENEUR · CPA MARKETING EDUCATOR</span>
        </div>

        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto w-full px-5 sm:px-6 gap-8 lg:gap-12 items-center py-8 lg:pb-16 font-sans">
          <div className="text-center lg:text-left space-y-4">
            <h1 className="display-serif text-[clamp(2.8rem,10vw,8rem)] font-black text-foreground leading-[0.95] lg:leading-[0.9] tracking-tighter mb-4 transition-colors fade-up">
              Hajjo<br /><span className="italic text-primary">Dollars</span>
            </h1>
            <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 transition-colors fade-up fade-up-delay-1">Wealth Solutions Node</p>
            <p className="text-foreground/60 text-sm sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed mb-8 transition-colors fade-up fade-up-delay-2">
              The CPA marketing educator who started from Nigeria and now teaches
              scholars worldwide how to build high-performance income streams.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start fade-up fade-up-delay-3 pt-4">
              <Link to="/programs" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs px-8 py-4 lg:py-5 transition-all hover:shadow-2xl hover:shadow-primary/30 active:scale-[0.98]">
                START ACQUISITION <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border hover:border-foreground/50 text-foreground font-bold uppercase tracking-widest text-xs px-8 py-4 lg:py-5 transition-all active:scale-[0.98]">
                HER STORY
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -top-4 -right-4 w-full h-full border border-primary/20" />
              <PhotoSlot src={heroPhoto} alt="Hajjo — global CPA marketing educator" aspectRatio="3/4" className="relative z-10" />
              <div className="absolute -bottom-6 -left-6 z-20 bg-primary px-5 py-4 shadow-2xl">
                <p className="text-black font-black text-2xl leading-none">500+</p>
                <p className="text-black/70 text-[10px] uppercase tracking-widest font-bold">Students Worldwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-border grid grid-cols-2 md:grid-cols-4 bg-background transition-colors duration-300">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center justify-center py-5 sm:py-7 px-3 ${i%2===0?'border-r border-border':''} ${i<2?'border-b md:border-b-0 border-border':''} ${i===1||i===2?'md:border-r md:border-border':''}`}>
              <span className="text-2xl sm:text-3xl font-black text-foreground transition-colors">{s.value}</span>
              <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-widest mt-1 text-center transition-colors">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 bg-primary py-3 overflow-hidden">
          <div className="ticker-track">
            {track.map((t, i) => (
              <span key={i} className="text-black font-black text-xs uppercase tracking-[0.2em] px-6 sm:px-8 flex-shrink-0">
                {t} <span className="opacity-40 mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-12"><span className="section-label text-muted-foreground">⬡ HER STORY</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-3 -left-3 w-full h-full border border-border" />
              <PhotoSlot src={storyPhoto} alt="Hajjo Dollars — the story behind the brand" aspectRatio="4/5" className="relative z-10" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="display-serif text-[clamp(2rem,6vw,4rem)] font-black text-foreground leading-[1.05] mb-5 transition-colors">
                She Didn't Wait<br />for Opportunity.<br /><span className="italic text-primary">She Built It.</span>
              </h2>
              <div className="accent-line mb-5" />
              <p className="text-foreground/60 text-base sm:text-lg leading-relaxed mb-4 transition-colors">
                Growing up in Nigeria with nothing but a smartphone and a hunger to change
                her story, Hajjo discovered CPA marketing — and everything shifted.
              </p>
              <p className="text-foreground/60 text-base sm:text-lg leading-relaxed mb-8 transition-colors">
                Today, through Hajjo Dollars Wealth Solutions, she teaches hundreds of
                beginners worldwide the exact skills that changed her life — step by step, no hype.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 border border-border hover:border-primary text-foreground hover:text-primary font-bold uppercase tracking-widest text-sm px-6 py-3.5 transition-all">
                READ HER FULL STORY <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-12"><span className="section-label text-muted-foreground">⬡ WORK WITH HAJJO</span></div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-12">
            <h2 className="display-serif text-[clamp(2rem,6vw,4rem)] font-black text-foreground leading-[1.05] transition-colors">
              Programs That<br /><span className="italic text-primary">Transform</span>
            </h2>
            <Link to="/programs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-xs uppercase tracking-widest transition-colors flex-shrink-0">
              EXPLORE ALL <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map(s => (
              <div key={s.num} className="bg-background hover:bg-card p-7 sm:p-10 flex flex-col gap-4 transition-colors group">
                <span className="text-primary font-mono font-black text-xs">{s.num}</span>
                <h3 className="text-foreground font-black text-lg sm:text-xl transition-colors">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 transition-colors">{s.desc}</p>
                <Link to={s.to} className="inline-flex items-center gap-2 text-muted-foreground group-hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors mt-2">
                  {s.cta} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="bg-card py-14 sm:py-20 border-t border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-10"><span className="section-label text-muted-foreground">⬡ BEHIND THE SCENES</span></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {gallery.map(img => (
              <PhotoSlot key={img.alt} src={img.src} alt={img.alt} aspectRatio="1/1" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-primary py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-7 text-center lg:text-left">
          <div>
            <p className="text-black/50 text-xs uppercase tracking-[0.3em] mb-3 font-bold">Ready to start — wherever you are?</p>
            <h2 className="display-serif text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight">
              Transform your income.<br />Start today.
            </h2>
          </div>
          <Link to="/contact" className="flex-shrink-0 inline-flex items-center gap-3 bg-foreground hover:bg-foreground/90 text-background font-black uppercase tracking-widest text-sm px-8 py-4 sm:py-5 transition-all shadow-2xl shadow-foreground/10 transition-colors">
            BOOK A SESSION <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
