import { Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-2 text-sm text-white/40">
                    <span>Built by</span>
                    <span className="font-semibold text-white">ByteBender</span>
                    <a href="https://www.linkedin.com/company/kodescruxx/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors" aria-label="ByteBender's LinkedIn">
                        <Linkedin size={16} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
