import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Lock, ShieldCheck, HelpCircle, Eye, Landmark, MessageCircle, AlertTriangle } from 'lucide-react';
import PhotoSlot from '../../components/PhotoSlot';
import SEO from '../../components/SEO';

// Fallback detail articles for local presentation if backend is down
const fallbackDetails = {
  'featured-default': {
    title: "What is CPA Marketing? A Complete Beginner's Guide",
    excerpt: "Hajjo breaks down exactly what CPA marketing is, how it works, and why it is one of the best ways for beginners worldwide to start building real online income from scratch.",
    content: `
      <p class="mb-4">CPA stands for <strong>Cost Per Action</strong>. Unlike traditional affiliate marketing where you only earn when someone buys a product, CPA marketing allows you to earn commissions when someone performs a specific, simple action.</p>
      <p class="mb-4">These actions can include:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Submitting an email address</li>
        <li>Entering a zip code</li>
        <li>Downloading a free mobile application</li>
        <li>Signing up for a free trial</li>
      </ul>
      <h3 class="text-xl font-bold text-foreground mb-4">Why CPA is Perfect for Beginners</h3>
      <p class="mb-4">Because there is no "credit card required" for most actions, the barrier to conversion is extremely low. You don't need sales experience. You only need to learn how to drive targeted eyeballs (traffic) to these free offers!</p>
      <h3 class="text-xl font-bold text-foreground mb-4">Key Steps to Get Started</h3>
      <p class="mb-4">1. Join a beginner-friendly CPA network like CPAgrip or AdWorkMedia.<br/>2. Browse high-converting offers matching your traffic type.<br/>3. Generate your unique affiliate tracking link.<br/>4. Build campaigns to promote the link (using social media organic traffic).</p>
    `,
    category: 'CPA BASICS',
    readTime: '5 MIN',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    type: 'free',
    socialLink: 'https://tiktok.com/@hajjodollars'
  }
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog details from API:', err);
        // Load fallback if present
        if (fallbackDetails[id]) {
          setBlog(fallbackDetails[id]);
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchPaymentInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/settings/payment_info`);
        if (response.ok) {
          const data = await response.json();
          setPaymentInfo(data.value);
        }
      } catch (err) {
        console.error('Error fetching payment info:', err);
      }
    };

    fetchBlogDetails();
    fetchPaymentInfo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center transition-colors duration-300">
        <AlertTriangle size={48} className="text-red-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-foreground mb-2 transition-colors">Article Not Found</h2>
        <p className="text-muted-foreground text-sm mb-6 transition-colors">The requested learning resource does not exist or has been removed.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 border border-border hover:border-primary text-foreground hover:text-primary font-bold text-xs uppercase tracking-widest px-5 py-3 transition-colors">
          <ArrowLeft size={14} /> Back to Learning Hub
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${blog.title} — Hajjo Dollars Learning Hub`}
        description={blog.excerpt}
        path={`/blog/${id}`}
      />

      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-x-hidden pt-[80px] transition-colors duration-300">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-[450px] h-[450px] bg-green-900/5 rounded-full blur-[140px] pointer-events-none" />

        {/* HERO TITLE SECTION */}
        <section className="relative bg-background py-14 sm:py-20 border-b border-border overflow-hidden transition-colors duration-300">
          <div 
            className="absolute inset-0 pointer-events-none transition-colors duration-500" 
            style={{
              backgroundImage: 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }} 
          />
          <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10 space-y-4">
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors mb-4">
              <ArrowLeft size={13} /> Back to Learning Hub
            </Link>

            <div className="flex flex-wrap items-center gap-3 transition-colors">
              <span className="text-[10px] uppercase tracking-widest text-primary font-mono font-semibold">
                ⬡ {blog.category || 'CPA BASICS'}
              </span>
              <span className="text-muted-foreground/20 text-xs transition-colors">·</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono flex items-center gap-1 transition-colors">
                <Eye size={10} /> {blog.views || 0} VIEWS
              </span>
              <span className="text-muted-foreground/20 text-xs transition-colors">·</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono transition-colors">
                {blog.readTime || '5 MIN'} READ
              </span>
              <span className="text-muted-foreground/20 text-xs transition-colors">·</span>
              {blog.type === 'paid' ? (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-yellow-600 dark:text-yellow-400 uppercase bg-yellow-500/5 px-2 py-0.5 rounded border border-yellow-500/10 transition-colors">
                  <Lock size={9} /> Premium Resource
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary uppercase bg-primary/5 px-2 py-0.5 rounded border border-primary/10 transition-colors">
                  <BookOpen size={9} /> Free Guide
                </span>
              )}
            </div>

            <h1 className="display-serif text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight mt-2 transition-colors">
              {blog.title}
            </h1>
            <p className="text-foreground/50 text-sm sm:text-base leading-relaxed max-w-2xl font-light transition-colors">
              {blog.excerpt}
            </p>
          </div>
        </section>

        {/* CONTENT & SIDEBAR */}
        <section className="py-12 sm:py-20 flex-1 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 space-y-10">
            
            {/* Cover image slot */}
            <div className="space-y-4">
              <div className="border border-border rounded-lg overflow-hidden relative group transition-colors">
                <PhotoSlot src={blog.img} alt={blog.title} aspectRatio="16/9" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Additional Images Grid */}
              {blog.images && blog.images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {blog.images.slice(1).map((imgUrl, idx) => (
                    <div key={idx} className="border border-border rounded-lg overflow-hidden transition-colors">
                      <PhotoSlot src={imgUrl} alt={`${blog.title} - ${idx + 1}`} aspectRatio="1/1" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rich content body */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              
              {/* Main Content (HTML) */}
              <div className="lg:col-span-2 space-y-6">
                <article 
                  className="prose dark:prose-invert max-w-none text-foreground/70 text-sm sm:text-base leading-relaxed font-light transition-colors"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* Sidebar Actions Gate */}
              <div className="space-y-6 lg:sticky lg:top-[90px]">
                
                {/* Resource Gate Container */}
                <div className="bg-card border border-border rounded-xl p-5 relative overflow-hidden space-y-4 transition-colors">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-primary" size={16} />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground transition-colors">Resource Gating</h4>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed font-light transition-colors">
                    {blog.type === 'paid' 
                      ? 'This premium guide contains secure checkout materials and high-ticket resources.' 
                      : 'This learning resource is fully open and 100% free, courtesy of Hajjo Dollars Wealth Solutions.'}
                  </p>

                  <div className="h-[1px] bg-border transition-colors" />

                  {/* Dynamic CTA button */}
                  {blog.type === 'paid' ? (
                    <Link 
                      to={`/checkout?item=${encodeURIComponent(blog.title)}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-emerald-700 hover:from-primary/90 hover:to-emerald-600 text-black font-extrabold uppercase tracking-wider text-[11px] rounded-lg shadow-lg shadow-primary/10 transition-all active:scale-[0.98] text-center"
                    >
                      Get Premium Access <ArrowRight size={13} />
                    </Link>
                  ) : blog.socialLink ? (
                    <a 
                      href={blog.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-emerald-700 hover:from-primary/90 hover:to-emerald-600 text-black font-extrabold uppercase tracking-wider text-[11px] rounded-lg shadow-lg shadow-primary/10 transition-all active:scale-[0.98] text-center"
                    >
                      Learn More on Socials <ArrowRight size={13} />
                    </a>
                  ) : (
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-emerald-700 hover:from-primary/90 hover:to-emerald-600 text-black font-extrabold uppercase tracking-wider text-[11px] rounded-lg shadow-lg shadow-primary/10 transition-all active:scale-[0.98] text-center"
                    >
                      Apply for Mentorship <ArrowRight size={13} />
                    </Link>
                  )}
                </div>

                {/* FAQ Help block */}
                <div className="bg-muted/40 border border-border rounded-xl p-5 space-y-3.5 transition-colors">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5 transition-colors">
                    <HelpCircle size={14} className="text-primary/60" /> Need Assistance?
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed transition-colors">
                    Have questions about campaign setups, affiliate clicks, or direct mentorship programs? Drop us a prompt.
                  </p>
                  <Link to="/contact" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-wider transition-colors">
                    Contact Hajjo
                  </Link>
                </div>

              </div>

            </div>

            {/* PAYMENT INFORMATION SECTION (For Paid Articles) */}
            {blog.type === 'paid' && paymentInfo && (
              <div className="mt-16 border border-border bg-card rounded-2xl p-6 sm:p-10 space-y-8 animate-fadeIn transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 transition-colors">
                  <div>
                    <h3 className="display-serif text-xl sm:text-2xl font-black text-foreground transition-colors">Checkout Information</h3>
                    <p className="text-muted-foreground text-xs mt-1 uppercase tracking-widest transition-colors">Complete payment to any account below to gain access.</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full transition-colors">
                    <Lock size={12} className="text-yellow-600 dark:text-yellow-400" />
                    <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">Premium Access Gate</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paymentInfo.bankAccounts && paymentInfo.bankAccounts.map((account, index) => (
                    account.bankName && (
                      <div key={index} className="bg-background border border-border p-5 rounded-xl space-y-4 hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3 transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-colors">
                            <Landmark size={16} />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest transition-colors">Account {index + 1}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase font-semibold transition-colors">Bank Name</p>
                          <p className="text-sm font-bold text-foreground transition-colors">{account.bankName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase font-semibold transition-colors">Account Name</p>
                          <p className="text-sm font-bold text-foreground transition-colors">{account.accountName}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase font-semibold transition-colors">Account Number</p>
                          <p className="text-base font-mono font-black text-primary tracking-wider transition-colors">{account.accountNumber}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>

                {paymentInfo.whatsappNumber && (
                  <div className="pt-6 border-t border-border flex flex-col items-center text-center space-y-4 transition-colors">
                    <p className="text-xs text-muted-foreground max-w-md leading-relaxed transition-colors">
                      After making the transfer, please click the button below to send your payment receipt to our verification team on WhatsApp.
                    </p>
                    <a 
                      href={`https://wa.me/${paymentInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Hajjo Dollars, I have just made a payment for the premium article: "${blog.title}". Here is my receipt.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-[#25D366]/20"
                    >
                      <MessageCircle size={18} /> SEND RECEIPT TO WHATSAPP
                    </a>
                  </div>
                )}
              </div>
            )}

          </div>
        </section>
      </div>
    </>
  );
}
