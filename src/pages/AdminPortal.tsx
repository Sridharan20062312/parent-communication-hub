import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Trash2, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  Plus, 
  Database,
  Lock,
  User 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPortal: React.FC = () => {
    const navigate = useNavigate();
    const [staff, setStaff] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'staff' | 'logs' | 'settings'>('staff');

    // Form for adding staff
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        role: 'Staff',
        department: 'CS'
    });

    useEffect(() => {
        const savedStaff = JSON.parse(localStorage.getItem('adminStaffUsers') || '[]');
        setStaff(savedStaff);
    }, []);

    const handleAddStaff = (e: React.FormEvent) => {
        e.preventDefault();
        const newStaff = { ...formData, id: Date.now() };
        const updated = [...staff, newStaff];
        setStaff(updated);
        localStorage.setItem('adminStaffUsers', JSON.stringify(updated));
        setFormData({ username: '', password: '', name: '', role: 'Staff', department: 'CS' });
        alert('Staff user added successfully! 🛡️');
    };

    const deleteStaff = (id: number) => {
        const updated = staff.filter(s => s.id !== id);
        setStaff(updated);
        localStorage.setItem('adminStaffUsers', JSON.stringify(updated));
    };

    const filteredStaff = staff.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-50 font-outfit overflow-hidden">
            {/* Dark Sidebar */}
            <aside className="w-20 bg-primary-navy flex flex-col items-center py-8 gap-10 shadow-xl border-r border-white/5 relative z-20">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary-teal text-2xl font-black">G</div>
                <nav className="flex flex-col gap-6">
                   <button onClick={() => setActiveTab('staff')} className={`p-3 rounded-xl transition-all ${activeTab === 'staff' ? 'bg-primary-teal text-white shadow-xl shadow-primary-teal/20' : 'text-white/40 hover:text-white'}`}><Users size={24} /></button>
                   <button onClick={() => setActiveTab('logs')} className={`p-3 rounded-xl transition-all ${activeTab === 'logs' ? 'bg-primary-teal text-white shadow-xl shadow-primary-teal/20' : 'text-white/40 hover:text-white'}`}><Database size={24} /></button>
                   <button onClick={() => setActiveTab('settings')} className={`p-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-primary-teal text-white shadow-xl shadow-primary-teal/20' : 'text-white/40 hover:text-white'}`}><Settings size={24} /></button>
                </nav>
                <button onClick={() => navigate('/login')} className="mt-auto p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"><LogOut size={24} /></button>
            </aside>

            {/* Main Area */}
            <main className="flex-1 p-10 flex flex-col">
                <header className="flex justify-between items-center mb-10 pb-8 border-b border-slate-200">
                    <div>
                        <h2 className="text-3xl font-black text-primary-navy tracking-tight flex items-center gap-3"><ShieldCheck size={32} className="text-primary-teal" /> Institutional Oversight</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1 opacity-60">Admin Security Control Unit</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 relative"><Bell size={20} className="text-slate-400" /><span className="absolute top-3 right-3 w-2 h-2 bg-primary-teal rounded-full"></span></button>
                        <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                             <div className="p-1.5 bg-primary-teal/10 text-primary-teal rounded-lg"><Lock size={16} /></div>
                             <p className="text-sm font-black text-primary-navy">Secure Session</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8 flex-1 overflow-hidden">
                    {/* Add Staff Section */}
                    <div className="col-span-4 flex flex-col gap-8 h-full">
                        <section className="glass-panel p-8 flex flex-col gap-6 border-t-8 border-primary-navy relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-navy/5 rounded-full -mr-12 -mt-12"></div>
                            <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] mb-2 flex items-center gap-2">
                                <UserPlus size={16} className="text-primary-teal" /> Provision Account
                            </h3>
                            <form onSubmit={handleAddStaff} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Full Identity Name</label>
                                    <input 
                                      value={formData.name}
                                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                                      placeholder="Full Legal Name"
                                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-sm font-bold"
                                      required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Assigned Username</label>
                                    <input 
                                      value={formData.username}
                                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                                      placeholder="Staff/Advisor ID"
                                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-sm font-bold"
                                      required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Secure Password</label>
                                    <input 
                                      type="password"
                                      value={formData.password}
                                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                                      placeholder="Default Authentication"
                                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary-teal/5 transition-all text-sm font-bold"
                                      required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Access Tier</label>
                                    <select 
                                      value={formData.role}
                                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm font-bold"
                                    >
                                        <option value="Staff">Academic Staff</option>
                                        <option value="Advisor">Advisor Level</option>
                                        <option value="HOD">Head of Department</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full p-4 bg-primary-navy text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-primary-navy/20 flex items-center justify-center gap-2 pt-5">
                                    <Plus size={16} /> Finalize Provision
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* Staff List Section */}
                    <div className="col-span-8 overflow-hidden flex flex-col">
                        <section className="glass-panel p-8 h-full flex flex-col border-t-8 border-primary-teal relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/5 rounded-full -mr-16 -mt-16"></div>
                             <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-100">
                                <h3 className="text-xl font-black text-primary-navy flex items-center gap-3 italic">
                                    <Database size={24} className="text-primary-teal" />
                                    Account Directory
                                    <span className="bg-primary-teal/10 text-primary-teal text-[10px] not-italic px-3 py-1 rounded-full font-black uppercase ml-4">{staff.length} Active Accounts</span>
                                </h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input 
                                      value={searchQuery}
                                      onChange={(e) => setSearchQuery(e.target.value)}
                                      placeholder="Query Name or ID..." 
                                      className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl outline-none text-sm w-72 h-10 font-bold tracking-tight"
                                    />
                                </div>
                             </div>

                             <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                {filteredStaff.map((s) => (
                                    <div key={s.id} className="p-5 bg-white border border-slate-200 rounded-3xl flex justify-between items-center hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 group">
                                         <div className="flex items-center gap-4">
                                             <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary-navy relative">
                                                 <User size={24} />
                                                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
                                             </div>
                                             <div>
                                                 <h4 className="font-black text-primary-navy text-lg group-hover:text-primary-teal transition-colors tracking-tight">{s.name}</h4>
                                                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                                                     ID: <span className="text-primary-teal">{s.username}</span> • <Mail size={10} /> Internal System Access
                                                 </p>
                                             </div>
                                         </div>
                                         <div className="flex items-center gap-6">
                                             <div className="text-right">
                                                 <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest ${s.role === 'HOD' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>{s.role}</span>
                                                 <p className="text-[10px] uppercase text-slate-400 mt-2 font-bold">{s.department} DEPT. ACCESS</p>
                                             </div>
                                             <button 
                                                onClick={() => deleteStaff(s.id)}
                                                className="p-3 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                             >
                                                <Trash2 size={20} />
                                             </button>
                                         </div>
                                    </div>
                                ))}
                                {filteredStaff.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20">
                                        <Database size={64} className="mb-4 opacity-20" />
                                        <p className="font-black uppercase tracking-widest text-xs">No active accounts in directory</p>
                                    </div>
                                )}
                             </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPortal;
