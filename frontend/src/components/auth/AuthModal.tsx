import { useState } from 'react';
import { useStackApp } from '@stackframe/react';
import { Code2, X, Mail, Lock, Github } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const stackApp = useStackApp();

    // Form states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupFirstName, setSignupFirstName] = useState('');
    const [signupLastName, setSignupLastName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await stackApp.signInWithCredential({
                email: loginEmail,
                password: loginPassword
            });
            if (result.status === 'error') {
                throw new Error(result.error.message || 'Login failed');
            }
            onClose();
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
            const result = await stackApp.signUpWithCredential({
                email: signupEmail,
                password: signupPassword
            });
            if (result.status === 'error') {
                throw new Error(result.error.message || 'Signup failed');
            }
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGithubAuth = async () => {
        try {
<<<<<<< HEAD
            await stackApp.signInWithOAuth('github');
=======
            await stackApp.signInWithOAuth({ provider: 'github' });
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
            // Stack Auth will handle the redirect flow automatically
        } catch (err) {
            console.error('GitHub auth error:', err);
            setError('GitHub authentication failed. Please try again.');
        }
    };

    const handleGoogleAuth = async () => {
        try {
<<<<<<< HEAD
            await stackApp.signInWithOAuth('google');
=======
            await stackApp.signInWithOAuth({ provider: 'google' });
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
            // Stack Auth will handle the redirect flow automatically
        } catch (err) {
            console.error('Google auth error:', err);
            setError('Google authentication failed. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            {/* Backdrop */}
            <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Modal Content (Wide) */}
            <div className={`relative w-full max-w-4xl bg-[#0e0e0e] rounded-2xl border border-white/10 shadow-2xl transform transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px] ${isOpen ? 'scale-100' : 'scale-95'}`}>

                {/* Left Side: Visual Section */}
                <div className="hidden md:flex w-1/2 relative overflow-hidden bg-[#050505] flex-col justify-between p-12 border-r border-white/5">
                    <div className="absolute inset-0 z-0">
                        <img src="/images/bc0e3057-c73b-46a1-a617-dceb564857f0_800w.jpg" alt="Auth Banner" className="w-full h-full object-cover opacity-80" />
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

                    {/* Close Button for Desktop */}
                    <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-20 hover:bg-white/10 p-2 rounded-full hidden md:block">
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
                        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-md absolute top-6 right-6 md:hidden">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            onClick={handleGithubAuth}
                            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 transition-colors group"
                        >
                            <Github className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                            <span className="text-sm font-medium text-slate-300 group-hover:text-white">GitHub</span>
                        </button>
                        <button
                            onClick={handleGoogleAuth}
                            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 transition-colors group"
                        >
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
                                    <input
                                        type="email"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                        className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 pl-10 text-sm text-white placeholder-slate-600 outline-none"
                                        placeholder="name@company.com"
                                    />
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
                                    <input
                                        type="password"
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                        className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 pl-10 text-sm text-white placeholder-slate-600 outline-none"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute left-3 top-2.5 text-slate-600 pointer-events-none">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 rounded border border-white/20 bg-white/5"
                                />
                                <label htmlFor="remember" className="text-xs text-slate-400 select-none">Keep me signed in</label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white text-black font-semibold rounded-lg py-2.5 mt-2 hover:bg-slate-200 transition-all active:scale-95 text-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
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
                                    <input
                                        type="text"
                                        value={signupFirstName}
                                        onChange={(e) => setSignupFirstName(e.target.value)}
                                        required
                                        className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-400 mb-1.5 block">Last name</label>
                                    <input
                                        type="text"
                                        value={signupLastName}
                                        onChange={(e) => setSignupLastName(e.target.value)}
                                        required
                                        className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Email address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                        required
                                        className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 pl-10 text-sm text-white placeholder-slate-600 outline-none"
                                        placeholder="name@company.com"
                                    />
                                    <div className="absolute left-3 top-2.5 text-slate-600 pointer-events-none">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        value={signupPassword}
                                        onChange={(e) => setSignupPassword(e.target.value)}
                                        required
                                        minLength={8}
                                        className="w-full bg-[#050505] border border-white/10 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-lg px-3 py-2.5 pl-10 text-sm text-white placeholder-slate-600 outline-none"
                                        placeholder="Create a password"
                                    />
                                    <div className="absolute left-3 top-2.5 text-slate-600 pointer-events-none">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-600 mt-1">Must be at least 8 characters.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg py-2.5 mt-2 hover:opacity-90 transition-all active:scale-95 text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
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
    );
}
