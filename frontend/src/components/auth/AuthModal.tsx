import { useState } from 'react';
import { useStackApp } from '@stackframe/react';
import { X, Lock, Mail, ArrowRight, Eye, EyeOff, Shield, Clock } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const stackApp = useStackApp();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const result = await stackApp.signInWithCredential({
                    email,
                    password
                });
                if (result.status === 'error') {
                    throw new Error(result.error.message || 'Login failed');
                }
                onClose();
            } else {
                const result = await stackApp.signUpWithCredential({
                    email,
                    password
                });
                if (result.status === 'error') {
                    throw new Error(result.error.message || 'Signup failed');
                }
                onClose();
            }
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = email.trim().length > 2 && password.length >= 6;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="relative z-10 w-full max-w-3xl">
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/40 ring-1 ring-white/10 transition-all duration-300 hover:border-white/20 hover:ring-white/20 shadow-[0_0_40px_rgba(249,115,22,0.35)]">
                    {/* Top hairline */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X size={18} />
                    </button>

                    {/* Split: Image + Form */}
                    <div className="relative flex flex-col sm:flex-row">
                        {/* Image (Left) */}
                        <div className="relative w-full sm:w-1/2 h-48 sm:h-auto">
                            <img
                                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop"
                                alt="Coding background"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/30 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
                                <div className="flex items-center gap-2 text-xs text-white/75">
                                    <Shield className="h-3.5 w-3.5" />
                                    Secure Authentication
                                </div>
                                <span className="text-[11px] text-white/60">Neon Auth</span>
                            </div>
                        </div>

                        {/* Form (Right) */}
                        <div className="p-6 sm:p-8 w-full sm:w-1/2">
                            <div className="mb-6">
                                <h1 className="text-[26px] font-semibold tracking-tight text-white">
                                    {isLogin ? 'Welcome back' : 'Create account'}
                                </h1>
                                <p className="mt-1.5 text-sm text-white/60">
                                    {isLogin ? 'Sign in to continue coding' : 'Join the KodesCruxx community'}
                                </p>
                            </div>

                            {error && (
                                <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm text-white/80">
                                        Email
                                    </label>
                                    <div className="group/input relative flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all hover:border-white/20 focus-within:border-white/25 focus-within:bg-white/[0.07]">
                                        <Mail className="mr-2 h-4.5 w-4.5 text-white/60" />
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@domain.com"
                                            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                                            required
                                        />
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-orange-400/0 transition-all group-focus-within/input:ring-2 group-focus-within/input:ring-orange-400/25"></div>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm text-white/80">
                                        Password
                                    </label>
                                    <div className="group/input relative flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all hover:border-white/20 focus-within:border-white/25 focus-within:bg-white/[0.07]">
                                        <Lock className="mr-2 h-4.5 w-4.5 text-white/60" />
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="ml-2 grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:text-white/90 hover:bg-white/10 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                                        </button>
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-orange-400/0 transition-all group-focus-within/input:ring-2 group-focus-within/input:ring-orange-400/25"></div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                </div>

                                {/* Submit */}
                                <div className="grid gap-3">
                                    <button
                                        type="submit"
                                        disabled={!isFormValid || loading}
                                        className="group relative inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-900/30 outline-none ring-1 ring-orange-400/30 transition-all hover:shadow-orange-900/40 focus-visible:ring-2 focus-visible:ring-orange-300 disabled:cursor-not-allowed disabled:opacity-60 hover:brightness-110"
                                        style={{
                                            background: 'radial-gradient(120% 120% at 0% 0%, rgba(251,146,60,1) 0%, rgba(249,115,22,1) 36%, rgba(251,146,60,0.25) 60%), radial-gradient(120% 120% at 100% 0%, rgba(245,158,11,1) 0%, rgba(251,146,60,0.9) 45%, rgba(245,158,11,0.25) 70%), radial-gradient(140% 140% at 100% 100%, rgba(249,115,22,1) 10%, rgba(234,88,12,1) 45%, rgba(154,52,18,1) 85%)'
                                        }}
                                    >
                                        <span className="absolute inset-0 -z-10 rounded-xl bg-orange-400/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100"></span>
                                        {loading ? (
                                            <div className="h-4.5 w-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                        ) : (
                                            <ArrowRight className="mr-2 h-4.5 w-4.5" />
                                        )}
                                        {isLogin ? 'Sign in' : 'Sign up'}
                                    </button>
                                    <p className="text-center text-xs text-white/55">
                                        {isLogin ? 'New here?' : 'Already have an account?'}{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsLogin(!isLogin)}
                                            className="text-orange-300/90 hover:text-orange-300 underline underline-offset-4"
                                        >
                                            {isLogin ? 'Create an account' : 'Sign in'}
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Bottom footer */}
                    <div className="flex items-center justify-between rounded-b-2xl border-t border-white/10 bg-white/[0.04] px-6 py-3 text-[11px] text-white/55">
                        <div className="flex items-center gap-2">
                            <Shield className="h-3.5 w-3.5" />
                            <span>End-to-end encrypted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Fast & secure</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
