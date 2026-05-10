"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoResult from "@/components/VideoResult";
import Footer from "@/components/Footer";
import { SupportedPlatforms } from "@/components/Platforms";

// Custom SVG Icons for User Socials
const FacebookIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const socialLinks = {
    facebook: 'https://www.facebook.com/mark.laurence.305159',
    instagram: 'https://www.instagram.com/markrence_31',
    github: 'https://github.com/Zaitonic'
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownload = async (e) => {
    e?.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch video");
      setVideoData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Moving Background */}
      <motion.div 
        className="background-wrapper"
        animate={{ x: mousePos.x, y: mousePos.y, scale: 1.15 }}
        transition={{ type: 'tween', ease: 'linear', duration: 2 }}
      >
        <motion.div 
          className="background-image"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 0.5, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="background-overlay"></div>

      {/* Splash Screen */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5 }}
          >
            <div className="flex flex-col items-center gap-12 text-center">
              <motion.div 
                className="w-64 h-64 cutout-effect"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </motion.div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif tracking-widest text-accent uppercase">SyncRence</h2>
                <motion.button 
                  onClick={() => setIsEntered(true)}
                  className="accent-button px-12 py-4 rounded-full text-lg tracking-[0.3em] font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  ENTER
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center">
        <Navbar />

        <section className="w-full max-w-5xl px-6 pt-40 pb-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-8 mb-16"
          >
            <div className="space-y-2">
              <h1 className="text-6xl md:text-9xl font-serif tracking-tight leading-none uppercase">
                Social<span className="text-accent">Saver</span>
              </h1>
              <p className="text-lg text-foreground/50 max-w-xl mx-auto uppercase tracking-widest font-light">
                Premium Extraction Engine // by MarkRence
              </p>
            </div>

            <div className="flex items-center justify-center gap-10 text-foreground/30">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all transform hover:scale-110">
                <FacebookIcon />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all transform hover:scale-110">
                <InstagramIcon />
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all transform hover:scale-110">
                <GithubIcon />
              </a>
            </div>
          </motion.div>

          <form 
            onSubmit={handleDownload}
            className="w-full max-w-3xl flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20" size={20} />
              <input 
                type="text"
                placeholder="Paste video link here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="accent-input w-full pl-14 pr-6 py-5 text-lg glass-card !rounded-full"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="accent-button px-10 py-5 rounded-full flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Download <ArrowRight size={20} /></>}
            </button>
          </form>

          {/* Social Media Ticker (Animated like News) */}
          <div className="social-ticker-container mt-16 max-w-2xl opacity-20 hover:opacity-100 transition-opacity duration-700">
            <div className="social-ticker-content">
              {[...SupportedPlatforms, ...SupportedPlatforms].map((Platform, i) => (
                <div key={i} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all">
                  <Platform.icon />
                  <span className="text-[10px] uppercase tracking-widest font-bold">{Platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex items-center gap-2 text-accent/80 bg-accent/5 px-6 py-4 rounded-full border border-accent/20"
              >
                <AlertCircle size={20} />
                <span className="text-sm tracking-wide">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <VideoResult data={videoData} />

          {loading && !videoData && (
            <div className="mt-20 flex flex-col items-center gap-6 text-accent/40 uppercase tracking-[0.2em] text-sm">
              <Loader2 className="animate-spin" size={48} />
              <p className="animate-pulse">Accessing Terminal...</p>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
