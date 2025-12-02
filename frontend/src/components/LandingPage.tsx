import { useState, useEffect, useRef } from 'react';
import {
    Code2,
    Bug,
    Users,
    Sparkles,
    Shield,
    ArrowRight,
    Menu,
    X,
<<<<<<< HEAD
    ChevronDown
} from 'lucide-react';
import AuthModal from './auth/AuthModal';
=======
    Mail,
    Lock,
    ChevronDown,
    Github
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)

interface LandingPageProps {
    onNavigate?: (page: 'landing' | 'features' | 'pricing' | 'how-it-works' | 'changelog' | 'docs' | 'about' | 'blog' | 'careers' | 'contact') => void;
}


<<<<<<< HEAD
export default function LandingPage({ onNavigate }: LandingPageProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Custom auth handlers - show modal instead of redirecting
    const handleSignup = () => {
        setIsAuthModalOpen(true);
    };

    const handleLogin = () => {
        setIsAuthModalOpen(true);
    };
=======
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function LandingPage({ onNavigate }: LandingPageProps) {
    const { login: authLogin } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [isScrolled, setIsScrolled] = useState(false);

    // Form states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupFirstName, setSignupFirstName] = useState('');
    const [signupLastName, setSignupLastName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)

    const scrollSectionRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const customCursorRef = useRef<HTMLDivElement>(null);

    // Navbar Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Custom Cursor Logic
    useEffect(() => {
        const cursor = customCursorRef.current;
        if (!cursor) return;

        const moveCursor = (e: MouseEvent) => {
            cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
        };

        const handleMouseEnter = () => {
            cursor.classList.add('scale-[2.5]', 'bg-orange-500');
            cursor.classList.remove('mix-blend-difference');
        };

        const handleMouseLeave = () => {
            cursor.classList.remove('scale-[2.5]', 'bg-orange-500');
            cursor.classList.add('mix-blend-difference');
        };

        document.addEventListener('mousemove', moveCursor);

        const interactives = document.querySelectorAll('a, button, input');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            interactives.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
<<<<<<< HEAD
    }, [isMobileMenuOpen]);
=======
    }, [isMobileMenuOpen, isAuthModalOpen]);
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)

    // Horizontal Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1024 || !scrollSectionRef.current || !scrollTrackRef.current) return;

            const section = scrollSectionRef.current;
            const track = scrollTrackRef.current;

            const stickyTop = section.offsetTop;
            const stickyHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            const start = stickyTop;
            const end = stickyTop + stickyHeight - windowHeight;

            let progress = (scrollY - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));

            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxTranslate = trackWidth - viewportWidth;

            const translateX = -(progress * maxTranslate);
            track.style.transform = `translateX(${translateX}px)`;
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
    };

<<<<<<< HEAD
=======
    // Form handlers
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const formData = new URLSearchParams();
            formData.append('username', loginEmail);
            formData.append('password', loginPassword);

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();

            // Use AuthContext login method
            authLogin(data.access_token);

            // Close modal - AuthContext will handle navigation
            setIsAuthModalOpen(false);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: signupEmail,
                    password: signupPassword,
                    first_name: signupFirstName,
                    last_name: signupLastName,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Signup failed');
            }

            const data = await response.json();

            // Use AuthContext login method
            authLogin(data.access_token);

            // Close modal - AuthContext will handle navigation
            setIsAuthModalOpen(false);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    const openAuthModal = (mode: 'login' | 'signup') => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
        document.body.style.overflow = '';
    };

>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
    return (
        <div className="text-slate-400 selection:bg-orange-500/30 selection:text-white antialiased">

            {/* Custom Cursor Element */}
            <div
                ref={customCursorRef}
                id="custom-cursor"
                className="w-4 h-4 rounded-full bg-white hidden md:block fixed pointer-events-none z-[9999] top-0 left-0 mix-blend-difference transition-transform duration-100 ease-out"
            ></div>

            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
                    ? 'bg-[#050505]/80 backdrop-blur-md border-white/5 py-4'
                    : 'border-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.8)] transition-all duration-500">
                            <Code2 className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-white group-hover:text-orange-100 transition-colors">KodesCruxx</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => onNavigate?.('features')} className="text-sm font-medium hover:text-white transition-colors">Features</button>
                        <button onClick={() => onNavigate?.('how-it-works')} className="text-sm font-medium hover:text-white transition-colors">How it Works</button>
                        <button onClick={() => onNavigate?.('pricing')} className="text-sm font-medium hover:text-white transition-colors">Pricing</button>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
<<<<<<< HEAD
                        <button onClick={handleLogin} className="text-sm font-mono hover:text-white transition-colors">Log In</button>
                        <button onClick={handleSignup} className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95">
=======
                        <button onClick={() => openAuthModal('login')} className="text-sm font-mono hover:text-white transition-colors">Log In</button>
                        <button onClick={() => openAuthModal('signup')} className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95">
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
                            Get Started
                        </button>
                    </div>

                    <button onClick={toggleMobileMenu} className="md:hidden text-white hover:text-orange-500 transition-colors">
                        <Menu />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-[#050505] pt-24 px-6 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex flex-col gap-8 text-2xl font-semibold tracking-tight text-white">
                    <button onClick={() => { toggleMobileMenu(); onNavigate?.('features'); }} className="text-left hover:text-orange-500">Features</button>
                    <button onClick={() => { toggleMobileMenu(); onNavigate?.('how-it-works'); }} className="text-left hover:text-orange-500">How it Works</button>
                    <button onClick={() => { toggleMobileMenu(); onNavigate?.('pricing'); }} className="text-left hover:text-orange-500">Pricing</button>
                    <hr className="border-white/10" />
<<<<<<< HEAD
                    <button onClick={() => { toggleMobileMenu(); handleLogin(); }} className="text-left text-orange-500 font-mono text-lg">Log In</button>
                    <button onClick={() => { toggleMobileMenu(); handleSignup(); }} className="text-left text-lg">Get Started</button>
=======
                    <button onClick={() => { toggleMobileMenu(); openAuthModal('login'); }} className="text-left text-orange-500 font-mono text-lg">Log In</button>
                    <button onClick={() => { toggleMobileMenu(); openAuthModal('signup'); }} className="text-left text-lg">Get Started</button>
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
                </div>
                <button onClick={toggleMobileMenu} className="absolute top-6 right-6 text-white">
                    <X />
                </button>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

                {/* Animated Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-blob-bounce pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-blob-bounce pointer-events-none" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                        <span className="text-xs font-mono uppercase tracking-widest text-orange-400">Nomad Neural V4</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-8 text-white animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Master Coding with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
                            AI Intelligence
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Experience the future of development. Real-time collaboration, smart debugging, and instant code generation—all in one powerful platform.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
<<<<<<< HEAD
                        <button onClick={handleSignup} className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
=======
                        <button onClick={() => openAuthModal('signup')} className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
                            <span className="relative z-10 flex items-center gap-2">
                                Start Coding Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-slate-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                        </button>

<<<<<<< HEAD
                        <button onClick={handleSignup} className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
=======
                        <button onClick={() => openAuthModal('signup')} className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
                            View Demo
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 opacity-50">
                    <ChevronDown className="w-6 h-6" />
                </div>
            </section>

            {/* Horizontal Scroll Section (Features) */}
            <div ref={scrollSectionRef} id="scroll-section" className="relative bg-[#050505] hidden lg:block h-[400vh]">
                <div className="sticky-wrapper flex items-center">
                    <div ref={scrollTrackRef} id="scroll-track" className="flex gap-8 px-20 w-max will-change-transform">

                        {/* Title Card */}
                        <div className="w-[40vw] shrink-0 pr-20 flex flex-col justify-center">
                            <h2 className="text-6xl font-semibold tracking-tight mb-6 text-white">Powerful <br /> Features</h2>
                            <p className="text-xl text-slate-400 max-w-md">Everything you need to build faster, smarter, and better than ever before.</p>
                        </div>

                        {/* Feature 1 */}
                        <div className="w-[400px] h-[500px] glass-card rounded-3xl p-10 flex flex-col justify-between shrink-0 hover:border-blue-500/30 transition-all group hover:-translate-y-2 duration-300">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-blue-500/20">
                                    <Code2 className="w-8 h-8 text-blue-500" />
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight mb-4 text-white">AI Code Explanation</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">Understand complex code snippets instantly with detailed, human-readable explanations.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors">
                                Explore <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="w-[400px] h-[500px] glass-card rounded-3xl p-10 flex flex-col justify-between shrink-0 hover:border-red-500/30 transition-all group hover:-translate-y-2 duration-300">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-red-500/20">
                                    <Bug className="w-8 h-8 text-red-500" />
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight mb-4 text-white">Smart Debugging</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">Identify and fix bugs in seconds with intelligent analysis and automated solution suggestions.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-slate-500 group-hover:text-red-400 transition-colors">
                                Explore <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="w-[400px] h-[500px] glass-card rounded-3xl p-10 flex flex-col justify-between shrink-0 hover:border-violet-500/30 transition-all group hover:-translate-y-2 duration-300">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-violet-500/20">
                                    <Users className="w-8 h-8 text-violet-500" />
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight mb-4 text-white">Real-time Collab</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">Code together with your team in real-time rooms with synchronized editing and integrated chat.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-slate-500 group-hover:text-violet-400 transition-colors">
                                Explore <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="w-[400px] h-[500px] glass-card rounded-3xl p-10 flex flex-col justify-between shrink-0 hover:border-purple-500/30 transition-all group hover:-translate-y-2 duration-300">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-purple-500/20">
                                    <Sparkles className="w-8 h-8 text-purple-500" />
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight mb-4 text-white">Code Generation</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">Generate production-ready code from natural language descriptions in multiple languages.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-slate-500 group-hover:text-purple-400 transition-colors">
                                Explore <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Feature 5 */}
                        <div className="w-[400px] h-[500px] glass-card rounded-3xl p-10 flex flex-col justify-between shrink-0 hover:border-emerald-500/30 transition-all group hover:-translate-y-2 duration-300">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-emerald-500/20">
                                    <Shield className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight mb-4 text-white">Secure & Private</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">Your code and data are protected with enterprise-grade security and end-to-end encryption.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-slate-500 group-hover:text-emerald-400 transition-colors">
                                Explore <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Spacer at end */}
                        <div className="w-[20vw] shrink-0"></div>
                    </div>
                </div>
            </div>

            {/* Mobile Features Grid (Fallback) */}
            <div className="lg:hidden py-24 px-6 bg-[#050505]">
                <h2 className="text-4xl font-semibold tracking-tight mb-12 text-center text-white">Powerful Features</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Mobile Feature Items */}
                    <div className="glass-card rounded-2xl p-8 border border-white/5">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                            <Code2 className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight mb-3 text-white">AI Code Explanation</h3>
                        <p className="text-slate-400">Understand complex code snippets instantly with detailed explanations.</p>
                    </div>

                    <div className="glass-card rounded-2xl p-8 border border-white/5">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                            <Bug className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight mb-3 text-white">Smart Debugging</h3>
                        <p className="text-slate-400">Identify and fix bugs in seconds with intelligent analysis.</p>
                    </div>

                    <div className="glass-card rounded-2xl p-8 border border-white/5">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6 border border-violet-500/20">
                            <Users className="w-6 h-6 text-violet-500" />
                        </div>
                        <h3 className="text-2xl font-semibold tracking-tight mb-3 text-white">Real-time Collab</h3>
                        <p className="text-slate-400">Code together with your team in real-time rooms.</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/5 pointer-events-none"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 text-white">Ready to start?</h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Join thousands of developers building the future with KodesCruxx.</p>
<<<<<<< HEAD
                    <button onClick={handleSignup} className="px-10 py-5 bg-orange-500 text-white rounded-full font-semibold text-xl hover:bg-orange-600 transition-all shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] transform hover:-translate-y-1">
=======
                    <button onClick={() => openAuthModal('signup')} className="px-10 py-5 bg-orange-500 text-white rounded-full font-semibold text-xl hover:bg-orange-600 transition-all shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)] transform hover:-translate-y-1">
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
                        Get Started for Free
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black pt-24 pb-12 overflow-hidden relative border-t border-white/5">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center">
                                    <Code2 className="text-white w-6 h-6" />
                                </div>
                                <span className="text-2xl font-semibold tracking-tight text-white">KodesCruxx</span>
                            </div>
                            <p className="text-slate-400 max-w-md text-lg leading-relaxed">
                                Empowering developers with AI-driven tools to write, debug, and understand code faster than ever before.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6 tracking-wide">Product</h4>
                            <ul className="space-y-4 text-slate-500 text-sm">
                                <li><button onClick={() => onNavigate?.('features')} className="hover:text-orange-500 transition-colors">Features</button></li>
                                <li><button onClick={() => onNavigate?.('pricing')} className="hover:text-orange-500 transition-colors">Pricing</button></li>
                                <li><button onClick={() => onNavigate?.('changelog')} className="hover:text-orange-500 transition-colors">Changelog</button></li>
                                <li><button onClick={() => onNavigate?.('docs')} className="hover:text-orange-500 transition-colors">Docs</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-6 tracking-wide">Company</h4>
                            <ul className="space-y-4 text-slate-500 text-sm">
                                <li><button onClick={() => onNavigate?.('about')} className="text-orange-500 text-base font-extrabold hover:text-orange-400 transition-colors flex items-center gap-2">About <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></span></button></li>
                                <li><button onClick={() => onNavigate?.('blog')} className="hover:text-orange-500 transition-colors">Blog</button></li>
                                <li><button onClick={() => onNavigate?.('careers')} className="hover:text-orange-500 transition-colors">Careers</button></li>
                                <li><button onClick={() => onNavigate?.('contact')} className="hover:text-orange-500 transition-colors">Contact</button></li>
                            </ul>
                        </div>
                    </div>

                    {/* Big Typography Footer */}
                    <div className="relative border-t border-white/5 pt-12">
                        <h1 className="text-[12vw] leading-none font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none pointer-events-none text-center">
                            KODESCRUXX
                        </h1>

                        <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-6">
                            <p className="text-slate-600 font-mono text-xs">
                                © 2025 KodesCruxx Inc. All rights reserved.
                            </p>

                            <div className="flex items-center gap-6">
<<<<<<< HEAD
                                <a href="https://www.linkedin.com/in/palak-soni-292280288/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-500 transition-colors flex items-center gap-2">
                                    <span className="text-xs font-mono tracking-widest">BUILT BY AND FOUNDED BY PALAK SONI</span>
=======
                                <a href="https://www.linkedin.com/company/kodescruxx/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-500 transition-colors flex items-center gap-2">
                                    <span className="text-xs font-mono tracking-widest">BUILT BY BYTEBENDER</span>
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

<<<<<<< HEAD
            {/* Auth Modal */}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
=======
            {/* REDESIGNED SPLIT-LAYOUT AUTH MODAL */}
            <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${isAuthModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {/* Backdrop */}
                <div onClick={closeAuthModal} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                {/* Modal Content (Wide) */}
                <div className={`relative w-full max-w-4xl bg-[#0e0e0e] rounded-2xl border border-white/10 shadow-2xl transform transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px] ${isAuthModalOpen ? 'scale-100' : 'scale-95'}`}>

                    {/* Left Side: Visual Section (CSS-only Composition) */}
                    {/* Left Side: Visual Section */}
                    <div className="hidden md:flex w-1/2 relative overflow-hidden bg-[#050505] flex-col justify-between p-12 border-r border-white/5">
                        <div className="absolute inset-0 z-0">
                            <img src="/images/auth-banner.jpg" alt="Auth Banner" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                        </div>

                        {/* Quote / Bottom Text */}
                        <div className="relative z-10 mt-auto">
                            <blockquote className="text-xl font-medium text-white mb-2 leading-relaxed">
                                "The best way to predict the future is to invent it."
                            </blockquote>
                            <cite className="text-sm font-mono text-slate-500 not-italic tracking-wide block uppercase">
                                — Built for Builders
                            </cite>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center relative z-10 bg-[#0e0e0e]">

                        {/* Close Button for Desktop (Moved here) */}
                        <button onClick={closeAuthModal} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-20 hover:bg-white/10 p-2 rounded-full hidden md:block">
                            <X className="w-6 h-6" />
                        </button>

                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                        <Code2 className="text-white w-3 h-3" />
                                    </div>
                                    <span className="font-semibold tracking-tight text-white">KodesCruxx</span>
                                </div>
                                <h2 className="text-2xl font-semibold text-white tracking-tight">
                                    {authMode === 'login' ? 'Welcome back' : 'Create account'}
                                </h2>
                            </div>
                            <button onClick={closeAuthModal} className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-md absolute top-6 right-6 md:hidden">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Social Auth */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/github/login`} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 transition-colors group">
                                <Github className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">GitHub</span>
                            </button>
                            <button onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/google/login`} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 transition-colors group">
                                <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
                                </svg>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Google</span>
                            </button>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0e0e0e] px-2 text-slate-500 font-medium tracking-wider">Or continue with</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        {authMode === 'login' && (
                            <form className="space-y-4" onSubmit={handleLogin}>
                                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-2 rounded-lg">{error}</div>}
                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1.5 block">Email address</label>
                                    <div className="relative">
                                        <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 pl-10 text-sm text-white placeholder-slate-600 outline-none" placeholder="name@company.com" />
                                        <div className="absolute left-3 top-2.5 text-slate-600 pointer-events-none">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-xs font-medium text-slate-400">Password</label>
                                        <a href="#" className="text-xs text-orange-500 hover:text-orange-400 hover:underline">Forgot password?</a>
                                    </div>
                                    <div className="relative">
                                        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 pl-10 text-sm text-white placeholder-slate-600 outline-none" placeholder="••••••••" />
                                        <div className="absolute left-3 top-2.5 text-slate-600 pointer-events-none">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                    <button type="button" role="checkbox" className="w-4 h-4 rounded border border-white/20 bg-white/5 flex items-center justify-center hover:border-orange-500/50 transition-colors group" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-orange-500 opacity-0 group-[.active]:opacity-100 transition-opacity"></div>
                                    </button>
                                    <span className="text-xs text-slate-400 select-none">Keep me signed in</span>
                                </div>

                                <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-semibold rounded-lg py-2.5 mt-2 hover:bg-slate-200 transition-all active:scale-95 text-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </button>

                                <p className="text-center text-xs text-slate-500 mt-4">
                                    Don't have an account? <button type="button" onClick={() => setAuthMode('signup')} className="text-orange-500 hover:underline font-medium">Sign up</button>
                                </p>
                            </form>
                        )}

                        {/* Sign Up Form */}
                        {authMode === 'signup' && (
                            <form className="space-y-4" onSubmit={handleSignup}>
                                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-2 rounded-lg">{error}</div>}
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-medium text-slate-400 mb-1.5 block">First name</label>
                                        <input type="text" value={signupFirstName} onChange={(e) => setSignupFirstName(e.target.value)} required className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-400 mb-1.5 block">Last name</label>
                                        <input type="text" value={signupLastName} onChange={(e) => setSignupLastName(e.target.value)} required className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none" placeholder="Doe" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1.5 block">Email address</label>
                                    <div className="relative">
                                        <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 pl-10 text-sm text-white placeholder-slate-600 outline-none" placeholder="name@company.com" />
                                        <div className="absolute left-3 top-2.5 text-slate-600 pointer-events-none">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1.5 block">Password</label>
                                    <div className="relative">
                                        <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required minLength={8} className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 pl-10 text-sm text-white placeholder-slate-600 outline-none" placeholder="Create a password" />
                                        <div className="absolute left-3 top-2.5 text-slate-600 pointer-events-none">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-600 mt-1">Must be at least 8 characters.</p>
                                </div>

                                <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg py-2.5 mt-2 hover:opacity-90 transition-all active:scale-95 text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </button>

                                <p className="text-center text-xs text-slate-500 mt-4">
                                    Already have an account? <button type="button" onClick={() => setAuthMode('login')} className="text-orange-500 hover:underline font-medium">Log in</button>
                                </p>
                            </form>
                        )}

                        {/* Small Footer inside Form */}
                        <div className="mt-auto pt-6 border-t border-white/5 text-center md:text-left">
                            <p className="text-[10px] text-slate-600">
                                By continuing, you agree to our <a href="#" className="hover:text-slate-400 transition-colors">Terms</a> and <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
    );
}
