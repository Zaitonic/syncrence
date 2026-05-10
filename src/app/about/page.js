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

            <div className="prose prose-invert max-w-none">
              <p className="text-xl leading-relaxed text-foreground/70 font-light">
                SocialSaver is not just a downloader; it is a sophisticated media extraction protocol designed for the modern web. Built by MarkRence, it leverages distributed computing techniques to retrieve high-fidelity assets from complex social architectures.
              </p>
              <p className="text-lg leading-relaxed text-foreground/50 font-light mt-6">
                Our mission is to provide a clean, ad-free environment for users to secure their digital footprints and manage their media consumption without the friction of platform-specific restrictions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-16">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="glass-card p-8 space-y-4 border-l-4 border-l-accent/30"
                >
                  <f.icon className="text-accent" size={32} />
                  <h3 className="text-xl font-medium tracking-wider uppercase">{f.title}</h3>
                  <p className="text-sm text-foreground/40 leading-relaxed uppercase tracking-widest">{f.desc}</p>
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
