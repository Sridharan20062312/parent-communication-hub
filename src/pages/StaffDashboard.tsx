import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Save, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StaffDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState<any[]>([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [markEntries, setMarkEntries] = useState<any>({});
    const [searchQuery, setSearchQuery] = useState('');

    const subjects = [
        "Algorithm Analysis (CS3401)",
        "Database Management (CS3401)",
        "Theory of Computation (CS3452)",
        "Operating Systems (CS3451)",
        "Environmental Science (GE3451)",
        "AI & Machine Learning (CS3491)"
    ];

    useEffect(() => {
        const savedStudents = JSON.parse(localStorage.getItem('studentEnrollments') || '[]');
        setStudents(savedStudents);
        const savedMarks = JSON.parse(localStorage.getItem('staffMarkRecords') || '{}');
        setMarkEntries(savedMarks);
    }, []);

    const handleMarkChange = (rollNo: string, field: 'internal' | 'lab', value: string) => {
        const numVal = parseInt(value) || 0;
        const max = field === 'internal' ? 60 : 40;
        if (numVal > max) return;

        setMarkEntries((prev: any) => {
            const studentMarks = prev[rollNo] || {};
            const subjectMarks = studentMarks[selectedSubject] || { internal: 0, lab: 0, total: 0 };
            
            const updatedSubject = { 
                ...subjectMarks, 
                [field]: numVal,
                total: field === 'internal' ? numVal + subjectMarks.lab : numVal + subjectMarks.internal
            };

            const updatedStudent = { ...studentMarks, [selectedSubject]: updatedSubject };
            return { ...prev, [rollNo]: updatedStudent };
        });
    };

    const saveMarks = () => {
        if (!selectedSubject) {
            alert('Please select a subject first!');
            return;
        }
        localStorage.setItem('staffMarkRecords', JSON.stringify(markEntries));
        alert('Marks saved successfully! 🚀');
    };

    const filteredStudents = students.filter(s => 
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f1f3f5] flex">
            {/* Sidebar (Minimal) */}
            <aside className="w-20 bg-primary-navy flex flex-col items-center py-8 gap-8 shadow-xl">
                 <div className="w-12 h-12 bg-primary-teal rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-primary-teal/20">🎓</div>
                 <nav className="flex flex-col gap-6">
                    <button className="p-3 bg-primary-teal/20 text-primary-teal rounded-xl shadow-inner"><LayoutDashboard size={24} /></button>
                    <button className="p-3 text-white/40 hover:text-white transition-all"><ClipboardList size={24} /></button>
                 </nav>
                 <button onClick={() => navigate('/login')} className="mt-auto p-3 text-red-400 hover:bg-red-500/10 rounded-xl"><LogOut size={24} /></button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                   <div>
                     <span className="text-xs font-bold uppercase text-primary-teal tracking-widest">Faculty Dashboard</span>
                     <h2 className="text-4xl font-bold text-primary-navy mt-1 tracking-tight">Academic Performance Unit</h2>
                   </div>
                   <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
                      <div className="px-4 py-2 border-r border-slate-100">
                        <p className="text-[10px] font-bold uppercase text-slate-400">Term</p>
                        <p className="text-sm font-bold">Spring 2026</p>
                      </div>
                      <div className="px-4 py-2">
                         <p className="text-[10px] font-bold uppercase text-slate-400">Faculty</p>
                         <p className="text-sm font-bold">CS Dept.</p>
                      </div>
                   </div>
                </header>

                <div className="grid grid-cols-4 gap-8">
                    {/* Controls Card */}
                    <div className="col-span-1 space-y-6">
                        <section className="glass-panel p-6 border-t-4 border-primary-navy">
                            <h3 className="text-sm font-bold uppercase text-slate-400 mb-6 flex items-center gap-2 tracking-widest">
                                <ChevronRight size={14} className="text-primary-teal" /> Configuration
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-slate-500 ml-1">Subject Title</label>
                                    <select 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-teal text-sm font-medium"
                                        value={selectedSubject}
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                    >
                                        <option value="">Select a Subject...</option>
                                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="relative pt-2">
                                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                                    <input 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search student..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="p-6 bg-primary-navy text-white rounded-3xl space-y-6 shadow-2xl shadow-primary-navy/20 relative overflow-hidden group">
                           <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-teal/20 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
                           <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">Status Overview</h3>
                           <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary-teal"><CheckCircle2 size={20} /></div>
                                 <div><p className="text-lg font-bold">100%</p><p className="text-[10px] opacity-60 uppercase">Sync Status</p></div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-400"><AlertCircle size={20} /></div>
                                 <div><p className="text-lg font-bold">OFFLINE</p><p className="text-[10px] opacity-60 uppercase">Cloud Link</p></div>
                              </div>
                           </div>
                           <button onClick={saveMarks} className="w-full bg-primary-teal text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-primary-teal/20">
                              <Save size={20} /> Submit Records
                           </button>
                        </section>
                    </div>

                    {/* Marks Table Card */}
                    <div className="col-span-3 glass-panel p-8 min-h-[600px] border-t-4 border-primary-teal">
                         <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-primary-navy flex items-center gap-2">
                                Attendance & Performance Matrix
                                <span className="bg-slate-100 text-slate-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ml-4">60/40 Split</span>
                            </h3>
                            <div className="text-[10px] space-x-6 text-slate-400 font-bold uppercase tracking-widest">
                                <span>I1: Internal (60)</span>
                                <span>L1: Lab/Pract (40)</span>
                            </div>
                         </div>

                         {!selectedSubject ? (
                            <div className="flex flex-col items-center justify-center h-96 text-slate-300">
                                <ClipboardList size={64} className="mb-4 opacity-20" />
                                <p className="font-bold text-lg">Select a Academic Subject to begin mark entry</p>
                                <p className="text-sm">Real-time validation will be applied to all inputs</p>
                            </div>
                         ) : (
                            <table className="w-full text-left">
                                <thead className="bg-[#f8f9fa] border-b-2 border-slate-100">
                                    <tr>
                                        <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Roll No</th>
                                        <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Name</th>
                                        <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest text-center">Internal (60)</th>
                                        <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest text-center">Lab (40)</th>
                                        <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest text-right">Agg. 100</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((s) => {
                                        const entry = (markEntries[s.rollNo] || {})[selectedSubject] || { internal: 0, lab: 0, total: 0 };
                                        return (
                                            <tr key={s.rollNo} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                                                <td className="p-4 font-mono font-bold text-slate-400">{s.rollNo}</td>
                                                <td className="p-4">
                                                   <p className="font-bold text-slate-700 tracking-tight">{s.fullName}</p>
                                                   <p className="text-[10px] text-slate-400">{s.email}</p>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <input 
                                                        type="number"
                                                        max="60"
                                                        className="w-20 p-2.5 bg-slate-100/50 border border-slate-200 rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-primary-teal focus:bg-white transition-all transition-all"
                                                        value={entry.internal}
                                                        onChange={(e) => handleMarkChange(s.rollNo, 'internal', e.target.value)}
                                                    />
                                                </td>
                                                <td className="p-4 text-center">
                                                    <input 
                                                        type="number"
                                                        max="40"
                                                        className="w-20 p-2.5 bg-slate-100/50 border border-slate-200 rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-primary-teal focus:bg-white transition-all transition-all"
                                                        value={entry.lab}
                                                        onChange={(e) => handleMarkChange(s.rollNo, 'lab', e.target.value)}
                                                    />
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${entry.total >= 50 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                        {entry.total} / 100
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                         )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StaffDashboard;
