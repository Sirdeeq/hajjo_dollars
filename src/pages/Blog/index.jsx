import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Lock, Eye, Search } from 'lucide-react';
import PhotoSlot from '../../components/PhotoSlot';
import SEO from '../../components/SEO';
import { portrait, U } from '../../assets/images/index.js';

// Robust local fallback articles in case backend is offline
const fallbackArticles = [
  {
    _id: 'featured-default',
    title: "What is CPA Marketing? A Complete Beginner's Guide",
    excerpt: "Hajjo breaks down exactly what CPA marketing is, how it works, and why it is one of the best ways for beginners worldwide to start building real online income from scratch.",
    category: 'CPA BASICS',
    readTime: '5 MIN',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    type: 'free',
    socialLink: 'https://tiktok.com/@hajjodollars'
  },
  {
    _id: 'fallback-2',
    title: 'How Beginners Can Earn Online Legitimately — From Anywhere',
    excerpt: 'Legitimate, skill-based methods that beginners worldwide can start learning today — including CPA marketing and traffic generation.',
    category: 'GETTING STARTED',
    readTime: '6 MIN',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
    type: 'free',
    socialLink: 'https://instagram.com/hajjodollars'
  },
  {
    _id: 'fallback-3',
    title: 'Best Traffic Sources for CPA Marketing',
    excerpt: 'TikTok, Instagram, Facebook, WhatsApp, YouTube — how to use each platform effectively as a complete beginner, no matter where you are.',
    category: 'TRAFFIC',
    readTime: '7 MIN',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80',
    type: 'free',
    socialLink: 'https://youtube.com/@hajjodollars'
  },
  {
    _id: 'fallback-4',
    title: 'Hajjo Dollars Ultimate CPA Blueprint (Paid/Premium Video Guide)',
    excerpt: 'Access the complete high-conversion traffic funnels, private WhatsApp networks secrets, and premium pre-made landing pages templates.',
    category: 'NETWORKS',
    readTime: '15 MIN',
    img: 'https://images.unsplash.com/photo-1553729459-beb747028b42?w=800&auto=format&fit=crop&q=80',
    type: 'paid',
    socialLink: 'https://hajjodollars.com/checkout/vip'
  }
];

const categories = ['ALL', 'CPA BASICS', 'TRAFFIC', 'GETTING STARTED', 'TIKTOK', 'NETWORKS', 'MISTAKES', 'MINDSET'];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // Filter out drafts on the website view
        const publishedOnly = data.filter(b => b.status !== 'Draft');
        setBlogs(publishedOnly);
      } catch (err) {
        console.error('Failed to fetch blogs from API:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Merge loaded blogs and fallback items
  const allArticles = useMemo(() => {
    if (blogs && blogs.length > 0) {
      return blogs;
    }
    return fallbackArticles;
  }, [blogs]);

  // Handle Search + Category filtering
  const searchedArticles = useMemo(() => {
    return allArticles.filter(b => {
      const matchesCategory = activeCategory === 'ALL' || (b.category || '').toUpperCase() === activeCategory.toUpperCase();
      const matchesSearch = (b.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (b.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allArticles, activeCategory, searchTerm]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  // Promote the newest item from SEARCHED set to featured
  const featured = useMemo(() => searchedArticles[0], [searchedArticles]);
  const gridArticles = useMemo(() => searchedArticles.slice(1), [searchedArticles]);

  // Pagination for grid
  const totalPages = Math.ceil(gridArticles.length / itemsPerPage);
  const currentItems = gridArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <SEO
        title="Free CPA Marketing Resources & Articles — Hajjo Dollars"
        description="Free beginner-friendly articles on CPA marketing by Hajjo. Learn about traffic sources, CPA networks, common mistakes, TikTok marketing, and how to start earning online from anywhere in the world."
        path="/blog"
      />

      {/* PAGE HERO */}
      <section className="relative bg-background pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none transition-colors duration-500" style={{backgroundImage:'linear-gradient(var(--grid-color) 1px,transparent 1px),linear-gradient(90deg,var(--grid-color) 1px,transparent 1px)',backgroundSize:'80px 80px'}} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ LEARNING HUB</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <h1 className="display-serif text-[clamp(3rem,10vw,7rem)] font-black text-foreground leading-[0.9] transition-colors">
              CPA<br /><span className="italic text-primary">Resources</span>
            </h1>
            <p className="text-foreground/55 text-lg sm:text-xl leading-relaxed transition-colors">
              Practical, beginner-friendly articles by Hajjo to help you understand CPA
              marketing, build traffic skills, and discover free and premium resource assets —
              accessible anywhere globally.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featured && (
        <section className="bg-card py-16 sm:py-24 lg:py-28 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="mb-8 sm:mb-14"><span className="section-label text-muted-foreground">⬡ FEATURED ARTICLE</span></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border transition-colors">
              <PhotoSlot src={featured.img} alt={featured.title} aspectRatio="4/3" />
              <div className="bg-card p-7 sm:p-12 flex flex-col justify-between gap-6 transition-colors">
                <div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6 transition-colors">
                    <span className="text-primary font-mono font-black text-xs">01</span>
                    <span className="text-muted-foreground text-[10px] uppercase tracking-widest">{featured.category || 'FEATURED'}</span>
                    <span className="text-muted-foreground text-[10px]">·</span>
                    <span className="text-muted-foreground text-[10px] uppercase tracking-widest">{featured.readTime || '5 MIN READ'}</span>
                    <span className="text-muted-foreground text-[10px]">·</span>
                    <span className="text-muted-foreground text-[10px] uppercase tracking-widest flex items-center gap-1"><Eye size={10} /> {featured.views || 0}</span>
                    <span className="text-muted-foreground text-[10px]">·</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${
                      featured.type === 'paid' 
                        ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20' 
                        : 'bg-primary/10 text-primary border border-primary/20'
                    }`}>
                      {featured.type === 'paid' ? 'Premium Resource' : 'Free Resource'}
                    </span>
                  </div>
                  <Link to={`/blog/${featured._id || featured.id}`} className="hover:text-primary transition-colors">
                    <h2 className="display-serif text-2xl sm:text-3xl lg:text-4xl font-black text-foreground leading-tight mb-5 sm:mb-6 transition-colors">{featured.title}</h2>
                  </Link>
                  <p className="text-foreground/50 leading-relaxed text-sm sm:text-base mb-6 transition-colors">{featured.excerpt}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/blog/${featured._id || featured.id}`} className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs px-6 py-3.5 transition-all hover:shadow-xl hover:shadow-primary/30">
                    READ ARTICLE <ArrowRight size={14} />
                  </Link>
                  {featured.socialLink && (
                    <a href={featured.socialLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-border hover:border-foreground/50 text-foreground font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-all">
                      LEARN MORE ON SOCIALS <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY FILTER & SEARCH */}
      <div className="bg-background py-4 sm:py-6 border-y border-border sticky top-[70px] z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5 md:flex-1">
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)}
                  className={`flex-shrink-0 text-[10px] font-black uppercase tracking-widest px-3 sm:px-4 py-2 border transition-all ${activeCategory === c ? 'bg-primary border-primary text-black font-extrabold' : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground'}`}>
                  {c}
                </button>
              ))}
            </div>

            <div className="relative max-w-sm w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                <Search size={14} />
              </div>
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full bg-card border border-border rounded-lg py-2 pl-9 pr-4 text-foreground text-[11px] focus:outline-none focus:border-primary/50 transition-all uppercase tracking-widest font-mono"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLES GRID */}
      <section className="bg-background py-16 sm:py-24 lg:py-28 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="mb-8 sm:mb-14 flex items-center justify-between transition-colors">
            <span className="section-label text-muted-foreground">⬡ ALL ARTICLES</span>
            {searchTerm && <span className="text-[10px] text-primary/60 font-mono transition-colors">RESULTS FOR: "{searchTerm}"</span>}
          </div>
          
          {currentItems.length === 0 ? (
            <p className="text-muted-foreground text-center py-20 text-sm uppercase tracking-widest transition-colors">No articles found matching your criteria.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border mb-10 sm:mb-16 transition-colors">
                {currentItems.map((a, index) => (
                  <Link to={`/blog/${a._id || a.id}`} key={a._id || a.id} className="bg-background hover:bg-card flex flex-col transition-colors group cursor-pointer border border-transparent hover:border-primary/10">
                    <PhotoSlot src={a.img} alt={a.title} aspectRatio="16/9" />
                    <div className="p-6 sm:p-8 flex flex-col gap-3 sm:gap-4 flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 transition-colors">
                        <span className="text-primary font-mono font-black text-xs">0{(currentPage-1)*itemsPerPage + index + 2}</span>
                        <span className="text-muted-foreground text-[10px] uppercase tracking-widest">{a.category || a.tag}</span>
                        <span className="text-muted-foreground text-[10px]">·</span>
                        <span className="text-muted-foreground text-[10px] uppercase tracking-widest">{a.readTime || '5 MIN'}</span>
                        <span className="text-muted-foreground text-[10px]">·</span>
                        <span className="text-muted-foreground text-[10px] uppercase tracking-widest flex items-center gap-1"><Eye size={10} /> {a.views || 0}</span>
                      </div>
                      
                      {/* Free vs Paid badge */}
                      <div className="flex items-center gap-1.5 transition-colors">
                        {a.type === 'paid' ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-yellow-600 dark:text-yellow-400 uppercase bg-yellow-500/5 px-2 py-0.5 rounded border border-yellow-500/10">
                            <Lock size={10} /> Paid Resource
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary uppercase bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                            <BookOpen size={10} /> Free Guide
                          </span>
                        )}
                      </div>

                      <h3 className="text-foreground font-bold leading-snug group-hover:text-primary transition-colors flex-1 text-sm sm:text-base">{a.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed truncate-2-lines transition-colors">{a.excerpt}</p>
                      <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest pt-3 sm:pt-4 border-t border-border mt-auto">
                        READ MORE <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 mb-20 transition-colors">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    PREVIOUS
                  </button>
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold border transition-all ${currentPage === i + 1 ? 'bg-primary border-primary text-black' : 'border-border text-muted-foreground hover:border-muted-foreground/30'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    NEXT
                  </button>
                </div>
              )}
            </>
          )}

          {/* Hajjo photo + social CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border transition-colors">
            <PhotoSlot src={portrait} alt="Hajjo — CPA marketing educator and content creator" aspectRatio="16/9" />
            <div className="bg-muted p-7 sm:p-12 flex flex-col justify-center gap-5 sm:gap-6 transition-colors">
              <span className="section-label text-muted-foreground">⬡ WANT MORE?</span>
              <h3 className="display-serif text-2xl sm:text-3xl font-black text-foreground leading-tight transition-colors">
                Follow Hajjo for daily<br /><span className="italic text-primary">free content</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base transition-colors">
                She posts daily CPA marketing tips, tutorials, and insights across social media.
                TikTok, Instagram, YouTube — follow her journey from anywhere in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://tiktok.com/@hajjodollars" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-black text-xs uppercase tracking-widest px-5 py-3 transition-all shadow-lg shadow-primary/10">
                  📲 FOLLOW ON TIKTOK
                </a>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 border border-border hover:border-foreground/50 text-foreground font-bold text-xs uppercase tracking-widest px-5 py-3 transition-all shadow-sm">
                  💬 JOIN WHATSAPP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="bg-card py-16 sm:py-24 lg:py-28 border-t border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="section-label mb-6 sm:mb-8 block text-muted-foreground">⬡ FREE ACCESS</span>
              <h2 className="display-serif text-[clamp(1.8rem,5vw,3.5rem)] font-black text-foreground leading-[1.05] mb-5 sm:mb-6 transition-colors">
                Get Hajjo's free<br /><span className="italic text-primary">starter guide</span>
              </h2>
              <div className="accent-line mb-6 sm:mb-8" />
              <p className="text-foreground/55 text-base sm:text-lg leading-relaxed transition-colors">
                Enter your details and she'll send you a free CPA marketing starter guide —
                covering the basics, the best networks for international publishers, and
                your first steps to getting started from anywhere in the world.
              </p>
            </div>
            <div className="border border-border bg-muted p-7 sm:p-10 transition-colors">
              <form className="flex flex-col gap-4 sm:gap-5" onSubmit={e => e.preventDefault()}>
                {[
                  { id:'b-name',     name:'name',     type:'text',  label:'Full Name',      placeholder:'Your full name',    required:true },
                  { id:'b-email',    name:'email',    type:'email', label:'Email Address',   placeholder:'you@example.com',   required:true },
                  { id:'b-whatsapp', name:'whatsapp', type:'tel',   label:'WhatsApp Number', placeholder:'+1 234 567 8900',   required:false },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-muted-foreground text-[10px] uppercase tracking-widest mb-2 transition-colors">
                       {f.label} {f.required && <span className="text-primary">*</span>}
                    </label>
                    <input id={f.id} name={f.name} type={f.type} required={f.required} placeholder={f.placeholder}
                      className="w-full bg-background border border-border text-foreground placeholder-muted-foreground/30 px-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                ))}
                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-sm py-4 flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-primary/30 mt-1">
                  GET FREE GUIDE <ArrowRight size={15} />
                </button>
                <p className="text-center text-muted-foreground text-xs transition-colors">No spam. Unsubscribe anytime.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
