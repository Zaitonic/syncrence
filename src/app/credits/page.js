"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Box, Palette, Cpu } from "lucide-react";

export default function CreditsPage() {
  const stack = [
    {
      icon: Cpu,
      title: "Core Architecture",
      items: ["Next.js 14", "React Engine", "Serverless Extraction"]
    },
    {
      icon: Code,
      title: "External Integrations",
      items: ["Supabase API (Logging)", "Unsplash API (Media)", "Cobalt Protocol (Extraction)", "Vercel Analytics"]
    },
    {
      icon: Box,
      title: "Modules & Logic",
      items: ["Framer Motion", "Lucide Icons", "Tailwind CSS", "React Hook Form"]
    },
    {
      icon: Palette,
      title: "Visual System",
      items: ["SyncRence UI Kit", "Glassmorphism v2", "Google Fonts (Inter)", "Figma Synthesis"]
    },
    {
      icon: Cpu,
      title: "Engineering",
      items: ["Next.js Server Actions", "API Synthesis", "Real-time Node Engine", "Distributed Protocols"]
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
                System <span className="text-accent">Credits</span>
              </h1>
              <p className="text-lg text-foreground/50 uppercase tracking-[0.2em] font-light">
                Attributions // Tools of the Trade
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {stack.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="glass-card p-10 border border-white/5 hover:border-accent/30 transition-all group shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent/10 group-hover:bg-accent/40 transition-colors"></div>
                  <div className="flex items-center gap-5 mb-10">
                    <div className="p-3 rounded-xl bg-accent/5 text-accent/60 group-hover:text-accent transition-colors">
                      <s.icon size={36} />
                    </div>
                    <h3 className="text-2xl font-serif tracking-[0.2em] uppercase text-foreground/80">{s.title}</h3>
                  </div>
                  <ul className="space-y-5">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-4 text-foreground/30 group-hover:text-foreground/60 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40"></div>
                        <span className="text-[11px] uppercase tracking-[0.3em] font-bold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-20 space-y-10">
              <div className="inline-block px-10 py-5 glass-card border-accent/20 bg-accent/5">
                <p className="text-[11px] uppercase tracking-[0.4em] text-accent font-bold italic">
                  Atmospheric Synthesis by <a href="https://paraluman.xyz" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-white transition-all">paraluman.xyz</a>
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-foreground/20 font-light max-w-3xl mx-auto leading-loose italic">
                This project was synthesized by MarkRence. All referenced marks, logos, and brands are the property of their respective owners. No affiliation is implied.
              </p>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
