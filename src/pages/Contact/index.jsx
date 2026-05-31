import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import PhotoSlot from '../../components/PhotoSlot';
import SEO from '../../components/SEO';
import { mainPortrait } from '../../assets/images/index.js';

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

const fields = [
  { id:'c-name',     name:'name',     type:'text',  label:'Full Name',      placeholder:'Your full name',    required:true },
  { id:'c-email',    name:'email',    type:'email', label:'Email Address',   placeholder:'you@example.com',   required:true },
  { id:'c-whatsapp', name:'whatsapp', type:'tel',   label:'WhatsApp Number', placeholder:'+1 234 567 8900',   required:false },
];

const faqs = [
  { q:"Do I need experience to join Hajjo's programs?",
    a:"No. All of Hajjo's programs are built for complete beginners worldwide. You only need a smartphone and the willingness to learn." },
  { q:'Can I join from outside Nigeria?',
    a:"Absolutely. Hajjo's programs are open to beginners everywhere in the world. CPA marketing works globally and so does her training." },
  { q:'How do I pay for a program?',
    a:"Payment details are shared after you reach out via WhatsApp or email. Hajjo's team will guide you through the process." },
  { q:'How long does it take to complete a course?',
    a:'The CPA Beginner Course can be completed in 2–4 weeks at your own pace. Traffic Mastery takes 3–5 weeks. Mentorship is ongoing.' },
  { q:'Is CPA marketing legal worldwide?',
    a:"Yes. CPA marketing is a legitimate online income model used globally. Hajjo teaches only legal, ethical methods that work anywhere." },
  { q:'What if I get stuck during the training?',
    a:"Every program includes WhatsApp support. You can ask questions and get answers directly from Hajjo's team — no matter your timezone." },
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', whatsapp:'', message:'' });
  const [sent, setSent] = useState(false);
  const [biodata, setBiodata] = useState({
    name: 'Super Admin',
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
        console.error('Error fetching contact biodata:', err);
      }
    };
    fetchBiodata();
  }, []);

  const formattedSocials = [
    { icon:'🎵', name:'TikTok',    handle: biodata.tiktok || '@hajjodollars', url: formatSocialUrl('tiktok', biodata.tiktok || '@hajjodollars'), border:'hover:border-white/40' },
    { icon:'📸', name:'Instagram', handle: biodata.instagram || '@hajjodollars', url: formatSocialUrl('instagram', biodata.instagram || '@hajjodollars'), border:'hover:border-pink-500/60' },
    { icon:'👥', name:'Facebook',  handle: biodata.facebook || 'Hajjo Dollars', url: formatSocialUrl('facebook', biodata.facebook || 'Hajjo Dollars'), border:'hover:border-blue-500/60' },
    { icon:'▶️',  name:'YouTube',  handle: biodata.youtube || 'Hajjo Dollars', url: formatSocialUrl('youtube', biodata.youtube || 'Hajjo Dollars'), border:'hover:border-red-500/60' },
  ];

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  const cleanWhatsappNumber = (num) => {
    if (!num) return '2348000000000';
    return num.replace(/[^0-9]/g, '');
  };

  return (
    <>
      <SEO
        title="Contact Us — Hajjo Dollars Wealth Solutions"
        description="Get in touch with Hajjo Dollars Wealth Solutions. Ask about her CPA marketing programs, mentorship, or training. She responds within 24–48 hours via WhatsApp or email — worldwide."
        path="/contact"
      />

      {/* PAGE HERO */}
      <section className="relative bg-background pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none transition-colors duration-500" style={{backgroundImage:'linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ GET IN TOUCH</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <h1 className="display-serif text-[clamp(3rem,10vw,7rem)] font-black text-foreground leading-[0.9] transition-colors">
              Contact<br /><span className="italic text-primary">Hajjo</span>
            </h1>
            <p className="text-foreground/55 text-lg sm:text-xl leading-relaxed transition-colors">
              Have a question about her programs? Ready to start your CPA marketing journey?
              She responds to all inquiries within 24–48 hours — no matter where you are in the world.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border transition-colors">

            {/* Left */}
            <div className="bg-card p-7 sm:p-10 lg:p-12 flex flex-col gap-5 sm:gap-6 transition-colors">
              <a href={`https://wa.me/${cleanWhatsappNumber(biodata.whatsapp)}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 sm:gap-5 bg-primary hover:bg-primary/90 p-5 sm:p-7 transition-all group shadow-lg shadow-primary/10">
                <span className="text-3xl sm:text-4xl flex-shrink-0">💬</span>
                <div className="flex-1 min-w-0">
                  <p className="text-black font-black text-base sm:text-xl">Chat on WhatsApp</p>
                  <p className="text-black/55 text-xs sm:text-sm mt-0.5 font-bold">Fastest way to reach Hajjo — worldwide</p>
                </div>
                <ArrowRight size={18} className="text-black/40 group-hover:text-black transition-colors flex-shrink-0" />
              </a>

              <a href={`mailto:${biodata.email || 'hello@hajjodollars.com'}`}
                className="flex items-center gap-4 sm:gap-5 border border-border bg-background/50 hover:border-primary/40 p-5 sm:p-7 transition-all group">
                <span className="text-3xl sm:text-4xl flex-shrink-0">✉️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-bold text-base sm:text-lg transition-colors">Email Hajjo</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 break-all transition-colors">{biodata.email || 'hello@hajjodollars.com'}</p>
                </div>
                <ArrowRight size={15} className="text-muted-foreground/15 group-hover:text-primary transition-colors flex-shrink-0" />
              </a>

              <div className="flex items-center gap-3 border border-border bg-muted/30 px-5 py-4 text-muted-foreground text-sm transition-colors">
                <span className="text-lg flex-shrink-0">⏱</span>
                <span>She responds within <strong className="text-foreground/65 transition-colors">24–48 hours</strong> — any timezone.</span>
              </div>

              <div>
                <p className="text-muted-foreground/40 text-[10px] uppercase tracking-[0.3em] mb-4 transition-colors">FOLLOW HAJJO</p>
                <div className="grid grid-cols-2 gap-px bg-border transition-colors">
                  {formattedSocials.map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className={`bg-card hover:bg-muted flex items-center gap-3 p-4 sm:p-5 border border-transparent ${s.border} transition-all`}>
                      <span className="text-xl sm:text-2xl flex-shrink-0">{s.icon}</span>
                      <div className="min-w-0">
                        <p className="text-foreground font-bold text-sm transition-colors">{s.name}</p>
                        <p className="text-muted-foreground text-xs truncate transition-colors">{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-muted p-7 sm:p-10 lg:p-12 transition-colors">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-12 sm:py-16">
                  <span className="text-6xl sm:text-7xl">✅</span>
                  <h3 className="display-serif text-3xl sm:text-4xl font-black text-foreground transition-colors">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-xs leading-relaxed text-sm sm:text-base transition-colors">
                    Thanks for reaching out. Hajjo will get back to you within 24–48 hours.
                  </p>
                  <button onClick={() => setSent(false)}
                    className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors mt-2 uppercase tracking-widest">
                    ← Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-foreground font-black text-xl sm:text-2xl mb-2 transition-colors">Send Hajjo a Message</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-7 sm:mb-10 uppercase tracking-widest transition-colors">
                    Ask about her programs, mentorship, or anything CPA marketing.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>
                    {fields.map(f => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block text-muted-foreground text-[10px] uppercase tracking-widest mb-2 transition-colors">
                          {f.label} {f.required && <span className="text-primary">*</span>}
                        </label>
                        <input id={f.id} name={f.name} type={f.type} required={f.required}
                          value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
                          className="w-full bg-background border border-border text-foreground placeholder-muted-foreground/30 px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="c-message" className="block text-muted-foreground text-[10px] uppercase tracking-widest mb-2 transition-colors">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea id="c-message" name="message" required rows={4}
                        value={form.message} onChange={handleChange}
                        placeholder="What would you like to learn or ask Hajjo about?"
                        className="w-full bg-background border border-border text-foreground placeholder-muted-foreground/30 px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                    </div>
                    <button type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-sm py-4 sm:py-5 flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-primary/30">
                      SEND MESSAGE <ArrowRight size={15} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO + QUOTE */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border transition-colors">
            <PhotoSlot src={mainPortrait} alt="Hajjo — approachable and welcoming" aspectRatio="4/3" objectPosition="top" />
            <div className="bg-background p-8 sm:p-12 lg:p-14 flex flex-col justify-center gap-6 sm:gap-8 transition-colors">
              <span className="section-label text-muted-foreground">⬡ A NOTE FROM HAJJO</span>
              <p className="display-serif text-xl sm:text-2xl lg:text-3xl italic text-foreground/85 leading-relaxed transition-colors">
                "Every question you have, someone else has too. Don't be afraid to ask.
                That's exactly what I'm here for — wherever you are."
              </p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest transition-colors">
                — HAJJO · FOUNDER, HAJJO DOLLARS WEALTH SOLUTIONS
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <a href={`https://wa.me/${cleanWhatsappNumber(biodata.whatsapp)}`} target="_blank" rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-black text-xs uppercase tracking-widest px-6 py-3 transition-all shadow-lg shadow-primary/10">
                  💬 WHATSAPP HAJJO NOW
                </a>
                <a href={`mailto:${biodata.email || 'hello@hajjodollars.com'}`}
                  className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary text-foreground hover:text-primary font-bold text-xs uppercase tracking-widest px-6 py-3 transition-all">
                  ✉️ SEND AN EMAIL
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 border-t border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between mb-10 sm:mb-14">
            <span className="section-label text-muted-foreground">⬡ QUICK ANSWERS</span>
          </div>
          <h2 className="display-serif text-[clamp(1.8rem,5vw,3rem)] font-black text-foreground leading-[1.05] mb-10 sm:mb-14 transition-colors">
            Common Questions
          </h2>
          <div className="flex flex-col gap-px bg-border transition-colors">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-card hover:bg-muted p-6 sm:p-8 transition-colors">
                <p className="text-foreground font-bold text-sm sm:text-base mb-2 transition-colors">{q}</p>
                <p className="text-muted-foreground text-sm leading-relaxed transition-colors">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
