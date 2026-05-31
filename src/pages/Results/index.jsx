import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PhotoSlot from '../../components/PhotoSlot';
import SEO from '../../components/SEO';
import { communityMeetup, communityPhoto, trainingSession, U } from '../../assets/images/index.js';

const testimonials = [
  { name:'Amina K.',    location:'Lagos, Nigeria',        avatar:'👩🏾', program:'CPA Beginner Course',    text:'Before joining, I had no idea what CPA marketing was. Now I understand how traffic works, how to pick offers, and I have set up my first campaign. The lessons are clear and structured.',    result:'Completed course in 3 weeks' },
  { name:'Emeka O.',    location:'Abuja, Nigeria',         avatar:'👨🏾', program:'Traffic Mastery',         text:'I already had a TikTok account but had no idea how to use it for marketing. This training changed everything. My understanding of traffic generation is completely different now.',           result:'Mastered TikTok traffic strategy' },
  { name:'Fatima B.',   location:'Kano, Nigeria',          avatar:'👩🏾‍💼', program:'1-on-1 Mentorship',      text:'Having a mentor made all the difference. Whenever I was confused, I got direct answers. The step-by-step coaching helped me stay on track and actually apply what I was learning.',          result:'First campaign live with mentor support' },
  { name:'Chukwudi A.', location:'Port Harcourt, Nigeria', avatar:'👨🏾‍💻', program:'CPA Beginner Course',    text:'I tried learning CPA on YouTube but got overwhelmed by conflicting advice. This course gave me a clear, structured path. I now know exactly what steps to take and in what order.',           result:'From confused to confident in 4 weeks' },
  { name:'Blessing N.', location:'Enugu, Nigeria',         avatar:'👩🏾‍🎓', program:'Traffic Mastery',         text:'I use Instagram every day but never thought I could use it to earn online. This training opened my eyes. I am now building an audience and learning how to promote CPA offers properly.',    result:'Building Instagram audience for CPA' },
  { name:'Ibrahim M.',  location:'Kaduna, Nigeria',        avatar:'👨🏾‍🏫', program:'1-on-1 Mentorship',      text:"The mentorship program is worth every kobo. Hajjo reviewed my content, corrected my mistakes, and helped me understand what I was doing wrong. Honest, direct guidance.",                   result:'Personalised feedback on first campaign' },
];

const learningPoints = [
  { num:'01', title:'Traffic Generation',  desc:'Drive visitors to CPA offers using free social media platforms — from anywhere in the world.' },
  { num:'02', title:'CPA Network Basics',  desc:'Sign up, navigate dashboards, and pick the right offers for your audience.' },
  { num:'03', title:'Content Creation',    desc:'Create posts, videos, and stories that attract clicks globally.' },
  { num:'04', title:'Campaign Tracking',   desc:'Read stats, understand conversions, and improve results.' },
  { num:'05', title:'Offer Selection',     desc:'Match offers to your audience and traffic source worldwide.' },
  { num:'06', title:'Global Strategies',   desc:'Strategies that work for beginners everywhere — built from Nigerian roots.' },
];

const stats = [
  { value:'500+', label:'Students Worldwide' },
  { value:'3',    label:'Programs Available' },
  { value:'5',    label:'Traffic Platforms' },
  { value:'100%', label:'Beginner Friendly' },
];

export default function Results() {
  return (
    <>
      <SEO
        title="Student Results & Testimonials — Hajjo Dollars Wealth Solutions"
        description="See what 500+ students worldwide are saying about Hajjo Dollars Wealth Solutions. Real progress, real skills, real testimonials from beginners learning CPA marketing with Hajjo."
        path="/results"
      />

      {/* PAGE HERO */}
      <section className="relative bg-background pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none transition-colors duration-500" style={{backgroundImage:'linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ RESULTS</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <h1 className="display-serif text-[clamp(2.8rem,10vw,7rem)] font-black text-foreground leading-[0.9] transition-colors">
              Real Students.<br /><span className="italic text-primary">Real Progress.</span>
            </h1>
            <p className="text-foreground/55 text-lg sm:text-xl leading-relaxed transition-colors">
              No fake income screenshots. No manufactured hype. Just honest progress
              from real beginners worldwide who committed to learning the skill with Hajjo.
            </p>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-card border-y border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 bg-border/20">
            {stats.map((s, i) => (
              <div key={s.label} className={`bg-card flex flex-col items-center justify-center py-8 sm:py-10 px-3 transition-colors ${i%2===0?'border-r border-border':''} ${i<2?'border-b md:border-b-0 border-border':''} ${i===1||i===2?'md:border-r md:border-border':''}`}>
                <span className="text-3xl sm:text-4xl font-black text-foreground mb-1 transition-colors">{s.value}</span>
                <span className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-widest text-center transition-colors">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY PHOTO + QUOTE */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ THE COMMUNITY</span>
              <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-6 sm:mb-8 transition-colors">
                500+ Beginners<br /><span className="italic text-primary">Who Chose to Learn</span>
              </h2>
              <div className="accent-line mb-6 sm:mb-8" />
              <p className="text-foreground/55 text-base sm:text-lg leading-relaxed mb-5 transition-colors">
                Every student in Hajjo's global community started exactly where you are —
                with no experience, no network, and no idea where to begin.
              </p>
              <p className="text-foreground/55 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 transition-colors">
                What changed for them was a decision: to stop scrolling and start learning.
                The results below are about skill built, confidence gained, and campaigns
                launched — all under Hajjo's guidance, from anywhere in the world.
              </p>
              <div className="border-l-2 border-primary pl-5 sm:pl-6 py-2">
                <p className="display-serif text-lg sm:text-xl italic text-foreground/80 leading-relaxed transition-colors">
                  "I don't promise overnight riches. I teach real skills that build
                  real income — one step at a time, for anyone willing to learn."
                </p>
                <p className="text-muted-foreground text-xs uppercase tracking-widest mt-3 transition-colors">— HAJJO</p>
              </div>
            </div>
            <div className="relative">
              <div className="hidden sm:block absolute -top-4 -right-4 w-full h-full border border-primary/15" />
              <PhotoSlot src={communityPhoto} alt="Hajjo Dollars global student community" aspectRatio="4/5" className="relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-14"><span className="section-label text-muted-foreground">⬡ STUDENT STORIES</span></div>
          <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-10 sm:mb-14 transition-colors">
            What Her Students<br /><span className="italic text-primary">Are Saying</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {testimonials.map(t => (
              <article key={t.name} className="bg-card hover:bg-muted p-6 sm:p-8 flex flex-col gap-4 sm:gap-5 transition-colors">
                <div className="text-primary text-sm tracking-widest">★★★★★</div>
                <p className="text-foreground/60 text-sm leading-relaxed flex-1 italic transition-colors">"{t.text}"</p>
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 self-start">🏆 {t.result}</div>
                <div className="flex items-center gap-3 pt-4 border-t border-border transition-colors">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0">{t.avatar}</div>
                  <div>
                    <p className="text-foreground font-bold text-sm transition-colors">{t.name}</p>
                    <p className="text-muted-foreground text-xs transition-colors">📍 {t.location} · {t.program}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO WALL */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-14"><span className="section-label text-muted-foreground">⬡ STUDENT MOMENTS</span></div>
          <h2 className="display-serif text-[clamp(1.8rem,5vw,3rem)] font-black text-foreground leading-[1.05] mb-8 sm:mb-12 transition-colors">Inside the Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-px">
            <div className="col-span-2"><PhotoSlot src={communityMeetup} alt="Hajjo Dollars community event" aspectRatio="1/1" /></div>
            <PhotoSlot src={U.studentLearning} alt="Student learning CPA marketing" aspectRatio="1/1" />
            <PhotoSlot src={U.studentPhone}    alt="Student using phone for CPA"    aspectRatio="1/1" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border">
            <PhotoSlot src={U.analytics}    alt="CPA campaign analytics"         aspectRatio="16/9" />
            <PhotoSlot src={U.dashboard}    alt="Marketing dashboard results"    aspectRatio="16/9" />
            <div className="hidden sm:block"><PhotoSlot src={trainingSession} alt="Hajjo Dollars training" aspectRatio="16/9" /></div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-14"><span className="section-label text-muted-foreground">⬡ CURRICULUM HIGHLIGHTS</span></div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
            <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] transition-colors">
              What Students<br /><span className="italic text-primary">Are Learning</span>
            </h2>
            <p className="text-muted-foreground max-w-xs leading-relaxed sm:text-right text-sm transition-colors">Practical, step-by-step lessons that work for beginners everywhere in the world.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {learningPoints.map(l => (
              <div key={l.num} className="bg-card hover:bg-muted p-7 sm:p-8 transition-colors">
                <span className="text-primary font-mono font-black text-2xl sm:text-3xl block mb-3 sm:mb-4 transition-colors">{l.num}</span>
                <h4 className="text-foreground font-bold text-base sm:text-lg mb-2 transition-colors">{l.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed transition-colors">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-500 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-7 text-center lg:text-left">
          <div>
            <p className="text-black/50 text-xs uppercase tracking-[0.3em] mb-3">JOIN THEM — FROM ANYWHERE</p>
            <h2 className="display-serif text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight">Start your journey today.</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programs" className="inline-flex items-center justify-center gap-2 bg-foreground hover:bg-foreground/90 text-background font-black uppercase tracking-widest text-sm px-7 py-4 transition-all transition-colors shadow-xl shadow-foreground/10">VIEW PROGRAMS <ArrowRight size={15} /></Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-foreground/30 hover:border-foreground text-foreground font-black uppercase tracking-widest text-sm px-7 py-4 transition-all transition-colors">CONTACT HAJJO</Link>
          </div>

        </div>
      </section>
    </>
  );
}
