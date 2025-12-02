import { Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-2 text-sm text-white/40">
<<<<<<< HEAD
                    <span>Built by and Founded by</span>
                    <span className="font-semibold text-white">Palak Soni</span>
                    <a href="https://www.linkedin.com/in/palak-soni-292280288/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors" aria-label="Palak Soni's LinkedIn">
=======
                    <span>Built by</span>
                    <span className="font-semibold text-white">ByteBender</span>
                    <a href="https://www.linkedin.com/company/kodescruxx/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors" aria-label="ByteBender's LinkedIn">
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
                        <Linkedin size={16} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
