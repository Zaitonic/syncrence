"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoResult from "@/components/VideoResult";
import Footer from "@/components/Footer";
import { SupportedPlatforms } from "@/components/Platforms";

import { FacebookIcon, InstagramIcon, GithubIcon } from "@/components/Icons";

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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#040d0a]"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "circOut" }}
          >
            <div className="flex flex-col items-center gap-12 text-center">
              <motion.div 
                className="w-48 h-48 sm:w-72 sm:h-72 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <div className="absolute inset-0 bg-accent/20 blur-[40px] sm:blur-[60px] rounded-full animate-pulse"></div>
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover relative z-10 brightness-[1.2] contrast-[1.1]" />
              </motion.div>
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-[0.3em] sm:tracking-[0.4em] text-accent uppercase font-light">SyncRence</h2>
                <motion.button 
                  onClick={() => setIsEntered(true)}
                  className="accent-button px-10 sm:px-16 py-4 sm:py-5 rounded-full text-base sm:text-lg tracking-[0.4em] sm:tracking-[0.5em] font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  ASCEND
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
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-9xl font-serif tracking-tighter sm:tracking-tight leading-none uppercase">
                Social<span className="text-accent">Saver</span>
              </h1>
              <p className="text-sm sm:text-lg text-foreground/40 max-w-sm sm:max-w-xl mx-auto uppercase tracking-[0.2em] sm:tracking-[0.3em] font-light italic">
                Advanced Extraction Engine // by MarkRence
              </p>
            </div>

            <div className="flex items-center justify-center gap-10 text-foreground/20">
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
            <div className="relative flex-1 w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
              <input 
                type="text"
                placeholder="Paste video link here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="accent-input w-full pl-12 pr-6 py-4 sm:py-5 text-base sm:text-lg glass-card !rounded-full"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="accent-button px-12 py-5 rounded-full flex items-center justify-center gap-3 min-w-[200px] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>EXTRACT <ArrowRight size={20} /></>}
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

          <VideoResult data={videoData} sourceUrl={url} />

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
