import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PhotoSlot from '../../components/PhotoSlot';
import SEO from '../../components/SEO';
import {
  mainPortrait, awardRecognition, speakingEvent,
  trainingSession, communityPhoto, speakingStage,
} from '../../assets/images/index.js';

const accomplishments = [
  '500+ STUDENTS TRAINED WORLDWIDE',
  '10+ CPA NETWORKS COVERED IN CURRICULUM',
  '5 TRAFFIC PLATFORMS MASTERED',
  'BEGINNER-FIRST TEACHING METHODOLOGY',
  'REAL SKILLS. NO HYPE. NO SHORTCUTS.',
  'NIGERIAN-BORN. GLOBALLY FOCUSED.',
];

const values = [
  { num: '01', title: 'Practical First',   desc: 'Every lesson is built for real-world application. Theory without action is useless.' },
  { num: '02', title: 'Honest Education',  desc: 'No fake income screenshots. No hype. Just clear, honest teaching that respects your intelligence.' },
  { num: '03', title: 'Community Support', desc: 'You are never alone. Our learners grow together, share wins, and support each other globally.' },
  { num: '04', title: 'Globally Focused',  desc: 'Content and strategies that work for beginners anywhere in the world — built from Nigerian roots.' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Hajjo — Nigerian Entrepreneur & Global CPA Marketing Educator"
        description="Learn about Hajjo, the Nigerian-born CPA marketing educator who built a global digital learning movement. Discover the mission, vision, and values behind Hajjo Dollars Wealth Solutions."
        path="/about"
      />

      {/* PAGE HERO */}
      <section className="relative bg-background pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none transition-colors duration-500" style={{backgroundImage:'linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ HER STORY</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <h1 className="display-serif text-[clamp(3rem,10vw,7rem)] font-black text-foreground leading-[0.9] tracking-tight transition-colors">
              About<br /><span className="italic text-primary">Hajjo</span>
            </h1>
            <p className="text-foreground/60 text-lg sm:text-xl leading-relaxed transition-colors">
              The CPA marketing educator who started from Nigeria and built a global digital
              learning movement — teaching beginners worldwide how to earn online with real
              skills, not shortcuts.
            </p>
          </div>
        </div>
      </section>

      {/* STORY + PORTRAIT */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="relative">
              <div className="hidden sm:block absolute -top-4 -left-4 w-full h-full border border-primary/15" />
              <PhotoSlot src={mainPortrait} alt="Hajjo — founder of Hajjo Dollars Wealth Solutions" aspectRatio="3/4" className="relative z-10" />
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-right-4 z-20 bg-muted border border-border p-4 sm:p-5 sm:max-w-[220px] transition-colors">
                <p className="text-foreground/80 text-sm italic leading-relaxed transition-colors">"Born in Nigeria. Built for the world."</p>
                <p className="text-primary text-xs uppercase tracking-widest mt-2 font-bold">— Hajjo</p>
              </div>
            </div>

            <div className="pt-0 sm:pt-4 lg:pt-10">
              <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-6 sm:mb-8 transition-colors">
                She Didn't Wait<br />for Opportunity.<br /><span className="italic text-primary">She Built It.</span>
              </h2>
              <div className="accent-line mb-6 sm:mb-8" />
              <div className="flex flex-col gap-5 text-foreground/60 text-base sm:text-lg leading-relaxed transition-colors">
                <p>
                  Growing up in Nigeria with nothing but a smartphone and a hunger to change
                  her story, Hajjo discovered CPA marketing — and everything shifted. No mentor.
                  No capital. Just consistency and the willingness to learn what most people scroll past.
                </p>
                <p>
                  She spent months studying traffic, testing offers, and building systems that worked.
                  When they did, she didn't keep it to herself. She started teaching — first one person,
                  then ten, then hundreds across the globe.
                </p>
                <p>
                  Today, Hajjo Dollars Wealth Solutions is a full digital education platform training
                  beginners worldwide in CPA marketing, traffic generation, and online income systems
                  that actually work — no matter where you are.
                </p>
                <p>
                  Her mission is simple: give every beginner a clear, honest, step-by-step path to
                  earning online — no hype, no shortcuts, just real education that compounds over time.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-5 sm:pl-6 py-2 my-8 sm:my-10">
                <p className="display-serif text-lg sm:text-xl italic text-foreground/85 leading-relaxed transition-colors">
                  "The internet doesn't care where you're from — only what you know.
                  I learned that. Now I teach it to the world."
                </p>
                <p className="text-muted-foreground text-xs uppercase tracking-widest mt-3 transition-colors">
                  — HAJJO · FOUNDER, HAJJO DOLLARS WEALTH SOLUTIONS
                </p>
              </div>
              <Link to="/programs" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-sm px-7 py-4 transition-all hover:shadow-xl hover:shadow-primary/30">
                WORK WITH HAJJO <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ACCOMPLISHMENTS */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-10 sm:mb-14"><span className="section-label text-muted-foreground">⬡ ACCOMPLISHMENTS</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-8 sm:mb-10 transition-colors">
                What Hajjo<br /><span className="italic text-primary">Has Built</span>
              </h2>
              <div className="flex flex-col border border-border">
                {accomplishments.map((a, i) => (
                  <div key={a} className="flex items-center gap-4 px-5 sm:px-7 py-4 sm:py-5 border-b border-border last:border-b-0 hover:bg-muted transition-colors group">
                    <span className="text-primary font-mono font-black text-sm w-6 flex-shrink-0 transition-colors">{String(i+1).padStart(2,'0')}</span>
                    <span className="text-foreground/75 font-semibold text-xs sm:text-sm uppercase tracking-wider leading-snug transition-colors">{a}</span>
                    <ArrowRight size={13} className="ml-auto text-foreground/15 group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border">
              <PhotoSlot src={awardRecognition} alt="Hajjo Dollars award and recognition"         aspectRatio="1/1" />
              <PhotoSlot src={speakingEvent}    alt="Hajjo speaking at a digital marketing event" aspectRatio="1/1" />
              <PhotoSlot src={trainingSession}  alt="Hajjo Dollars training session"              aspectRatio="1/1" />
              <PhotoSlot src={communityPhoto}   alt="Hajjo Dollars global student community"      aspectRatio="1/1" />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-10 sm:mb-14"><span className="section-label text-muted-foreground">⬡ MISSION & VISION</span></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-14 sm:mb-20">
            <div className="bg-card hover:bg-muted p-8 sm:p-12 transition-colors">
              <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 sm:mb-5 block">Our Mission</span>
              <h3 className="display-serif text-2xl sm:text-3xl font-black text-foreground mb-4 sm:mb-5 leading-tight transition-colors">
                Teach the skill.<br />Build the income.
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base transition-colors">
                To give every beginner worldwide a clear, honest, step-by-step path to earning
                online through CPA marketing and digital skills — no hype, no shortcuts, just
                real education that works from anywhere on the planet.
              </p>
            </div>
            <div className="bg-card hover:bg-muted p-8 sm:p-12 transition-colors border-t md:border-t-0 md:border-l border-border">
              <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 sm:mb-5 block transition-colors">Our Vision</span>
              <h3 className="display-serif text-2xl sm:text-3xl font-black text-foreground mb-4 sm:mb-5 leading-tight transition-colors">
                A generation of<br />digitally free people.
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base transition-colors">
                To build financially independent individuals across the world who earn online
                through legitimate digital skills — not luck, not hype, but knowledge that
                compounds and lasts regardless of where you live.
              </p>
            </div>
          </div>

          <div className="mb-10 sm:mb-14"><span className="section-label text-muted-foreground">⬡ OUR VALUES</span></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {values.map(v => (
              <div key={v.num} className="bg-card hover:bg-muted p-7 sm:p-8 transition-colors">
                <span className="text-primary font-mono font-black text-3xl block mb-4 sm:mb-5 transition-colors">{v.num}</span>
                <h4 className="text-foreground font-black text-base sm:text-lg mb-2 sm:mb-3 transition-colors">{v.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed transition-colors">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH PHOTO */}
      <section className="bg-background px-5 sm:px-6 py-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <PhotoSlot src={speakingStage} alt="Hajjo speaking on stage at a major event" aspectRatio="21/9" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="border border-border bg-muted p-8 sm:p-12 lg:p-16 text-center transition-colors">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] mb-5 sm:mb-6 transition-colors">READY TO START?</p>
            <h2 className="display-serif text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 transition-colors">Work With Hajjo</h2>
            <p className="text-muted-foreground mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed text-sm sm:text-base transition-colors">
              Whether you're in Nigeria, the UK, the US, or anywhere in the world —
              she has a program built for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/programs" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-sm px-7 py-4 transition-all hover:shadow-xl hover:shadow-primary/30">
                VIEW PROGRAMS <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary text-foreground font-bold uppercase tracking-widest text-sm px-7 py-4 transition-all">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
