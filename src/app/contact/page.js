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

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {channels.map((c, i) => (
                <a
                  key={i}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-8 flex flex-col items-center text-center gap-6 group hover:border-accent transition-all duration-500"
                >
                  <div className="p-4 rounded-full bg-glass border border-glass-border group-hover:bg-accent/10 transition-colors">
                    <c.icon className="text-accent" size={28} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold">{c.label}</p>
                    <p className="text-sm font-medium tracking-widest text-foreground group-hover:text-accent transition-colors">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="glass-card p-12 mt-12 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-serif tracking-widest uppercase">Send a Packet</h2>
                <p className="text-xs uppercase tracking-widest text-foreground/40">Inquiry or feedback regarding the engine</p>
              </div>

              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="IDENTITY" className="accent-input p-4 glass-card bg-transparent !rounded-xl" />
                  <input type="email" placeholder="SIGNAL SOURCE (EMAIL)" className="accent-input p-4 glass-card bg-transparent !rounded-xl" />
                </div>
                <textarea rows={4} placeholder="ENCODED MESSAGE" className="accent-input p-4 glass-card bg-transparent !rounded-xl resize-none"></textarea>
                <button className="accent-button py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-[0.4em] font-bold text-xs">
                  Transmit <Send size={16} />
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
