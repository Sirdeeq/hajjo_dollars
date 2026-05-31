import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Shield, 
  Clock, 
  Award, 
  Zap,
  Camera,
  Save,
  Lock,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    bio: user?.bio || ''
  });
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    courses: 0,
    hours: 0,
    achievements: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/enrollments/my`);
        setStats({
          courses: res.data.length,
          hours: res.data.reduce((acc, curr) => acc + (curr.progress > 0 ? 5 : 0), 0), // Dummy hour calc
          achievements: res.data.filter(e => e.progress === 100).length
        });
      } catch (err) { console.error(err); }
    };
    fetchStats();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let updatedProfilePicture = profilePicture;
      
      if (profilePictureFile) {
        const formDataImg = new FormData();
        formDataImg.append('images', profilePictureFile);
        const imgRes = await axios.post(`${API_URL}/upload`, formDataImg);
        updatedProfilePicture = imgRes.data.urls[0];
      }

      const updatedData = { ...formData, profilePicture: updatedProfilePicture };
      const res = await axios.put(`${API_URL}/auth/profile`, updatedData);
      
      updateUser(res.data);
      setProfilePicture(updatedProfilePicture);
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight italic">Scholar <span className="text-primary">Identity</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Manage Your Academic Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Identity Card */}
        <div className="space-y-8">
           <div className="bg-card border border-border rounded-[3rem] p-10 flex flex-col items-center text-center space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-24 bg-primary/5" />
              
              <div className="relative z-10">
                 <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-emerald-700 p-[2px] relative group cursor-pointer overflow-hidden">
                    {profilePicture ? (
                      <img
                        src={profilePicture}
                        alt={user?.name}
                        className="w-full h-full object-cover rounded-[2.4rem]"
                      />
                    ) : (
                      <div className="w-full h-full rounded-[2.4rem] bg-card flex items-center justify-center text-primary font-black text-4xl border border-black/20 relative z-10">
                        {user?.name?.[0]}
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/60 rounded-[2.4rem] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-20 cursor-pointer">
                      <Camera size={24} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                    </label>
                 </div>
                 <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{user?.name}</h2>
                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">Certified Scholar Node</p>
                 </div>
              </div>

              <div className="w-full grid grid-cols-3 gap-4 py-6 border-y border-border relative z-10">
                 <div className="space-y-1">
                    <p className="text-lg font-black text-foreground font-mono">{stats.courses}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Programs</p>
                 </div>
                 <div className="space-y-1 border-x border-border">
                    <p className="text-lg font-black text-foreground font-mono">{stats.hours}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Hours</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-lg font-black text-foreground font-mono">{stats.achievements}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Badges</p>
                 </div>
              </div>

              <div className="w-full space-y-3 relative z-10">
                 <div className="flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-3">
                       <Shield size={16} className="text-primary" />
                       <span className="text-[10px] font-black uppercase tracking-tight">Security Level</span>
                    </div>
                    <span className="text-[9px] font-black text-emerald-500 uppercase">Verified</span>
                 </div>
                 <button className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-2xl border border-border group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-3">
                       <Lock size={16} className="text-primary" />
                       <span className="text-[10px] font-black uppercase tracking-tight">Access Key</span>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground" />
                 </button>
              </div>
           </div>

           {/* Quick Stats Widget */}
           <div className="bg-primary border border-primary/20 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center gap-3 text-black">
                 <Zap size={20} className="fill-black" />
                 <h3 className="text-xs font-black uppercase tracking-[0.3em]">Momentum</h3>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-black/60 uppercase">System Integrity</span>
                    <span className="text-[9px] font-black text-black uppercase">98%</span>
                 </div>
                 <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full bg-black w-[98%]" />
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Management Panel */}
        <div className="lg:col-span-2">
           <div className="bg-card border border-border rounded-[3rem] p-8 lg:p-12 space-y-10">
              <div className="space-y-4">
                 <h3 className="text-xl font-black text-foreground uppercase tracking-tight italic">Edit <span className="text-primary">Credentials</span></h3>
                 <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">Ensure your profile data is accurate for official certification records.</p>
              </div>

              <form onSubmit={handleUpdate} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Legal Designation</label>
                       <div className="relative group">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-xs text-foreground focus:outline-none focus:border-primary/40 transition-all font-bold uppercase tracking-widest"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Communication Node (Email)</label>
                       <div className="relative group opacity-50">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="email"
                            readOnly
                            className="w-full bg-muted border border-border rounded-2xl py-4 pl-12 pr-4 text-xs text-foreground cursor-not-allowed font-bold"
                            value={formData.email}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Signal Channel (Phone)</label>
                       <div className="relative group">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            placeholder="+234 ..."
                            className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-xs text-foreground focus:outline-none focus:border-primary/40 transition-all font-mono"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Geographic Node (Country)</label>
                       <div className="relative group">
                          <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            placeholder="Nigeria"
                            className="w-full bg-background border border-border rounded-2xl py-4 pl-12 pr-4 text-xs text-foreground focus:outline-none focus:border-primary/40 transition-all font-bold uppercase tracking-widest"
                            value={formData.country}
                            onChange={e => setFormData({...formData, country: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Professional Bio (Brief Protocol)</label>
                    <textarea
                      rows={4}
                      className="w-full bg-background border border-border rounded-[2rem] p-6 text-xs text-foreground focus:outline-none focus:border-primary/40 transition-all font-medium leading-relaxed resize-none"
                      placeholder="Share your learning objectives..."
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                    />
                 </div>

                 <div className="pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-auto px-12 py-5 bg-primary text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                    >
                       {loading ? 'Synchronizing...' : (
                         <>
                            Save Profile Protocol <Save size={18} />
                         </>
                       )}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
