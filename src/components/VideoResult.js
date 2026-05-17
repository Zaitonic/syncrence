"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Music, Clock, Monitor, ShieldCheck, Loader2, ExternalLink } from "lucide-react";

export default function VideoResult({ data, sourceUrl }) {
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [audioError, setAudioError] = useState("");

  if (!data) return null;

  const handleExtractMp3 = async () => {
    if (!sourceUrl) return;
    setAudioLoading(true);
    setAudioError("");
    setAudioData(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: sourceUrl, mode: "audio" }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to extract audio");
      
      setAudioData(result);
    } catch (err) {
      setAudioError(err.message);
    } finally {
      setAudioLoading(false);
    }
  };

  const handleDownload = (downloadUrl, filename) => {
    // Open in new tab - this triggers the download from the cobalt tunnel
    window.open(downloadUrl, "_blank");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl glass-card p-6 sm:p-10 mt-12 space-y-8 sm:space-y-10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] rounded-full"></div>
      
      <div className="flex flex-col md:flex-row gap-10">
        <div className="relative w-full md:w-80 aspect-video rounded-3xl overflow-hidden border border-glass-border shadow-2xl group">
          <img 
            src={data.thumbnail} 
            alt={data.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 px-4 py-1.5 bg-[#040d0a]/80 backdrop-blur-xl rounded-full text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 text-accent border border-accent/20 font-bold shadow-lg">
            <ShieldCheck size={14} className="animate-pulse" /> VERIFIED ASSET
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#040d0a]/80 backdrop-blur-xl rounded-lg text-[10px] font-mono text-accent/80 border border-accent/10 shadow-lg">
            {data.duration}
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-serif leading-tight tracking-wide text-foreground/90">{data.title}</h2>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-accent/40 font-bold">
            <span className="flex items-center gap-2 px-3 py-1 bg-accent/5 rounded-full border border-accent/10"><Monitor size={14} /> {data.platform}</span>
            <span className="hidden sm:inline italic">High-Fidelity Synthesis</span>
          </div>
        </div>
      </div>

      {/* Video Download Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.qualities.map((q, i) => (
          <button
            key={`${q.label}-${i}`}
            onClick={() => handleDownload(q.url, data.title)}
            className={`group flex items-center justify-between p-6 rounded-3xl border border-glass-border transition-all hover:bg-accent/10 hover:border-accent/40 active:scale-[0.98] cursor-pointer relative overflow-hidden ${q.default ? 'border-accent/30 bg-accent/5 shadow-[0_0_30px_rgba(194,161,94,0.05)]' : ''}`}
          >
            <div className="flex items-center gap-5 relative z-10">
              <div className={`p-3 rounded-2xl ${q.default ? 'bg-accent text-[#040d0a]' : 'bg-accent/10 text-accent'} transition-colors group-hover:bg-accent group-hover:text-[#040d0a]`}>
                <Download size={22} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold tracking-widest uppercase">{q.label}</p>
                <p className="text-[10px] text-foreground/30 font-mono mt-1">{q.size || 'Auto Resolution'}</p>
              </div>
            </div>
            <ExternalLink size={16} className="text-accent/20 group-hover:text-accent/60 transition-colors relative z-10" />
          </button>
        ))}
        
        {/* Extract MP3 Button */}
        <button
          onClick={handleExtractMp3}
          disabled={audioLoading}
          className="group flex items-center gap-5 p-6 rounded-3xl border border-glass-border hover:bg-accent/10 hover:border-accent/40 transition-all cursor-pointer disabled:opacity-50 relative overflow-hidden"
        >
          <div className={`p-3 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-[#040d0a] transition-all`}>
            {audioLoading ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <Music size={22} />
            )}
          </div>
          <div className="text-left relative z-10">
            <p className="text-sm font-bold tracking-widest uppercase">
              {audioLoading ? "Processing" : "Extract Audio"}
            </p>
            <p className="text-[10px] text-foreground/30 font-mono mt-1 uppercase italic">
              {audioLoading ? "Synthesizing frequencies..." : "Lossless 320kbps"}
            </p>
          </div>
        </button>
      </div>

      {/* Audio Result */}
      {audioData && audioData.qualities && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-6 border-t border-glass-border/20"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold opacity-60">Synthesis Complete</p>
          {audioData.qualities.map((q, i) => (
            <button
              key={`audio-${i}`}
              onClick={() => handleDownload(q.url, audioData.title)}
              className="w-full flex items-center justify-between p-5 rounded-2xl border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <Music size={20} className="text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold tracking-widest uppercase text-foreground/80">{q.label}</span>
              </div>
              <div className="flex items-center gap-2 text-accent/40 text-[10px] font-mono tracking-widest">
                READY <ExternalLink size={16} />
              </div>
            </button>
          ))}
        </motion.div>
      )}

      {audioError && (
        <p className="text-[10px] text-red-400 uppercase tracking-[0.2em] font-bold italic">{audioError}</p>
      )}
    </motion.div>
  );
}
