import { Link as LinkIcon, Download, CheckCircle, Layout } from "lucide-react";

const steps = [
  { icon: LinkIcon, title: "Source", desc: "Acquire the video URL." },
  { icon: Layout, title: "Terminal", desc: "Initialize extraction link." },
  { icon: Download, title: "Synthesis", desc: "Select output parameters." },
  { icon: CheckCircle, title: "Finalize", desc: "Secure the assets locally." }
];

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-8 py-24 border-t border-glass-border mt-32">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-6 group">
            <div className="p-5 rounded-full bg-glass border border-glass-border group-hover:border-accent transition-all duration-500">
              <step.icon size={24} className="text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-foreground/80">{step.title}</h3>
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 space-y-8 border-t border-glass-border/50 pt-12">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent/60 font-bold flex items-center gap-2">
              <span className="w-4 h-[1px] bg-accent/30"></span> Legal Notice
            </h4>
            <p className="text-[11px] text-foreground/30 uppercase tracking-widest leading-relaxed">
              Respect copyright laws. Downloading or distributing copyrighted works without explicit permission is strictly prohibited by law.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent/60 font-bold flex items-center gap-2">
              <span className="w-4 h-[1px] bg-accent/30"></span> Ethics Protocol
            </h4>
            <p className="text-[11px] text-foreground/30 uppercase tracking-widest leading-relaxed">
              Please use this tool responsibly and ethically. We do not host any content and are not responsible for user actions.
            </p>
          </div>
        </div>

        <div className="text-center pt-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-foreground/20 font-light">
            SocialSaver Protocol // Verified Environment // © {new Date().getFullYear()} MarkRence
          </p>
        </div>
      </div>
    </footer>
  );
}
