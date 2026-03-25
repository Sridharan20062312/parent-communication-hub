import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, ShieldCheck, Mail, Lock, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.png';

const StaffRegister: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        role: 'Staff',
        department: 'CS'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const savedStaff = JSON.parse(localStorage.getItem('adminStaffUsers') || '[]');
        const newStaff = { ...formData, id: Date.now() };
        localStorage.setItem('adminStaffUsers', JSON.stringify([...savedStaff, newStaff]));
        alert('Faculty Registration Successful! 🛡️ Administrator will verify your access shortly.');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#f1f3f5] flex flex-col items-center">
            {/* Minimal Header */}
            <header className="w-full bg-white shadow-md p-6 flex items-center justify-between border-b-4 border-primary-teal">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="GCE Erode Logo" className="w-16 h-16 object-contain" />
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-primary-navy leading-tight tracking-tight uppercase px-1">Institutional Registration</h1>
                        <p className="text-primary-teal font-black tracking-[0.2em] text-[10px] uppercase ml-1 opacity-60">Faculty Authentication Access</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-2xl px-6 py-12">
                <button 
                  onClick={() => navigate('/login')}
                  className="mb-8 flex items-center gap-2 text-primary-teal font-black text-xs uppercase tracking-widest hover:-translate-x-2 transition-transform"
                >
                    <ArrowLeft size={16} /> Return to Portal Gate
                </button>

                <div className="glass-panel overflow-hidden border-t-8 border-primary-navy p-10 relative">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary-navy/5 rounded-full -mr-16 -mt-16"></div>
                     <div className="flex items-center gap-4 mb-10">
                        <div className="w-16 h-16 bg-primary-navy text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-primary-navy/20 rotate-12 group-hover:rotate-0 transition-transform duration-500"><UserPlus size={32} /></div>
                        <div>
                            <h3 className="text-3xl font-black text-primary-navy tracking-tight italic flex items-center gap-2">Register <span className="text-primary-teal not-italic">Faculty</span></h3>
                            <p className="text-xs font-black uppercase text-slate-400 tracking-widest mt-1 opacity-60">Provision your official system account</p>
                        </div>
                     </div>

                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Legal Identity Name</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-teal" size={18} />
                                    <input 
                                      value={formData.name}
                                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                                      placeholder="Full Name"
                                      className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-primary-teal/5 focus:border-primary-teal transition-all text-sm font-bold"
                                      required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Assigned Username</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                      value={formData.username}
                                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                                      placeholder="Institutional ID"
                                      className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-sm font-bold"
                                      required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Tier Assignment</label>
                                <select 
                                  value={formData.role}
                                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                                  className="w-full p-4 bg-[#f8f9fa] border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-sm font-bold cursor-pointer"
                                >
                                    <option value="Staff">Academic Staff</option>
                                    <option value="Advisor">Institutional Advisor</option>
                                    <option value="HOD">Head of Department</option>
                                </select>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Secure Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                      type="password"
                                      value={formData.password}
                                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                                      placeholder="••••••••"
                                      className="w-full pl-12 pr-4 py-4 bg-[#f8f9fa] border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-sm font-bold"
                                      required
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full p-5 bg-gradient-to-r from-primary-navy to-slate-800 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-primary-navy/20 transition-all flex items-center justify-center gap-3 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-primary-teal opacity-0 group-hover:opacity-100 transition-all duration-500 -z-0"></div>
                           <span className="relative z-10 flex items-center gap-3">Create Professional Identity <ChevronRight size={20} /></span>
                        </button>
                        <p className="text-[10px] text-center text-slate-400 italic">By registering, you agree to the Institutional Information Security Policy of GCE Erode.</p>
                     </form>
                </div>
            </main>
        </div>
    );
};

export default StaffRegister;
