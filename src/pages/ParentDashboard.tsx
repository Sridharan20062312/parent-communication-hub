import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell, 
  Plus, 
  GraduationCap, 
  TrendingUp, 
  ChevronRight,
  Send,
  User,
  AlertTriangle,
  Award,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ParentDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [marks, setMarks] = useState<any>({});
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [studentName, setStudentName] = useState('Emma');

    useEffect(() => {
        // In a real app, we would fetch based on the logged in parent's ward
        const savedMarks = JSON.parse(localStorage.getItem('staffMarkRecords') || '{}');
        const firstStudent = Object.keys(savedMarks)[0];
        if (firstStudent) {
            setMarks(savedMarks[firstStudent]);
            // Search student name in enrollments
             const enrollments = JSON.parse(localStorage.getItem('studentEnrollments') || '[]');
             const s = enrollments.find((e: any) => e.rollNo === firstStudent);
             if (s) setStudentName(s.fullName);
        }
    }, []);

    const sendMessage = () => {
        if (!newMessage) return;
        const msg = {
            student: studentName,
            message: newMessage,
            timestamp: new Date().toLocaleString()
        };
        const savedMsgs = JSON.parse(localStorage.getItem('nammaGCE_ParentMessages') || '[]');
        localStorage.setItem('nammaGCE_ParentMessages', JSON.stringify([...savedMsgs, msg]));
        setNewMessage('');
        alert('Message sent to Advisor! 🚀');
    };

    return (
        <div className="flex min-h-screen bg-[#f8f9fa] font-outfit">
            {/* Sidebar */}
            <aside className="w-64 bg-primary-navy text-white flex flex-col fixed inset-y-0 shadow-2xl z-20 overflow-hidden">
                <div className="p-8 pb-12 flex items-center gap-4 relative">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-teal/20 rounded-full blur-2xl"></div>
                    <div className="w-12 h-12 bg-primary-teal rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-primary-teal/20 relative z-10">🎓</div>
                    <div className="relative z-10">
                        <h1 className="font-black text-2xl leading-none tracking-tight">EduConnect</h1>
                        <p className="text-[10px] opacity-40 uppercase mt-1 tracking-widest font-bold">Parent Hub Professional</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button className="w-full nav-item active group"><BarChart3 size={20} className="group-hover:scale-110 transition-all" /> Dashboard</button>
                    <button className="w-full nav-item group"><MessageSquare size={20} className="group-hover:scale-110 transition-all" /> Messages <span className="ml-auto bg-primary-teal/20 text-primary-teal text-[10px] px-2 py-0.5 rounded-full font-bold">3</span></button>
                    <button className="w-full nav-item group"><Calendar size={20} className="group-hover:scale-110 transition-all" /> Academic Calendar</button>
                    <button className="w-full nav-item group"><TrendingUp size={20} className="group-hover:scale-110 transition-all" /> Performance Tracker</button>
                    <button className="w-full nav-item group"><Settings size={20} className="group-hover:scale-110 transition-all" /> Portal Settings</button>
                </nav>

                <div className="mt-auto p-6 flex flex-col gap-6">
                    <div className="glass-panel bg-white/5 border-none p-4 flex items-center gap-3">
                         <div className="w-10 h-10 bg-primary-teal/20 rounded-full flex items-center justify-center text-primary-teal text-xl">👨‍👩‍👧</div>
                         <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">Sarah Jenkins</p>
                            <p className="text-[10px] opacity-40 uppercase">Parent of {studentName}</p>
                         </div>
                    </div>
                    <button onClick={() => navigate('/login')} className="w-full btn-teal bg-primary-earth/10 hover:bg-primary-earth/20 text-primary-earth border border-primary-earth/20 flex items-center justify-center gap-2 mb-4">
                        <LogOut size={18} /> Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-12 overflow-y-auto">
                <header className="flex justify-between items-center mb-16 relative">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl -z-10"></div>
                    <div>
                        <h2 className="text-4xl font-black text-primary-navy tracking-tight">Welcome back, Sarah! 👋</h2>
                        <p className="text-slate-500 mt-2 text-lg">Here's a detailed overview of <span className="text-primary-teal font-black underline decoration-primary-teal/30">{studentName}'s</span> progress today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                         <button className="p-3 bg-white rounded-2xl shadow-xl border border-slate-100 text-slate-500 relative hover:scale-110 transition-all">
                            <Bell size={24} />
                            <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-4 border-white"></span>
                         </button>
                         <button className="bg-primary-navy text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 shadow-2xl shadow-primary-navy/20 hover:bg-black transition-all">
                            <Plus size={20} /> New Inquiry
                         </button>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    {/* Marks Overview */}
                    <section className="col-span-8 glass-panel p-10 border-t-8 border-primary-teal relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/5 rounded-full -mr-16 -mt-16"></div>
                         <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black text-primary-navy flex items-center gap-3">
                                <Award className="text-primary-teal" size={28} />
                                Academic Results (S2026)
                            </h3>
                            <button className="text-sm font-black text-primary-teal hover:underline flex items-center gap-1">View Full Gradecard <ChevronRight size={14} /></button>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            {Object.keys(marks).length > 0 ? (
                                Object.keys(marks).map(subj => (
                                    <div key={subj} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 flex justify-between items-center hover:bg-white hover:shadow-xl hover:shadow-slate-200 transition-all duration-300">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{subj.split('(')[0]}</p>
                                            <p className="text-lg font-black text-slate-700 mt-1">{marks[subj].total} <span className="text-[10px] text-slate-400">/ 100</span></p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${marks[subj].total >= 50 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {marks[subj].total >= 90 ? 'O' : marks[subj].total >= 80 ? 'A+' : marks[subj].total >= 50 ? 'B' : 'U'}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 py-10 text-center text-slate-400 italic">No academic results published yet.</div>
                            )}
                         </div>
                    </section>

                    {/* Attendance Stat */}
                    <div className="col-span-4 space-y-8">
                         <div className="glass-panel p-10 bg-primary-navy text-white text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-navy via-primary-navy to-primary-teal opacity-50"></div>
                            <div className="relative z-10 transition-transform group-hover:scale-105 duration-500">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-8">Current Attendance</h3>
                                <div className="flex justify-center mb-6">
                                    <div className="w-32 h-32 rounded-full border-[10px] border-white/5 flex items-center justify-center relative shadow-inner">
                                        <div className="absolute inset-0 border-[10px] border-primary-teal rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 95%)' }}></div>
                                        <span className="text-4xl font-black italic">95<span className="text-sm not-italic opacity-40">%</span></span>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-primary-teal drop-shadow-lg">EXCELLENT STATUS</p>
                            </div>
                         </div>

                        {/* Recent Alerts */}
                        <div className="glass-panel p-8">
                             <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <AlertTriangle size={16} className="text-amber-500" /> Notifications
                             </h3>
                             <div className="space-y-4">
                                <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-xl relative">
                                    <div className="flex justify-between mb-1">
                                        <p className="text-xs font-black text-amber-700 uppercase">Emergency Info</p>
                                        <Clock size={12} className="text-amber-400" />
                                    </div>
                                    <p className="text-sm font-bold text-amber-900/70 leading-tight">University closed tomorrow due to maintenance protocol.</p>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Message Advisor Section */}
                    <section className="col-span-12 glass-panel p-10 mt-4 border-t-8 border-primary-navy">
                         <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-primary-navy text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-navy/20"><MessageSquare size={24} /></div>
                            <div>
                                <h3 className="text-2xl font-black text-primary-navy">Secure Inbox</h3>
                                <p className="text-sm text-slate-400 font-bold">Direct communication channel with your ward's Institutional Advisor.</p>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase text-slate-400 ml-1">Composition Box</label>
                                <textarea 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl min-h-[150px] outline-none focus:ring-4 focus:ring-primary-teal/10 focus:bg-white focus:border-primary-teal transition-all text-lg tracking-tight font-medium"
                                    placeholder="Type your academic inquiry here..."
                                ></textarea>
                                <button onClick={sendMessage} className="w-full p-5 bg-primary-teal text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-primary-teal/20 hover:bg-black transition-all">
                                    <Send size={20} /> Dispatch Message
                                </button>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase text-slate-400 ml-1 mb-4 flex items-center gap-2">
                                    <Clock size={14} /> Communication History
                                </span>
                                <div className="flex-1 bg-slate-50/50 rounded-3xl border border-slate-100 p-8 flex flex-col items-center justify-center text-slate-400 italic text-center text-sm">
                                    <p>Your previous messages and Advisor responses will appear here once verified by the registrar office.</p>
                                </div>
                            </div>
                         </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ParentDashboard;
