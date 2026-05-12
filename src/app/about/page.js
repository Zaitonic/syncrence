"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Zap, Globe, Lock } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: "Extraction Speed",
      desc: "Utilizing high-performance server-side protocols to ensure rapid extraction of media assets from across the web."
    },
    {
      icon: Shield,
      title: "Secure Processing",
      desc: "All requests are processed through secure, encrypted tunnels to protect the integrity of your connection."
    },
    {
      icon: Globe,
      title: "Universal Support",
      desc: "A wide range of supported platforms, from social media giants to niche video hosting services."
    },
    {
      icon: Lock,
      title: "Privacy First",
      desc: "We do not log your search history or store downloaded files on our servers. Your extraction is your own."
    }
  ];

  return (
    <main className="relative min-h-screen">
      {/* Shared Background from Home */}
      <div className="background-wrapper fixed inset-0 z-[-1]">
        <div className="background-image w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }} />
      </div>
      <div className="background-overlay fixed inset-0 z-[0]" />

      <div className="relative z-10 flex flex-col items-center">
        <Navbar />

        <section className="w-full max-w-4xl px-6 pt-40 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight uppercase">
                About <span className="text-accent">SocialSaver</span>
              </h1>
              <p className="text-lg text-foreground/50 uppercase tracking-[0.2em] font-light">
                The Architecture of Extraction
              </p>
            </div>

            <div className="max-w-none">
              <p className="text-xl leading-relaxed text-foreground/90 font-light italic">
                SocialSaver is not just a downloader; it is a sophisticated media extraction protocol designed for the modern web. Built by MarkRence, it leverages distributed computing techniques to retrieve high-fidelity assets from complex social architectures.
              </p>
              <p className="text-lg leading-relaxed text-foreground/40 font-light mt-8 border-l-2 border-accent/20 pl-8">
                Our mission is to provide a clean, ad-free environment for users to secure their digital footprints and manage their media consumption without the friction of platform-specific restrictions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mt-20">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="glass-card p-10 space-y-6 border border-white/5 border-l-4 border-l-accent shadow-2xl hover:scale-[1.02] transition-transform"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <f.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold tracking-widest uppercase text-accent/90">{f.title}</h3>
                  <p className="text-sm text-foreground/40 leading-relaxed uppercase tracking-[0.2em]">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
