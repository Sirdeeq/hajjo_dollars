import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PhotoSlot from '../../components/PhotoSlot';
import SEO from '../../components/SEO';
import { teachingCPA, trainingSession, U } from '../../assets/images/index.js';

const steps = [
  { num:'01', title:'Drive Traffic',  desc:'Share your CPA link on TikTok, Instagram, Facebook, WhatsApp, or YouTube to attract visitors from anywhere.' },
  { num:'02', title:'Visitor Clicks', desc:"Someone clicks your link and lands on the advertiser's offer page." },
  { num:'03', title:'Action Taken',   desc:'They complete a simple action — sign up, download, register. No purchase needed.' },
  { num:'04', title:'You Get Paid',   desc:'The CPA network records the action and credits your commission. Done.' },
];
const actions = ['Sign Up / Register','App Download','Form Submission','Email Subscription','Free Trial Sign-up','Product Request'];
const sources = [
  { icon:'🎵', name:'TikTok',    img:U.tiktokContent,    alt:'TikTok content for CPA marketing',    desc:'Short videos. Massive global reach. Zero cost. The fastest way to get eyes on your offers.' },
  { icon:'📸', name:'Instagram', img:U.instagramContent, alt:'Instagram content for CPA marketing', desc:'Reels, stories, and carousels that build trust and drive consistent clicks worldwide.' },
  { icon:'👥', name:'Facebook',  img:U.facebookContent,  alt:'Facebook marketing for CPA',          desc:'Groups and pages for targeted, niche-specific reach at global scale.' },
  { icon:'💬', name:'WhatsApp',  img:U.whatsappChat,     alt:'WhatsApp marketing for CPA',          desc:'Status updates and broadcast lists for direct, personal traffic anywhere.' },
  { icon:'▶️',  name:'YouTube',  img:U.youtubeContent,   alt:'YouTube content for CPA marketing',   desc:'Long-form tutorials that build deep trust and rank on Google worldwide.' },
];
const startSteps = [
  { step:'1', title:'Choose a CPA Network', desc:'Sign up on a beginner-friendly network like CPAGrip, MaxBounty, or OGAds — all accept international publishers.' },
  { step:'2', title:'Pick an Offer',         desc:'Browse available offers and choose one that matches your audience and location.' },
  { step:'3', title:'Get Your Link',         desc:'Copy your unique tracking link from the network dashboard.' },
  { step:'4', title:'Drive Traffic',         desc:'Share your link using content that educates or entertains your audience on social media.' },
  { step:'5', title:'Track & Optimise',      desc:'Monitor clicks and conversions. Double down on what works.' },
];
const whyItems = [
  ['🆓','Free to start — no product or inventory needed'],
  ['📱','Works with just a smartphone and social media'],
  ['🎯','No selling — visitors just complete simple actions'],
  ['⚡','Faster results than traditional affiliate marketing'],
  ['🌍','Works from anywhere in the world'],
  ['📚','Skills are learnable — no tech background required'],
];

export default function CpaMarketing() {
  return (
    <>
      <SEO
        title="What is CPA Marketing? — A Complete Beginner's Guide"
        description="CPA marketing explained simply by Hajjo. Learn what Cost Per Action marketing is, how it works step by step, the best traffic sources, and how to start earning online from anywhere in the world."
        path="/cpa-marketing"
      />

      {/* PAGE HERO */}
      <section className="relative bg-background pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none transition-colors duration-500" style={{backgroundImage:'linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ EDUCATION</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <h1 className="display-serif text-[clamp(3rem,10vw,7rem)] font-black text-foreground leading-[0.9] transition-colors">
              CPA<br /><span className="italic text-primary">Marketing</span>
            </h1>
            <p className="text-foreground/55 text-lg sm:text-xl leading-relaxed transition-colors">
              <strong className="text-foreground">Cost Per Action</strong> — the beginner-friendly online income model where you earn every time someone completes a simple action through your link. No selling. No product. Works from anywhere in the world.
            </p>
          </div>
        </div>
      </section>

      {/* DEFINITION + PHOTO */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ SIMPLE DEFINITION</span>
              <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-6 sm:mb-8 transition-colors">
                The simplest way<br />to earn online —<br /><span className="italic text-primary">explained clearly.</span>
              </h2>
              <div className="accent-line mb-6 sm:mb-8" />
              <p className="text-foreground/60 text-base sm:text-lg leading-relaxed mb-5 transition-colors">
                You promote an offer. Someone clicks your link and does something simple — like signing up for a free app or filling a form. You get paid. That's it.
              </p>
              <p className="text-foreground/60 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 transition-colors">
                No selling. No convincing. No product to create. Just traffic, a link, and a simple action — right now, from wherever you are in the world, with just a phone.
              </p>
              <div className="border border-border bg-muted p-5 sm:p-7 transition-colors">
                <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] mb-4 sm:mb-5 transition-colors">THE FORMULA</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {['📣 Traffic','🔗 Offer','✅ Action'].map((item, i) => (
                    <div key={item} className="flex items-center gap-2 sm:gap-3">
                      <div className="border border-border px-3 sm:px-4 py-2 sm:py-2.5 text-foreground font-bold text-xs sm:text-sm transition-colors">{item}</div>
                      {i < 2 && <span className="text-muted-foreground text-lg sm:text-xl transition-colors">+</span>}
                    </div>
                  ))}
                  <span className="text-muted-foreground text-lg sm:text-xl transition-colors">=</span>
                  <div className="bg-primary px-4 sm:px-5 py-2 sm:py-2.5 text-black font-black text-xs sm:text-sm shadow-lg shadow-primary/10">💰 EARNINGS</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="hidden sm:block absolute -top-4 -right-4 w-full h-full border border-primary/15" />
              <PhotoSlot src={teachingCPA} alt="Hajjo teaching CPA marketing to beginners worldwide" aspectRatio="4/5" className="relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-14"><span className="section-label text-muted-foreground">⬡ STEP BY STEP</span></div>
          <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-10 sm:mb-14 transition-colors">
            How CPA Marketing<br /><span className="italic text-primary">Actually Works</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border mb-10 sm:mb-20">
            {steps.map(s => (
              <div key={s.num} className="bg-background hover:bg-card p-7 sm:p-8 transition-colors group">
                <span className="text-primary font-mono font-black text-3xl sm:text-4xl block mb-4 sm:mb-6 transition-colors">{s.num}</span>
                <h3 className="text-foreground font-bold text-base sm:text-lg mb-2 sm:mb-3 transition-colors">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed transition-colors">{s.desc}</p>
                <ArrowRight size={15} className="mt-5 sm:mt-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
          <div className="border border-border bg-muted p-6 sm:p-10 transition-colors">
            <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] mb-5 sm:mb-7 transition-colors">WHAT COUNTS AS AN ACTION?</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {actions.map(a => (
                <span key={a} className="border border-border bg-background hover:border-primary/50 text-muted-foreground hover:text-foreground text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 transition-all cursor-default">{a}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CPA + PHOTO */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <PhotoSlot src={U.phoneWork} alt="Beginner learning CPA marketing on a smartphone" aspectRatio="4/5" />
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 z-10 bg-primary px-5 py-3 sm:px-6 sm:py-4 shadow-2xl">
                <p className="text-black font-black text-lg sm:text-xl leading-none">100%</p>
                <p className="text-black/60 text-[10px] uppercase tracking-widest font-bold">Beginner Friendly</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ WHY CPA?</span>
              <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-6 sm:mb-8 transition-colors">
                Perfect for beginners<br /><span className="italic text-primary">because…</span>
              </h2>
              <div className="flex flex-col">
                {whyItems.map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-4 py-3.5 sm:py-4 border-b border-border last:border-b-0 transition-colors">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <span className="text-foreground/65 text-sm sm:text-base transition-colors">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAFFIC SOURCES */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-14"><span className="section-label text-muted-foreground">⬡ TRAFFIC SOURCES</span></div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
            <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] transition-colors">
              Where to Get<br /><span className="italic text-primary">Your Traffic</span>
            </h2>
            <p className="text-muted-foreground max-w-xs leading-relaxed sm:text-right text-sm transition-colors">No website needed. These platforms are free, global, and powerful for beginners.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border mb-10 sm:mb-16">
            {sources.map(s => (
              <div key={s.name} className="bg-background hover:bg-card p-7 sm:p-8 transition-colors">
                <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">{s.icon}</span>
                <h3 className="text-foreground font-black text-lg sm:text-xl mb-2 sm:mb-3 transition-colors">{s.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed transition-colors">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-border">
            {sources.map(s => (
              <PhotoSlot key={s.name} src={s.img} alt={s.alt} aspectRatio="1/1" />
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO START */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-14"><span className="section-label text-muted-foreground">⬡ GET STARTED</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-8 sm:mb-10 transition-colors">
                How You<br /><span className="italic text-primary">Start Today</span>
              </h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                {startSteps.map(s => (
                  <div key={s.step} className="flex items-start gap-4 sm:gap-5 border border-border bg-muted hover:border-primary/30 p-5 sm:p-6 transition-all">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary text-black flex items-center justify-center font-black text-sm flex-shrink-0">{s.step}</div>
                    <div>
                      <h4 className="text-foreground font-bold mb-1 text-sm sm:text-base transition-colors">{s.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed transition-colors">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block lg:sticky lg:top-28">
              <PhotoSlot src={trainingSession} alt="Hajjo Dollars mentoring and coaching session" aspectRatio="3/4" />
            </div>
          </div>
          <div className="text-center mt-12 sm:mt-16">
            <Link to="/programs" className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-sm px-8 sm:px-10 py-4 sm:py-5 transition-all hover:shadow-xl hover:shadow-primary/30">
              START LEARNING CPA MARKETING <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
