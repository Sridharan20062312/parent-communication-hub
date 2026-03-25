import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  BookOpen, 
  ChevronRight, 
  LogOut, 
  Bell, 
  GraduationCap, 
  ShieldCheck, 
  Activity, 
  ChevronDown,
  Award,
  Globe,
  Settings,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const StudentPortal: React.FC = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState<any>(null);
    const [marks, setMarks] = useState<any>({});

    useEffect(() => {
        const enrollments = JSON.parse(localStorage.getItem('studentEnrollments') || '[]');
        const savedMarks = JSON.parse(localStorage.getItem('staffMarkRecords') || '{}');
        
        // Mocking the first student as the logged-in user
        const first = enrollments[0] || { 
            fullName: 'Alan Turing', 
            regNo: '731124104001', 
            rollNo: '24CSE01', 
            email: 'alan@student.edu',
            parentMobile: '9123456780',
            source: 'Manual'
        };
        setStudent(first);
        setMarks(savedMarks[first.rollNo] || {});
    }, []);

    if (!student) return <div className="p-20 text-center">Initalizing Student Session...</div>;

    const subjects = Object.keys(marks);

    return (
        <div className="min-h-screen bg-[#f1f3f5] flex">
            {/* Minimal High-Tech Sidebar */}
            <aside className="w-20 bg-primary-navy flex flex-col items-center py-10 gap-10 shadow-2xl relative z-20 border-r border-white/5">
                <div className="absolute top-0 right-0 w-full h-1 bg-primary-teal shadow-[0_0_15px_rgba(42,157,143,0.5)]"></div>
                <div className="w-14 h-14 bg-gradient-to-br from-primary-navy to-slate-800 rounded-3xl flex items-center justify-center text-primary-teal text-2xl font-black shadow-xl border border-white/10 ring-4 ring-primary-teal/5">G</div>
                <nav className="flex flex-col gap-8">
                   <button className="p-3.5 bg-primary-teal/10 text-primary-teal rounded-2xl shadow-inner border border-primary-teal/20 transition-all hover:scale-110"><LayoutDashboard size={24} /></button>
                   <button className="p-3.5 text-white/30 hover:text-white transition-all hover:scale-110"><BookOpen size={24} /></button>
                   <button className="p-3.5 text-white/30 hover:text-white transition-all hover:scale-110"><Activity size={24} /></button>
                   <button className="p-3.5 text-white/30 hover:text-white transition-all hover:scale-110"><Globe size={24} /></button>
                   <button className="p-3.5 text-white/30 hover:text-white transition-all hover:scale-110"><Settings size={24} /></button>
                </nav>
                <button onClick={() => navigate('/login')} className="mt-auto p-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group relative">
                    <LogOut size={24} />
                    <span className="absolute left-full ml-4 bg-red-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all ml-10">LogOut</span>
                </button>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-12 overflow-y-auto font-outfit">
                <header className="flex justify-between items-center mb-16 px-4">
                    <div className="flex items-center gap-8">
                        <img src={logo} alt="GCE" className="w-24 h-24 object-contain shadow-2xl rounded-full p-2 bg-white" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-teal/80">Student Unified Portal</p>
                            <h2 className="text-4xl font-black text-primary-navy tracking-tight mt-1 flex items-center gap-3 italic">Academic Portfolio <ChevronRight size={24} className="text-primary-teal" /> {student.fullName}</h2>
                            <p className="text-slate-500 font-bold tracking-wider mt-2 flex items-center gap-2 opacity-60 uppercase text-[10px]">
                                <MapPin size={12} /> Government College of Engineering, Erode • CS DEPT. • 2026 TERM S1
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-black text-primary-navy tracking-tight">System Identity Verified</p>
                            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1 flex items-center gap-1 justify-end"><ShieldCheck size={12} /> SECURE STATUS</p>
                        </div>
                        <button className="p-4 bg-white rounded-3xl shadow-2xl border border-slate-100 text-slate-500 relative transition-all hover:scale-110 group">
                            <Bell size={24} />
                            <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500 rounded-full border-4 border-white"></span>
                            <div className="absolute top-full right-0 mt-4 bg-primary-navy text-white text-[10px] font-bold p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-2xl w-48 text-center pointer-events-none z-30">Your internal assessment grades were just linked by Advisor.</div>
                        </button>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-12 gap-10">
                    {/* Academic Overview */}
                    <section className="col-span-8 space-y-10">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-3 gap-6">
                             <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-200/50 flex flex-col gap-4 relative overflow-hidden group">
                                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-teal/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
                                 <div className="w-12 h-12 bg-primary-teal/10 text-primary-teal rounded-2xl flex items-center justify-center relative z-10"><Award size={24} /></div>
                                 <div className="relative z-10">
                                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Aggregate GPA</p>
                                     <p className="text-3xl font-black text-primary-navy mt-1">8.54 <span className="text-sm font-bold opacity-30 italic">/ 10</span></p>
                                 </div>
                             </div>
                             <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-200/50 flex flex-col gap-4 group">
                                 <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center relative z-10"><Calendar size={24} /></div>
                                 <div className="relative z-10">
                                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Attendance %</p>
                                     <p className="text-3xl font-black text-primary-navy mt-1">92.5 <span className="text-sm font-bold opacity-30 italic">%</span></p>
                                 </div>
                             </div>
                             <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-200/50 flex flex-col gap-4 group overflow-hidden">
                                 <div className="absolute bottom-0 w-full h-1 bg-primary-teal/30 scale-x-0 group-hover:scale-x-100 transition-all origin-left duration-500"></div>
                                 <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center relative z-10"><Clock size={24} /></div>
                                 <div className="relative z-10">
                                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Semestral Rank</p>
                                     <p className="text-3xl font-black text-primary-navy mt-1">#08 <span className="text-sm font-bold opacity-30 italic">/ 60</span></p>
                                 </div>
                             </div>
                        </div>

                        {/* Marks Table */}
                        <div className="glass-panel p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl -z-10 -mr-32 -mt-32"></div>
                            <h3 className="text-2xl font-black text-primary-navy mb-10 flex items-center gap-4">
                                <span className="w-2 h-8 bg-primary-teal rounded-full mr-2 shadow-[0_0_15px_rgba(42,157,143,0.3)]"></span>
                                Performance Transcript
                            </h3>
                            <div className="space-y-4">
                                {subjects.length > 0 ? subjects.map(subj => {
                                    const data = marks[subj];
                                    return (
                                        <div key={subj} className="p-6 bg-[#f1f3f5]/50 border border-slate-100 rounded-3xl flex justify-between items-center hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary-teal shadow-xl font-black text-xs group-hover:rotate-12 transition-all">{subj.match(/\((.*?)\)/)?.[1] || "SUB"}</div>
                                                <div>
                                                    <h4 className="font-black text-slate-700 tracking-tight text-lg italic">{subj.split(' (')[0]}</h4>
                                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1 opacity-60">Faculty Instructor Verified</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-10 text-right">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Score</p>
                                                    <p className="text-3xl font-black text-primary-navy italic">{data.total} <span className="text-sm font-bold not-italic opacity-20">/ 100</span></p>
                                                </div>
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-2xl relative ${data.total >= 50 ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-red-500 text-white shadow-red-500/30'}`}>
                                                    {data.total >= 90 ? 'O' : data.total >= 80 ? 'A+' : data.total >= 50 ? 'B' : 'U'}
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse opacity-40"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : (
                                    <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-4 italic font-bold">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center"><BookOpen size={32} className="opacity-10" /></div>
                                        No academic records linked to this Register Number yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Profile Section */}
                    <section className="col-span-4 space-y-10">
                         <div className="glass-panel p-10 text-center relative overflow-hidden group">
                             <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-primary-navy to-slate-800 -z-10 group-hover:h-40 transition-all duration-700"></div>
                             <div className="w-32 h-32 bg-white rounded-[2.5rem] mx-auto flex items-center justify-center text-5xl shadow-2xl relative z-10 border-4 border border-white/20 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">👨‍🎓</div>
                             <div className="mt-8 relative z-10">
                                 <h3 className="text-2xl font-black text-primary-navy tracking-tight">{student.fullName}</h3>
                                 <p className="text-[10px] font-black uppercase text-primary-teal tracking-[0.3em] font-black mt-2">Roll No: {student.rollNo}</p>
                                 <div className="mt-8 flex justify-center gap-3">
                                     <button className="px-5 py-2.5 bg-primary-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl shadow-primary-navy/20 hover:bg-black transition-all">Edit Profile</button>
                                     <button className="px-5 py-2.5 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all">Settings</button>
                                 </div>
                             </div>
                         </div>

                         <div className="glass-panel p-8 pt-10">
                             <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-100 pb-4">Digital Identity</h4>
                             <div className="space-y-6">
                                 <div className="flex items-center gap-5 group cursor-pointer">
                                     <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all"><Mail size={18} /></div>
                                     <div className="overflow-hidden">
                                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Institutional Email</p>
                                         <p className="text-sm font-bold text-slate-700 truncate">{student.email}</p>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-5 group cursor-pointer">
                                     <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all"><Phone size={18} /></div>
                                     <div className="overflow-hidden">
                                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Authenticated Contact</p>
                                         <p className="text-sm font-bold text-slate-700 truncate">{student.parentMobile}</p>
                                     </div>
                                 </div>
                                 <div className="flex items-center gap-5 group cursor-pointer">
                                     <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all"><User size={18} /></div>
                                     <div className="overflow-hidden">
                                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Administrative Source</p>
                                         <p className="text-sm font-bold text-slate-700">Digital Registry Entry</p>
                                     </div>
                                 </div>
                             </div>
                         </div>

                         <div className="p-10 bg-gradient-to-br from-primary-teal to-emerald-600 rounded-[2.5rem] text-white relative overflow-hidden group">
                             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-all duration-1000"></div>
                             <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-8 flex items-center gap-2 italic">
                                 <Globe size={14} /> Global Insight
                             </h4>
                             <p className="text-lg font-bold leading-tight tracking-tight italic">"The advancement of technology is based on making it fit in so that you don't even notice it, so it's part of everyday life."</p>
                             <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                 <span>GCE AI-Engine Insight</span>
                                 <ChevronDown size={14} />
                             </div>
                         </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default StudentPortal;
