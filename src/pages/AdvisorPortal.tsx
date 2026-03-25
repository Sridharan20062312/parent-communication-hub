import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell, 
  Plus, 
  Search, 
  Download, 
  FileCheck,
  LayoutDashboard,
  MessageSquare,
  GraduationCap,
  Mail,
  Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdvisorPortal: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'manual' | 'excel' | 'pdf' | 'broadcast'>('manual');
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [masterSearch, setMasterSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [markRecords, setMarkRecords] = useState<any>({});

  // Form States
  const [formData, setFormData] = useState({
    regNo: '',
    rollNo: '',
    fullName: '',
    email: '',
    parentEmail: '',
    parentMobile: ''
  });

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('studentEnrollments') || '[]');
    const savedMarks = JSON.parse(localStorage.getItem('staffMarkRecords') || '{}');
    setStudents(savedStudents);
    setMarkRecords(savedMarks);
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent = { ...formData, source: 'Manual' };
    const updated = [...students, newStudent];
    setStudents(updated);
    localStorage.setItem('studentEnrollments', JSON.stringify(updated));
    setFormData({ regNo: '', rollNo: '', fullName: '', email: '', parentEmail: '', parentMobile: '' });
    alert('Student added successfully!');
  };

  const loadMasterRecords = () => {
    const query = masterSearch.trim().toUpperCase();
    const student = students.find(s => s.rollNo.toUpperCase() === query || s.regNo.toUpperCase() === query);
    if (!student) {
      alert('Student not found!');
      setSelectedStudent(null);
      return;
    }
    setSelectedStudent(student);
  };

  const sendWhatsApp = (student: any, subject: string, mark: number) => {
    const message = `📚 *NAMMA GCE Academic Update*\n\nDear Parent,\nYour ward *${student.fullName.toUpperCase()}* has scored *${mark}/100* in the *${subject}* exam.\n\nRegards,\nNAMMA GCE Advisor`;
    const cleanNumber = student.parentMobile.replace(/\D/g, '').replace(/^0+/, '');
    const waNumber = cleanNumber.startsWith('91') ? cleanNumber : '91' + cleanNumber;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-outfit">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-navy text-white flex flex-col fixed inset-y-0 shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-primary-teal rounded-xl flex items-center justify-center text-2xl">🛡️</div>
          <div>
            <h1 className="font-bold text-lg leading-none tracking-tight">NAMMA GCE</h1>
            <p className="text-[10px] opacity-60 uppercase mt-1">Advisor Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <button onClick={() => setActiveTab('manual')} className={`w-full nav-item ${activeTab !== 'broadcast' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Add Students
          </button>
          <button className="w-full nav-item">
            <Users size={18} /> My Students
          </button>
          <button className="w-full nav-item">
            <FileText size={18} /> Enrollments
          </button>
          <button className="w-full nav-item">
            <Calendar size={18} /> Attendance
          </button>
          <div className="pt-4 mt-4 border-t border-white/10">
             <button onClick={() => navigate('/login')} className="w-full nav-item text-red-400 hover:bg-red-500/10">
              <LogOut size={18} /> Log Out
            </button>
          </div>
        </nav>

        <div className="p-4 m-4 glass-panel bg-white/5 border-none flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-teal/20 rounded-full flex items-center justify-center text-primary-teal">👨‍🏫</div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Dr. Peterson</p>
            <p className="text-[10px] opacity-60">CS Academic Advisor</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary-navy">Advisor Dashboard</h2>
            <p className="text-slate-500">Manage student records and academic performance</p>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-500 relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <button className="bg-primary-teal text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary-teal/20">
               <MessageSquare size={18} /> Message Student
             </button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
          {/* Registration Section */}
          <section className="col-span-3 glass-panel p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold">Register New Student</h3>
                <span className="inline-block px-3 py-1 bg-primary-teal/10 text-primary-teal text-[10px] font-bold uppercase rounded-full mt-2 tracking-widest">CS Department</span>
              </div>
              <div className="flex gap-3">
                 <button className="text-xs font-bold text-pink-600 bg-pink-50 px-4 py-2 rounded-lg border border-pink-100 hover:bg-pink-100 transition-all flex items-center gap-2">
                   <FileCheck size={14} /> Open PDF Template
                 </button>
                 <button className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-all flex items-center gap-2">
                   <Download size={14} /> Excel Template
                 </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200 mb-8">
              {['manual', 'excel', 'pdf', 'broadcast'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setActiveTab(t as any)}
                  className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === t ? 'text-primary-teal border-primary-teal' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                >
                  {t === 'broadcast' ? '📢 Broadcast' : t + ' Entry'}
                </button>
              ))}
            </div>

            {activeTab === 'manual' && (
              <form onSubmit={handleManualSubmit} className="grid grid-cols-2 gap-6">
                 <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">Reg No</label>
                    <input 
                      value={formData.regNo}
                      onChange={(e) => setFormData({...formData, regNo: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-teal outline-none transition-all" 
                      placeholder="E.g. 21CS001" 
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">Roll No</label>
                    <input 
                      value={formData.rollNo}
                      onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-teal outline-none" 
                    />
                 </div>
                 <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">Full Name</label>
                    <input 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-teal outline-none" 
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">Parent Mobile</label>
                    <input 
                      value={formData.parentMobile}
                      onChange={(e) => setFormData({...formData, parentMobile: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-teal outline-none" 
                    />
                 </div>
                 <div className="space-y-1 flex items-end">
                    <button type="submit" className="w-full btn-teal h-[50px] flex items-center justify-center gap-2">
                      <Plus size={20} /> Add Student to Roster
                    </button>
                 </div>
              </form>
            )}
            
            {activeTab !== 'manual' && (
              <div className="py-20 flex flex-col items-center justify-center text-slate-300 gap-4 border-2 border-dashed border-slate-200 rounded-2xl">
                 <div className="p-5 bg-slate-50 rounded-full"><Plus size={40} /></div>
                 <p className="font-bold">Feature Coming Soon to React View</p>
              </div>
            )}
          </section>

          {/* Master Records Section */}
          <section className="col-span-3 glass-panel p-8 border-t-4 border-emerald-500">
             <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏦</span>
                  <h3 className="text-xl font-bold">Master Academic Records</h3>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      value={masterSearch}
                      onChange={(e) => setMasterSearch(e.target.value)}
                      placeholder="Search Roll No..." 
                      className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg outline-none text-sm w-56"
                    />
                  </div>
                  <button onClick={loadMasterRecords} className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-emerald-500/20">Load Records</button>
                </div>
             </div>

             {selectedStudent ? (
               <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-emerald-600/60 uppercase">Student Profile</p>
                      <h4 className="text-lg font-bold text-emerald-900">{selectedStudent.fullName} <span className="text-slate-400 font-mono text-sm ml-2">{selectedStudent.regNo}</span></h4>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">Verified Enrollment</span>
                  </div>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left bg-slate-50">
                        <th className="p-4 text-xs font-bold uppercase text-slate-400 tracking-widest">Subject</th>
                        <th className="p-4 text-xs font-bold uppercase text-slate-400 tracking-widest text-center">Score / 100</th>
                        <th className="p-4 text-xs font-bold uppercase text-slate-400 tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                       {Object.keys(markRecords[selectedStudent.rollNo.toUpperCase()] || {}).map((subj) => {
                         const data = markRecords[selectedStudent.rollNo.toUpperCase()][subj];
                         return (
                           <tr key={subj} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                              <td className="p-4 font-bold text-slate-700">{subj}</td>
                              <td className="p-4 text-center">
                                <span className={`px-4 py-1.5 rounded-lg font-bold ${data.total >= 50 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                  {data.total}
                                </span>
                              </td>
                              <td className="p-4 flex justify-end gap-2">
                                <button 
                                  onClick={() => sendWhatsApp(selectedStudent, subj, data.total)}
                                  className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                                  title="Send WhatsApp Update"
                                >
                                  <Smartphone size={16} />
                                </button>
                                <button 
                                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                                  title="Send Email"
                                >
                                  <Mail size={16} />
                                </button>
                              </td>
                           </tr>
                         )
                       })}
                    </tbody>
                  </table>
               </div>
             ) : (
               <div className="py-20 text-center text-slate-400">
                  <p>Enter a student's Roll Number to view their academic transcript.</p>
               </div>
             )}
          </section>

          {/* Student Roster Table */}
          <section className="col-span-3 glass-panel p-8">
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                Master Student Roster 
                <span className="bg-primary-teal/20 text-primary-teal px-2.5 py-0.5 rounded-full text-xs">{filteredStudents.length} Students</span>
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students..." 
                  className="pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl outline-none text-sm w-72"
                />
              </div>
            </div>

            <div className="overflow-hidden border border-slate-200 rounded-2xl">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Reg No</th>
                      <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest tracking-widest">Roll No</th>
                      <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest tracking-widest">Name</th>
                      <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest tracking-widest">Email</th>
                      <th className="p-4 text-[10px] font-bold uppercase text-slate-400 tracking-widest tracking-widest text-right">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-all cursor-pointer" onClick={() => { setMasterSearch(s.rollNo); loadMasterRecords(); }}>
                        <td className="p-4 font-mono text-sm text-primary-navy font-bold">{s.regNo}</td>
                        <td className="p-4 text-sm text-slate-500 font-bold">{s.rollNo}</td>
                        <td className="p-4 text-sm font-bold text-slate-700">{s.fullName}</td>
                        <td className="p-4 text-xs text-slate-400">{s.email}</td>
                        <td className="p-4 text-right">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${s.source === 'Manual' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>{s.source}</span>
                        </td>
                      </tr>
                    ))}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-20 text-center text-slate-400 italic">No students found matching your search.</td>
                      </tr>
                    )}
                  </tbody>
               </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdvisorPortal;
