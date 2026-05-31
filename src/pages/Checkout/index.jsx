import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Landmark, MessageCircle, Lock, ShieldCheck, CreditCard } from 'lucide-react';
import SEO from '../../components/SEO';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const itemName = searchParams.get('item') || 'VIP Access / Mentorship';
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/settings/payment_info`);
        if (response.ok) {
          const data = await response.json();
          setPaymentInfo(data.value);
        }
      } catch (err) {
        console.error('Error fetching payment info:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Secure Checkout — Hajjo Dollars"
        description="Complete your payment to gain access to premium CPA marketing resources and mentorship."
        path="/checkout"
      />

      <div className="min-h-screen bg-background text-foreground pt-[100px] pb-20 px-5 transition-colors duration-300">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-4 transition-colors">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest transition-colors">
              <ShieldCheck size={12} /> Secure Checkout Portal
            </div>
            <h1 className="display-serif text-4xl sm:text-5xl font-black text-foreground transition-colors">Complete Your <span className="italic text-primary">Order</span></h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed transition-colors">
              You are purchasing: <span className="text-foreground font-bold transition-colors">{itemName}</span>. Follow the instructions below to finalize your access.
            </p>
          </div>

          {/* Payment Steps */}
          <div className="grid grid-cols-1 gap-6 transition-colors">
            
            {/* Step 1: Transfer */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden transition-colors duration-300">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
               <div className="flex items-center gap-4 transition-colors">
                 <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-foreground font-mono font-bold text-sm transition-colors">01</div>
                 <h2 className="text-xl font-bold uppercase tracking-tight transition-colors">Transfer Funds</h2>
               </div>
               
               <p className="text-muted-foreground text-sm transition-colors">Please make a transfer of the agreed amount to any of the verified bank accounts listed below:</p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-colors">
                 {paymentInfo?.bankAccounts?.map((account, index) => (
                   account.bankName && (
                    <div key={index} className="bg-background/50 border border-border p-5 rounded-xl space-y-3 transition-colors hover:border-primary/30">
                      <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest transition-colors">
                        <Landmark size={14} /> {account.bankName}
                      </div>
                      <div className="space-y-0.5 transition-colors">
                        <p className="text-xs text-muted-foreground/50 uppercase font-semibold transition-colors">Account Number</p>
                        <p className="text-lg font-mono font-black text-primary tracking-wider transition-colors">{account.accountNumber}</p>
                      </div>
                      <div className="space-y-0.5 transition-colors">
                        <p className="text-xs text-muted-foreground/50 uppercase font-semibold transition-colors">Account Name</p>
                        <p className="text-sm font-bold text-foreground transition-colors">{account.accountName}</p>
                      </div>
                    </div>
                   )
                 ))}
                 {!paymentInfo?.bankAccounts?.some(a => a.bankName) && (
                   <p className="text-yellow-600 dark:text-yellow-500/70 text-xs italic transition-colors">No bank information configured yet. Please contact support.</p>
                 )}
               </div>
            </div>

            {/* Step 2: Verification */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden transition-colors duration-300">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
               <div className="flex items-center gap-4 transition-colors">
                 <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-foreground font-mono font-bold text-sm transition-colors">02</div>
                 <h2 className="text-xl font-bold uppercase tracking-tight transition-colors">Verify Payment</h2>
               </div>
               
               <p className="text-muted-foreground text-sm leading-relaxed transition-colors">
                 Once the transfer is successful, take a screenshot of the receipt and click the button below to send it to our team on WhatsApp. Your access will be granted immediately after verification.
               </p>

               {paymentInfo?.whatsappNumber ? (
                 <a 
                   href={`https://wa.me/${paymentInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Hajjo Dollars, I have just made a payment for: "${itemName}". Here is my receipt.`)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest text-sm px-10 py-5 rounded-xl transition-all hover:shadow-xl hover:shadow-[#25D366]/30 w-full sm:w-auto shadow-lg shadow-[#25D366]/10"
                 >
                   <MessageCircle size={20} /> SEND RECEIPT TO WHATSAPP
                 </a>
               ) : (
                 <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-xs text-center font-bold uppercase tracking-widest transition-colors">
                   WhatsApp Support Number Not Configured
                 </div>
               )}
            </div>

          </div>

          {/* Footer CTA */}
          <div className="flex flex-col items-center gap-6 pt-10 transition-colors">
            <Link to="/" className="text-muted-foreground hover:text-foreground text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
              <ArrowLeft size={12} /> Back to Website
            </Link>
            <div className="flex items-center gap-6 text-muted-foreground/30 transition-colors">
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-tighter transition-colors">
                <Lock size={10} /> 256-BIT SSL
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-tighter transition-colors">
                <CreditCard size={10} /> SECURE TRANSFERS
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
