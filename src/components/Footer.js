import { Link as LinkIcon, Download, CheckCircle, Layout } from "lucide-react";
import { FacebookIcon, InstagramIcon, GithubIcon } from "./Icons";

const steps = [
  { icon: LinkIcon, title: "Source", desc: "Acquire the video URL." },
  { icon: Layout, title: "Terminal", desc: "Initialize extraction link." },
  { icon: Download, title: "Synthesis", desc: "Select output parameters." },
  { icon: CheckCircle, title: "Finalize", desc: "Secure the assets locally." }
];

export default function Footer() {
  const socialLinks = {
    facebook: 'https://www.facebook.com/mark.laurence.305159',
    instagram: 'https://www.instagram.com/markrence_31',
    github: 'https://github.com/Zaitonic'
  };

  return (
    <footer className="w-full max-w-6xl mx-auto px-8 py-24 border-t border-glass-border/20 mt-32">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-6 group">
            <div className="p-6 rounded-2xl bg-[#040d0a]/60 border border-glass-border group-hover:border-accent/40 transition-all duration-500 shadow-xl group-hover:shadow-accent/5">
              <step.icon size={26} className="text-accent/70 group-hover:text-accent transition-colors" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.4em] font-semibold text-foreground/70">{step.title}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 leading-relaxed italic">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-16 border-t border-glass-border/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16">
          <div className="flex flex-col gap-4 sm:gap-6 text-center md:text-left w-full md:w-auto">
            <h4 className="text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-accent font-bold opacity-60">Connect</h4>
            <div className="flex items-center justify-center md:justify-start gap-6 sm:gap-8">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-foreground/20 hover:text-accent transition-all transform hover:scale-125 hover:-translate-y-1">
                <FacebookIcon size={20} />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground/20 hover:text-accent transition-all transform hover:scale-125 hover:-translate-y-1">
                <InstagramIcon size={20} />
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-foreground/20 hover:text-accent transition-all transform hover:scale-125 hover:-translate-y-1">
                <GithubIcon size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 text-center w-full md:w-auto">
            <h4 className="text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-accent font-bold opacity-60">Credits</h4>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground/30 font-light">
              Atmospheric synthesis by <a href="https://paraluman.xyz" target="_blank" rel="noopener noreferrer" className="text-accent/60 hover:text-accent hover:underline transition-all">paraluman.xyz</a>
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 text-center md:text-right w-full md:w-auto">
            <h4 className="text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-accent font-bold opacity-60">Engine</h4>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.6em] text-foreground/10 font-mono">
              SocialSaver Core // © {new Date().getFullYear()} MarkRence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
