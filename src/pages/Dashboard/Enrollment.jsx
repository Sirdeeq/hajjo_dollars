import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Landmark, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  MessageCircle,
  CreditCard,
  Share2
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/SEO';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Enrollment() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [program, setProgram] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, setRes, enrRes] = await Promise.all([
          axios.get(`${API_URL}/programs`),
          axios.get(`${API_URL}/settings/payment_info`),
          axios.get(`${API_URL}/enrollments/my`, { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
          })
        ]);
        setProgram(progRes.data.find(p => p._id === programId));
        setPaymentInfo(setRes.data.value);
        setEnrollment(enrRes.data.find(e => e.program._id === programId));
      } catch (err) {
        console.error('Error fetching enrollment data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [programId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a payment receipt');
    
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('images', file);
      const uploadRes = await axios.post(`${API_URL}/upload`, formData);
      const receiptUrl = uploadRes.data.urls[0];

      const enrollRes = await axios.post(`${API_URL}/enrollments/enroll/${programId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const enrollmentId = enrollRes.data._id;

      await axios.put(`${API_URL}/enrollments/receipt/${enrollmentId}`, { receiptUrl }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      // Refresh enrollment data
      const updatedEnrRes = await axios.get(`${API_URL}/enrollments/my`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
      });
      setEnrollment(updatedEnrRes.data.find(e => e.program._id === programId));
      
      setSuccess(true);
    } catch (err) {
      console.error('Enrollment error:', err);
      alert(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsShared = async () => {
    if (!enrollment) return;
    setSharing(true);
    try {
      await axios.put(`${API_URL}/enrollments/share-whatsapp/${enrollment._id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Refresh enrollment data
      const updatedEnrRes = await axios.get(`${API_URL}/enrollments/my`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
      });
      setEnrollment(updatedEnrRes.data.find(e => e.program._id === programId));
      alert('Receipt marked as shared!');
    } catch (err) {
      console.error('Error marking as shared:', err);
      alert('Failed to mark as shared');
    } finally {
      setSharing(false);
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center font-sans"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  if (success || enrollment) {
    const statusText = enrollment?.paymentStatus === 'Paid' ? 'Enrollment Approved' : 
                        enrollment?.paymentStatus === 'Under Review' ? 'Receipt Under Review' :
                        enrollment?.paymentStatus === 'Rejected' ? 'Payment Rejected' :
                        enrollment?.paymentStatus === 'Unresolved' ? 'Payment Unresolved' : 'Receipt Submitted';
    
    return (
      <div className="min-h-full flex items-center justify-center px-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full py-12 text-center space-y-8 bg-card border border-border rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-2xl overflow-hidden relative"
        >
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto ${
            enrollment?.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-500' :
            enrollment?.paymentStatus === 'Rejected' ? 'bg-red-500/10 text-red-500' :
            enrollment?.paymentStatus === 'Unresolved' ? 'bg-purple-500/10 text-purple-500' :
            'bg-primary/10 text-primary'
          }`}>
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-4">
             <h2 className="display-serif text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">{statusText}</h2>
             <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-medium">
               Your payment for <span className="text-foreground font-bold">{program?.title}</span> is now {
                 enrollment?.paymentStatus === 'Paid' ? 'confirmed! You can now access your program.' :
                 enrollment?.paymentStatus === 'Rejected' ? 'rejected. Please contact support for more info.' :
                 'under technical review. You will receive an access protocol via email once verified.'
               }
             </p>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
             {enrollment?.paymentStatus === 'Paid' ? (
               <Link to={`/dashboard/programs/${programId}`} className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-all">Start Learning</Link>
             ) : (
               <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-all">Dashboard</Link>
             )}
             {paymentInfo?.whatsappNumber && enrollment?.paymentStatus !== 'Paid' && (
               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                 <a 
                  href={`https://wa.me/${paymentInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello, I just uploaded my receipt for ${program?.title}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 sm:flex-none px-8 py-4 bg-[#25D366] text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2"
                 >
                   <MessageCircle size={16} /> Send on WhatsApp
                 </a>
                 {!enrollment?.sharedOnWhatsapp && (
                   <button 
                     onClick={handleMarkAsShared}
                     disabled={sharing}
                     className="flex-1 sm:flex-none px-8 py-4 border border-border text-foreground font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-muted transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                   >
                     <Share2 size={16} /> {sharing ? 'MARKING...' : 'Mark as Shared'}
                   </button>
                 )}
                 {enrollment?.sharedOnWhatsapp && (
                   <div className="flex-1 sm:flex-none px-8 py-4 border border-green-500/30 bg-green-500/5 text-green-500 font-black uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-2">
                     <CheckCircle2 size={16} /> Already Shared
                   </div>
                 )}
               </div>
             )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 lg:space-y-10 pb-20 font-sans">
      <SEO title={`Enroll in ${program?.title} — Hajjo Dollars`} />

      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-card border border-transparent hover:border-border rounded-xl transition-all text-muted-foreground hover:text-foreground shrink-0">
          <ArrowLeft size={20} />
        </button>
        <div className="overflow-hidden">
          <h1 className="text-xl lg:text-2xl font-black text-foreground uppercase tracking-tight truncate">Secure <span className="text-primary italic">Enrollment</span></h1>
          <p className="text-[9px] lg:text-[10px] font-black text-muted-foreground uppercase tracking-widest truncate">Protocol: Premium Acquisition</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="space-y-6 lg:space-y-8">
           <div className="bg-card border border-border rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl overflow-hidden border border-border shrink-0">
                    <img src={program?.img} alt={program?.title} className="w-full h-full object-cover" />
                 </div>
                 <div className="overflow-hidden">
                    <h3 className="text-base lg:text-lg font-black text-foreground uppercase tracking-tight leading-tight truncate">{program?.title}</h3>
                    <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-1">{program?.level} Node Access</p>
                 </div>
              </div>
              <div className="flex items-center justify-between py-4 border-y border-border">
                 <span className="text-[9px] lg:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Entry Fee</span>
                 <span className="text-lg lg:text-xl font-black text-foreground font-mono">{program?.price}</span>
              </div>
              <div className="space-y-3">
                 <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest italic">Included Node Assets:</p>
                 <ul className="space-y-2.5">
                    {['Curriculum Access', 'Digital Resources', 'Community Node', 'Mentorship Logic'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[9px] lg:text-[10px] font-bold text-foreground uppercase tracking-tight">
                        <CheckCircle2 size={14} className="text-primary shrink-0" /> <span className="truncate">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="bg-primary/5 border border-primary/20 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 space-y-6">
              <div className="flex items-center gap-3">
                 <Landmark size={20} className="text-primary shrink-0" />
                 <h3 className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-[0.3em]">Banking Protocols</h3>
              </div>
              <div className="space-y-4">
                 {paymentInfo?.bankAccounts?.map((acc, i) => (
                   acc.bankName && (
                    <div key={i} className="bg-background/50 border border-border p-4 lg:p-5 rounded-xl lg:rounded-2xl space-y-2 relative group overflow-hidden transition-colors">
                       <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
                       <p className="text-[8px] lg:text-[9px] font-black text-primary uppercase tracking-widest truncate">{acc.bankName}</p>
                       <p className="text-base lg:text-lg font-black font-mono tracking-wider text-foreground truncate">{acc.accountNumber}</p>
                       <p className="text-[8px] lg:text-[9px] font-bold text-muted-foreground uppercase truncate">{acc.accountName}</p>
                    </div>
                   )
                 ))}
              </div>
           </div>
        </div>

        <div className="bg-card border border-border rounded-[2.5rem] lg:rounded-[3rem] p-6 lg:p-10 space-y-8 lg:space-y-10 relative overflow-hidden shadow-sm">
           <div className="absolute top-0 right-0 p-8 text-primary/5 hidden lg:block">
              <CreditCard size={120} />
           </div>
           
           <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-primary text-black flex items-center justify-center font-black text-xs lg:text-sm shrink-0">02</div>
                 <h3 className="text-base lg:text-lg font-black text-foreground uppercase tracking-tight italic">Verify <span className="text-primary">Transfer</span></h3>
              </div>
              <p className="text-muted-foreground text-[9px] lg:text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                 Deploy digital proof of transfer (JPG/PDF) to initialize verification.
              </p>
           </div>

           <form onSubmit={handleSubmit} className="relative z-10 space-y-6 lg:space-y-8">
              <div className="space-y-4">
                 <div 
                    className={`relative border-2 border-dashed rounded-[1.5rem] lg:rounded-[2rem] transition-all flex flex-col items-center justify-center p-8 lg:p-10 cursor-pointer overflow-hidden ${
                      preview ? 'border-primary/40 bg-primary/5' : 'border-border hover:border-primary/40 bg-background/50'
                    }`}
                    onClick={() => document.getElementById('receipt-upload').click()}
                 >
                    {preview ? (
                       <img src={preview} alt="Receipt Preview" className="absolute inset-0 w-full h-full object-contain p-4" />
                    ) : (
                       <div className="flex flex-col items-center gap-4 text-center">
                          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                             <Upload size={28} className="lg:size-[32px]" />
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] lg:text-[10px] font-black text-foreground uppercase tracking-widest">Select Receipt Asset</p>
                             <p className="text-[7px] lg:text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">MAX 5MB_PROTOCOL</p>
                          </div>
                       </div>
                    )}
                    <input 
                      id="receipt-upload" 
                      type="file" 
                      accept="image/*,application/pdf" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                 <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl lg:rounded-2xl border border-border">
                    <ShieldCheck size={16} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-[8px] lg:text-[9px] font-medium text-muted-foreground leading-relaxed uppercase">
                       Confirmed: Digital assets represent the full acquisition cost. 
                    </p>
                 </div>

                 <button 
                   type="submit" 
                   disabled={submitting || !file}
                   className="w-full py-5 lg:py-6 bg-primary text-black font-black uppercase text-[11px] lg:text-xs tracking-[0.3em] rounded-xl lg:rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                 >
                   {submitting ? 'EXECUTING...' : 'FINALIZE'}
                 </button>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
}
