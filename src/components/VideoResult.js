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
          <h2 className="text-lg font-serif leading-snug break-all">{data.title}</h2>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-foreground/40">
            <span className="flex items-center gap-1"><Monitor size={12} /> {data.platform}</span>
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            <span>Premium extraction</span>
          </div>
        </div>
      </div>

      {/* Video Download Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.qualities.map((q, i) => (
          <button
            key={`${q.label}-${i}`}
            onClick={() => handleDownload(q.url, data.title)}
            className={`flex items-center justify-between p-5 rounded-2xl border border-glass-border transition-all hover:bg-accent/5 hover:border-accent/40 active:scale-[0.98] cursor-pointer ${q.default ? 'border-accent/50 bg-accent/5' : ''}`}
          >
            <div className="flex items-center gap-4">
              <Download size={22} className={q.default ? 'text-accent' : 'text-foreground/40'} />
              <div className="text-left">
                <p className="text-sm font-medium tracking-wide uppercase">{q.label}</p>
                <p className="text-[10px] text-foreground/30 font-mono uppercase">{q.size || 'Best Available'}</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-foreground/20" />
          </button>
        ))}
        
        {/* Extract MP3 Button */}
        <button
          onClick={handleExtractMp3}
          disabled={audioLoading}
          className="flex items-center gap-4 p-5 rounded-2xl border border-glass-border hover:bg-accent/5 hover:border-accent/40 transition-all cursor-pointer disabled:opacity-50"
        >
          {audioLoading ? (
            <Loader2 size={22} className="text-accent animate-spin" />
          ) : (
            <Music size={22} className="text-foreground/40" />
          )}
          <div className="text-left">
            <p className="text-sm font-medium tracking-wide uppercase">
              {audioLoading ? "Extracting..." : "Extract MP3"}
            </p>
            <p className="text-[10px] text-foreground/30 font-mono uppercase">
              {audioLoading ? "Processing audio..." : "320kbps audio"}
            </p>
          </div>
        </button>
      </div>

      {/* Audio Result */}
      {audioData && audioData.qualities && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent/60 font-bold">Audio Ready</p>
          {audioData.qualities.map((q, i) => (
            <button
              key={`audio-${i}`}
              onClick={() => handleDownload(q.url, audioData.title)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Music size={18} className="text-accent" />
                <span className="text-sm font-medium tracking-wide uppercase">{q.label}</span>
              </div>
              <ExternalLink size={14} className="text-accent/40" />
            </button>
          ))}
        </motion.div>
      )}

      {audioError && (
        <p className="text-[10px] text-red-400 uppercase tracking-widest">{audioError}</p>
      )}
    </motion.div>
  );
}
