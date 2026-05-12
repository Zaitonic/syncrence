"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Send, Globe } from "lucide-react";

export default function ContactPage() {
  const channels = [
    {
      icon: Mail,
      label: "Email Protocol",
      value: "mariyaehkawlanglaughkoh143@gmail.com",
      link: "mailto:mariyaehkawlanglaughkoh143@gmail.com"
    },
    {
      icon: MessageSquare,
      label: "Direct Signal",
      value: "@socialsaver_hq",
      link: "https://instagram.com/markrence_31"
    }
  ];

  return (
    <main className="relative min-h-screen">
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
                Contact <span className="text-accent">Protocol</span>
              </h1>
              <p className="text-lg text-foreground/50 uppercase tracking-[0.2em] font-light">
                Establish Connection // Report Anomaly
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {channels.map((c, i) => (
                <a
                  key={i}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-10 flex flex-col items-center text-center gap-8 group hover:border-accent transition-all duration-500 shadow-2xl"
                >
                  <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 group-hover:bg-accent group-hover:text-[#040d0a] transition-all">
                    <c.icon className="text-accent group-hover:text-inherit" size={32} />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold opacity-60">{c.label}</p>
                    <p className="text-sm font-bold tracking-widest text-foreground/90">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="glass-card p-12 mt-12 space-y-10 border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 blur-[60px] rounded-full"></div>
              <div className="space-y-3 relative z-10">
                <h2 className="text-3xl font-serif tracking-[0.2em] uppercase text-accent/80">Transmit Signal</h2>
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/30 font-bold italic">Bypass platform restrictions via direct inquiry</p>
              </div>

              <div className="grid gap-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <input type="text" placeholder="IDENTITY" className="accent-input p-5 glass-card bg-[#040d0a]/40 !rounded-2xl border-white/10" />
                  <input type="email" placeholder="SIGNAL SOURCE" className="accent-input p-5 glass-card bg-[#040d0a]/40 !rounded-2xl border-white/10" />
                </div>
                <textarea rows={5} placeholder="ENCODED MESSAGE" className="accent-input p-5 glass-card bg-[#040d0a]/40 !rounded-2xl resize-none border-white/10"></textarea>
                <button className="accent-button py-5 rounded-2xl flex items-center justify-center gap-4 text-sm font-bold shadow-2xl shadow-accent/10">
                  SEND PACKET <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
