import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Download, 
  X,
  Edit,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [savingName, setSavingName] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { user } = useAuth();
  const certificateRef = useRef(null);
  const fullscreenCertificateRef = useRef(null);

  // Admin settings for signature and name
  const [adminInfo, setAdminInfo] = useState({
    name: 'Hajjo Dollars Admin',
    signature: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentsRes, settingsRes] = await Promise.all([
          axios.get(`${API_URL}/enrollments/my`),
          axios.get(`${API_URL}/settings/certificate_info`).catch(() => null)
        ]);
        const completed = enrollmentsRes.data.filter(e => e.progress === 100);
        setCertificates(completed);
        
        if (settingsRes?.data?.value) {
          setAdminInfo(settingsRes.data.value);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditName = async () => {
    if (!editNameValue.trim()) return;
    setSavingName(true);
    try {
      const res = await axios.put(`${API_URL}/enrollments/${selectedCert._id}/certificate-name`, { name: editNameValue });
      setCertificates(prev => prev.map(c => c._id === selectedCert._id ? res.data : c));
      setSelectedCert(res.data);
      setIsEditingName(false);
    } catch (err) {
      console.error('Error editing name:', err);
      alert(err.response?.data?.message || 'Failed to edit name');
    } finally {
      setSavingName(false);
    }
  };

  const handleDownloadPDF = async () => {
    const ref = isFullscreen ? fullscreenCertificateRef : certificateRef;
    if (!ref.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(ref.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      
      const yOffset = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
      
      pdf.save(`${selectedCert.certificateId || selectedCert._id}_certificate.pdf`);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download certificate');
    } finally {
      setDownloading(false);
    }
  };

  const CertificateContent = ({ isFull = false }) => {
    const ref = isFull ? fullscreenCertificateRef : certificateRef;
    return (
      <div 
        ref={ref}
        className="relative w-full bg-gradient-to-br from-amber-50 via-white to-amber-50 border-4 border-double border-amber-400 rounded-lg overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {/* Elegant background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a021' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Corner decorations - gold gradient */}
        <div className="absolute top-0 right-0 w-1/3 h-2/5 overflow-hidden">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#c5a021', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#f4d03f', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="goldEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#f4d03f', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#c5a021', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path d="M0,0 L400,0 L400,300 Q200,250 0,300 Z" fill="url(#goldGradient)" />
            <path d="M0,0 L400,0 L400,300 Q200,240 0,300 Z" fill="none" stroke="url(#goldEdge)" strokeWidth="10" />
            <path d="M0,0 L400,0 L400,300 Q200,230 0,300 Z" fill="none" stroke="#fff8dc" strokeWidth="3" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/5 overflow-hidden rotate-180">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <defs>
              <linearGradient id="goldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#c5a021', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#f4d03f', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="goldEdge2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#f4d03f', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#c5a021', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path d="M0,0 L400,0 L400,300 Q200,250 0,300 Z" fill="url(#goldGradient2)" />
            <path d="M0,0 L400,0 L400,300 Q200,240 0,300 Z" fill="none" stroke="url(#goldEdge2)" strokeWidth="10" />
            <path d="M0,0 L400,0 L400,300 Q200,230 0,300 Z" fill="none" stroke="#fff8dc" strokeWidth="3" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-3 md:px-10 py-3 md:py-8">
          {/* Seal/badge - gold */}
          <div className="absolute top-2 left-2 md:top-6 md:left-6 w-16 h-16 md:w-24 md:h-24">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="sealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#f4d03f', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#d4af37', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#c5a021', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Seal base */}
              <circle cx="100" cy="100" r="95" fill="url(#sealGradient)" stroke="#fff8dc" strokeWidth="8" />
              <circle cx="100" cy="100" r="80" fill="#000" stroke="url(#sealGradient)" strokeWidth="3" />
              
              {/* Stars */}
              <text x="100" y="55" textAnchor="middle" fontSize="24" fill="#f4d03f">★★★★★</text>
              
              {/* Text */}
              <text x="100" y="85" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#f4d03f" fontFamily="Georgia, serif">HAJJO</text>
              <text x="100" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f4d03f" fontFamily="Georgia, serif">DOLLARS</text>
              <text x="100" y="125" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#f4d03f" fontFamily="Georgia, serif">WEALTH</text>
              <text x="100" y="145" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f4d03f" fontFamily="Georgia, serif">SOLUTIONS</text>
              
              {/* Bottom stars */}
              <text x="100" y="170" textAnchor="middle" fontSize="16" fill="#f4d03f">★ ★ ★</text>
            </svg>
          </div>

          <div className="text-center space-y-3 md:space-y-5 w-full max-w-4xl">
            {/* Certificate title */}
            <div className="space-y-1">
              <h1 
                className="text-3xl md:text-6xl font-black text-gray-800 tracking-wider drop-shadow-sm"
                style={{ fontFamily: 'Old English Text MT, Blackletter, Georgia, serif' }}
              >
                Certificate
              </h1>
              <p className="text-lg md:text-2xl font-semibold text-amber-700 uppercase tracking-[0.35em]">
                of Excellence
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 w-full max-w-2xl mx-auto">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
              <span className="text-amber-500">◆</span>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
            </div>

            {/* Presented to */}
            <div className="space-y-2 mt-3">
              <p className="text-sm md:text-xl text-gray-500 italic tracking-wide">This Certificate is proudly awarded to</p>
              {isEditingName ? (
                <div className="flex items-center justify-center gap-3">
                  <input 
                    type="text" 
                    value={editNameValue}
                    onChange={(e) => setEditNameValue(e.target.value)}
                    className="px-5 py-2 text-2xl md:text-4xl font-black text-gray-800 text-center border-b-3 border-amber-500 w-full max-w-xl bg-transparent focus:outline-none focus:border-amber-600"
                    placeholder="Enter your name"
                  />
                  <button 
                    onClick={handleEditName}
                    disabled={savingName}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    {savingName ? 'Saving...' : <CheckCircle2 size={20} />}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl md:text-5xl font-black text-amber-700" style={{ fontFamily: 'Georgia, serif' }}>
                    {selectedCert.certificateName || user?.name || 'Recipient Name'}
                  </h2>
                  {!selectedCert.isCertificateNameEdited && (
                    <button 
                      onClick={() => {
                        setEditNameValue(selectedCert.certificateName || user?.name || '');
                        setIsEditingName(true);
                      }}
                      className="p-1.5 hover:bg-amber-100 rounded-full transition-all"
                    >
                      <Edit size={16} className="text-amber-600" />
                    </button>
                  )}
                </div>
              )}
              <div className="w-2/3 md:w-3/4 mx-auto h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full mt-1"></div>
            </div>

            {/* Program details */}
            <div className="space-y-2 mt-2">
              <p className="text-xs md:text-lg text-gray-500 italic">For successfully completing the</p>
              <h3 className="text-xl md:text-3xl font-black text-gray-800 uppercase tracking-wide">
                {selectedCert.program.title}
              </h3>
              <p className="text-sm md:text-xl text-gray-500 italic">Program Mastery Protocol</p>
              <p className="text-xs md:text-lg text-gray-500 italic">at Hajjo Dollars Wealth Solutions</p>
            </div>

            {/* Footer with date and signature */}
            <div className="flex flex-col md:flex-row justify-between items-end pt-6 md:pt-8 gap-6 md:gap-0 mt-2">
              <div className="text-center">
                <div className="w-32 md:w-40 h-10 md:h-12 border-b-2 border-amber-700 mx-auto"></div>
                <p className="text-sm md:text-xl text-gray-700 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {new Date(selectedCert.issuedAt || selectedCert.activatedAt || selectedCert.enrolledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-[0.3em] mt-1">Date</p>
              </div>

              <div className="text-center">
                <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-[0.3em] mb-1">Certificate ID</p>
                <p className="text-xs md:text-lg font-mono font-bold text-amber-700">
                  {selectedCert.certificateId || selectedCert._id.substring(0, 12).toUpperCase()}
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 md:w-40 h-10 md:h-12 flex items-center justify-center">
                  {adminInfo.signature ? (
                    <img 
                      src={adminInfo.signature} 
                      alt="Admin Signature" 
                      className="h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full border-b-2 border-amber-700"></div>
                  )}
                </div>
                <p className="text-sm md:text-xl text-gray-700 mt-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {adminInfo.name}
                </p>
                <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-[0.3em] mt-1">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="h-full flex items-center justify-center font-sans"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8 lg:space-y-10 pb-20 font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-foreground uppercase tracking-tight italic leading-tight">Achievement <span className="text-primary">Ledger</span></h1>
          <p className="text-muted-foreground text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Verified Scholar Credentials</p>
        </div>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
           {certificates.map((cert) => (
             <motion.div 
               key={cert._id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-card border border-border rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 space-y-6 lg:space-y-8 hover:border-primary/20 transition-all relative overflow-hidden group shadow-sm cursor-pointer"
               onClick={() => setSelectedCert(cert)}
             >
                <div className="absolute top-0 right-0 p-4 lg:p-8 text-primary/5 group-hover:text-primary/10 transition-colors">
                   <Award size={100} className="lg:size-[120px]" />
                </div>

                <div className="space-y-4 relative z-10">
                   <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Award size={20} />
                   </div>
                   <div>
                      <h3 className="text-lg lg:text-xl font-black text-foreground uppercase tracking-tight leading-tight line-clamp-2">{cert.program.title}</h3>
                      <p className="text-[9px] lg:text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Program Mastery Protocol</p>
                   </div>
                </div>

                <div className="pt-6 border-t border-border space-y-4 relative z-10">
                   <div className="flex justify-between items-center text-[9px] lg:text-[10px]">
                      <span className="font-bold text-muted-foreground uppercase tracking-widest">Issued On</span>
                      <span className="font-black text-foreground uppercase">{new Date(cert.issuedAt || cert.activatedAt || cert.enrolledAt).toLocaleDateString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-[9px] lg:text-[10px]">
                      <span className="font-bold text-muted-foreground uppercase tracking-widest">ID</span>
                      <span className="font-black text-primary font-mono truncate ml-4">{cert.certificateId || cert._id.substring(0, 12).toUpperCase()}</span>
                   </div>
                </div>

                <div className="pt-6 flex gap-3 relative z-10">
                   <div 
                     className="flex-1 py-4 bg-primary text-black font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl shadow-primary/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                     onClick={(e) => { e.stopPropagation(); setSelectedCert(cert); }}
                   >
                      View Certificate
                   </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
             </motion.div>
           ))}
        </div>
      ) : (
        <div className="py-24 lg:py-40 text-center space-y-6 bg-card border border-dashed border-border rounded-[2rem] lg:rounded-[3rem]">
           <div className="w-16 h-16 lg:w-20 lg:h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground/20 shrink-0">
              <Award size={32} />
           </div>
           <div className="space-y-2">
              <p className="text-base lg:text-lg font-black text-foreground uppercase tracking-tight italic">No Achievements <span className="text-primary">Detected</span></p>
              <p className="text-[9px] lg:text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] max-w-xs mx-auto">Complete a curriculum to 100% mastery.</p>
           </div>
           <Link to="/dashboard/programs" className="inline-block px-10 py-4 border border-border text-foreground font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-muted transition-all">View Programs</Link>
        </div>
      )}

      {/* Regular certificate modal */}
      <AnimatePresence>
        {selectedCert && !isFullscreen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-background/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-[1.5rem] w-full max-w-[98vw] lg:max-w-6xl max-h-[98vh] overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-3 md:p-6 border-b border-border">
                <div>
                  <h3 className="text-sm md:text-xl font-black uppercase tracking-tight">{selectedCert.program.title} - Certificate</h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsFullscreen(true)}
                    className="p-2 rounded-xl hover:bg-muted transition-all"
                    title="Fullscreen View"
                  >
                    <Maximize2 size={18} />
                  </button>
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl hover:bg-muted transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="overflow-auto custom-scrollbar p-2 md:p-6">
                <CertificateContent />
                
                {/* Actions */}
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-amber-600 text-black font-black uppercase tracking-widest rounded-xl shadow-xl hover:scale-105 transition-all disabled:opacity-50 text-sm"
                  >
                    {downloading ? 'Downloading...' : (
                      <>
                        <Download size={16} />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen certificate view */}
      <AnimatePresence>
        {isFullscreen && selectedCert && (
          <div className="fixed inset-0 z-[200] bg-gray-900 flex flex-col">
            <div className="flex items-center justify-between p-3 bg-gray-800 text-white">
              <h3 className="font-bold text-sm md:text-base">{selectedCert.program.title} - Certificate</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadPDF}
                  disabled={downloading}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary to-amber-600 text-black font-bold uppercase tracking-wider rounded-lg hover:scale-105 transition-all disabled:opacity-50 text-xs"
                >
                  {downloading ? 'Downloading...' : <><Download size={14} /> Download</>}
                </button>
                <button 
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-1 md:p-4 flex items-center justify-center">
              <div className="w-full max-w-[98vw] md:max-w-[90vw] lg:max-w-[85vw]">
                <CertificateContent isFull />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
