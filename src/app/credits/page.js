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

            <div className="grid md:grid-cols-2 gap-8">
              {stack.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="glass-card p-10 border border-white/5 hover:border-accent/20 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <s.icon className="text-accent/40 group-hover:text-accent transition-colors" size={32} />
                    <h3 className="text-xl font-serif tracking-widest uppercase">{s.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-foreground/40 group-hover:text-foreground/60 transition-colors">
                        <div className="w-1 h-1 rounded-full bg-accent/30"></div>
                        <span className="text-xs uppercase tracking-[0.2em]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-12">
              <p className="text-[10px] uppercase tracking-[0.5em] text-foreground/20 font-light max-w-2xl mx-auto leading-loose">
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
