"use client";
import { motion } from "framer-motion";
import { Download, Music, Clock, Monitor, ShieldCheck } from "lucide-react";

export default function VideoResult({ data }) {
  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl glass-card p-8 mt-12 space-y-8"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-72 aspect-video rounded-2xl overflow-hidden border border-glass-border">
          <img 
            src={data.thumbnail} 
            alt={data.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] tracking-widest uppercase flex items-center gap-2">
            <ShieldCheck size={12} className="text-accent" /> Verified
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono">
            {data.duration}
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-serif leading-snug">{data.title}</h2>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-foreground/40">
            <span className="flex items-center gap-1"><Monitor size={12} /> {data.platform}</span>
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            <span>Premium extraction</span>
          </div>
          {data.isDemo && (
            <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-xl">
              <p className="text-[10px] text-accent/60 uppercase tracking-widest leading-relaxed">
                Notice: System is in Demo Mode. Connect a private extraction server in settings for live downloads.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.qualities.map((q) => (
          <a
            key={q.label}
            href={q.url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className={`flex items-center justify-between p-5 rounded-2xl border border-glass-border transition-all hover:bg-accent/5 hover:border-accent/40 active:scale-[0.98] ${q.default ? 'border-accent/50 bg-accent/5' : ''}`}
          >
            <div className="flex items-center gap-4">
              <Download size={22} className={q.default ? 'text-accent' : 'text-foreground/40'} />
              <div className="text-left">
                <p className="text-sm font-medium tracking-wide uppercase">{q.label} (MP4)</p>
                <p className="text-[10px] text-foreground/30 font-mono uppercase">{q.size || 'Best Available'}</p>
              </div>
            </div>
          </a>
        ))}
        
        {/* If audio quality is present, we show it here, otherwise mock it */}
        <a 
          href={data.qualities.find(q => q.label === "Audio")?.url || data.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex items-center gap-4 p-5 rounded-2xl border border-glass-border hover:bg-accent/5 hover:border-accent/40 transition-all"
        >
          <Music size={22} className="text-foreground/40" />
          <div className="text-left">
            <p className="text-sm font-medium tracking-wide uppercase">Extract MP3</p>
            <p className="text-[10px] text-foreground/30 font-mono uppercase">Lossless audio</p>
          </div>
        </a>
      </div>
    </motion.div>
  );
}
