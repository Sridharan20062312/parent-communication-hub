import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, GraduationCap, ChevronRight, RefreshCw } from 'lucide-react';
import logo from '../assets/logo.png';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [studentCaptcha, setStudentCaptcha] = useState('');
    const [parentCaptcha, setParentCaptcha] = useState('');
    const [studentInput, setStudentInput] = useState('');
    const [parentInput, setParentInput] = useState('');

    const generateCaptcha = (type: 'student' | 'parent') => {
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        if (type === 'student') setStudentCaptcha(result);
        else setParentCaptcha(result);
    };

    useEffect(() => {
        generateCaptcha('student');
        generateCaptcha('parent');
    }, []);

    const handleStaffLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const username = (document.getElementById('staff-username') as HTMLInputElement).value;
        if (username === 'admin') navigate('/admin');
        else if (username === 'advisor') navigate('/advisor');
        else navigate('/staff');
    };

    const handleStudentLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (studentInput !== studentCaptcha) {
            alert('Invalid Captcha');
            generateCaptcha('student');
            return;
        }
        navigate('/student');
    };

    const handleParentLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (parentInput !== parentCaptcha) {
            alert('Invalid Captcha');
            generateCaptcha('parent');
            return;
        }
        navigate('/parent');
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            {/* Header Header */}
            <header className="w-full bg-white shadow-md p-6 flex items-center justify-between border-b-4 border-primary-teal">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="GCE Erode Logo" className="w-16 h-16 object-contain" />
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-primary-navy leading-tight">GOVERNMENT COLLEGE OF ENGINEERING</h1>
                        <p className="text-primary-teal font-medium tracking-wide">ERODE - 638 316</p>
                    </div>
                </div>
                <div className="hidden md:block">
                     <img src={logo} alt="GCE" className="w-16 h-16 grayscale opacity-20" />
                </div>
            </header>

            {/* Welcome Banner */}
            <div className="w-full bg-[#f1f3f5] text-center py-2 text-primary-navy font-semibold text-sm uppercase tracking-widest border-b border-[#dee2e6]">
                Welcome to GCE Erode Academic Portal
            </div>

            {/* Main Content Grid */}
            <main className="flex-1 w-full max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                
                {/* Staff Login Card */}
                <div className="glass-panel overflow-hidden border-t-4 border-primary-navy">
                    <div className="bg-primary-navy p-4 text-white flex items-center gap-3">
                        <ShieldCheck size={20} />
                        <h3 className="font-bold uppercase text-sm tracking-widest">Faculty Login</h3>
                    </div>
                    <form onSubmit={handleStaffLogin} className="p-6 space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Staff ID / HOD ID</label>
                            <input 
                                id="staff-username"
                                type="text" 
                                placeholder="Enter Login ID"
                                className="w-full p-2.5 bg-slate-100/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-teal outline-none transition-all"
                                required 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Password</label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="w-full p-2.5 bg-slate-100/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-teal outline-none transition-all"
                                required 
                            />
                        </div>
                        <button type="submit" className="w-full btn-teal mt-2">Login</button>
                        <div className="pt-4 flex flex-col items-center gap-3">
                            <button 
                                onClick={() => navigate('/register')}
                                className="text-primary-teal text-sm font-bold border border-primary-teal/20 px-4 py-2 rounded-lg hover:bg-primary-teal/5 transition-all flex items-center gap-2"
                            >
                                <ChevronRight size={16} /> Register New Faculty
                            </button>
                            <span className="text-[10px] uppercase text-slate-400 font-bold cursor-pointer hover:text-primary-navy" onClick={() => navigate('/admin')}>Admin Access</span>
                        </div>
                    </form>
                </div>

                {/* Student Login Card */}
                <div className="glass-panel overflow-hidden border-t-4 border-primary-teal transform md:-translate-y-4 scale-105 shadow-2xl relative z-10">
                    <div className="bg-primary-teal p-4 text-white flex items-center gap-3">
                        <GraduationCap size={20} />
                        <h3 className="font-bold uppercase text-sm tracking-widest">Student Login</h3>
                    </div>
                    <form onSubmit={handleStudentLogin} className="p-8 space-y-4">
                         <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Register Number</label>
                            <input 
                                type="text" 
                                placeholder="Enter Reg No"
                                className="w-full p-3 bg-slate-100/50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-teal transition-all"
                                required 
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Date of Birth</label>
                            <input 
                                type="text" 
                                placeholder="DD-MM-YYYY"
                                className="w-full p-3 bg-slate-100/50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-teal transition-all"
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-bold uppercase text-slate-500">Enter Captcha</label>
                             <div className="flex gap-2">
                                <input 
                                    className="flex-1 p-3 bg-slate-100/50 border border-slate-200 rounded-xl outline-none"
                                    value={studentInput}
                                    onChange={(e) => setStudentInput(e.target.value)}
                                    required 
                                />
                                <div className="flex items-center gap-3 px-4 bg-slate-200 rounded-xl">
                                    <span className="font-mono text-lg font-bold tracking-widest text-primary-navy select-none italic underline">{studentCaptcha}</span>
                                    <RefreshCw 
                                        size={18} 
                                        className="text-primary-teal cursor-pointer hover:rotate-180 transition-all duration-500" 
                                        onClick={() => generateCaptcha('student')}
                                    />
                                </div>
                             </div>
                        </div>
                        <button type="submit" className="w-full bg-primary-teal text-white p-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black shadow-lg transition-all mt-4">Student Access</button>
                    </form>
                </div>

                {/* Parent Login Card */}
                <div className="glass-panel overflow-hidden border-t-4 border-primary-teal">
                    <div className="bg-primary-teal p-4 text-white flex items-center gap-3">
                        <User size={20} />
                        <h3 className="font-bold uppercase text-sm tracking-widest">Parent Login</h3>
                    </div>
                    <form onSubmit={handleParentLogin} className="p-6 space-y-4">
                         <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-slate-500">Ward's Reg No</label>
                            <input 
                                type="text" 
                                placeholder="Enter Ward's No"
                                className="w-full p-2.5 bg-slate-100/50 border border-slate-200 rounded-lg outline-none"
                                required 
                            />
                        </div>
                        <div className="space-y-1">
                             <label className="text-xs font-bold uppercase text-slate-500">Enter Captcha</label>
                             <div className="flex gap-2">
                                <input 
                                    className="flex-1 p-2.5 bg-slate-100/50 border border-slate-200 rounded-lg outline-none"
                                    value={parentInput}
                                    onChange={(e) => setParentInput(e.target.value)}
                                    required 
                                />
                                <div className="flex items-center gap-2 px-3 bg-slate-200 rounded-lg">
                                    <span className="font-mono font-bold tracking-widest italic">{parentCaptcha}</span>
                                    <RefreshCw size={14} className="text-primary-teal cursor-pointer" onClick={() => generateCaptcha('parent')} />
                                </div>
                             </div>
                        </div>
                        <button type="submit" className="w-full btn-teal mt-2">Login as Parent</button>
                    </form>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="w-full bg-white border-t border-slate-200 p-8 flex flex-col items-center gap-6 mt-12 bg-pattern">
                <p className="text-sm text-slate-500 font-medium tracking-tight">© 2026 Government College of Engineering, Erode. All rights reserved.</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                    {['Sitemap', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map(link => (
                        <a key={link} href="#" className="text-xs font-bold text-slate-400 hover:text-primary-teal transition-all">{link}</a>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default Login;
