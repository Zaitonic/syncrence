"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, EyeOff, Scale, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      icon: Scale,
      title: "Terms of Service",
      content: "By using SocialSaver, you agree to respect the intellectual property rights of content creators. This tool is provided for personal, educational, and backup purposes only. Commercial use or redistribution of extracted assets without permission is strictly prohibited."
    },
    {
      icon: EyeOff,
      title: "Privacy Policy",
      content: "Your privacy is our priority. We do not collect personal information, email addresses, or browsing history. The URLs you paste are processed in real-time and are not stored in any permanent database. We use anonymous session data only to improve our extraction engine."
    },
    {
      icon: ShieldCheck,
      title: "Content Responsibility",
      content: "SocialSaver does not host any media on its servers. We act as a bridge between the source platform and your local device. Users are solely responsible for compliance with the terms of service of the original content provider."
    },
    {
      icon: FileText,
      title: "Legal Disclaimer",
      content: "SocialSaver is provided 'as is' without any warranties. We are not affiliated with TikTok, Instagram, Facebook, or any other supported platforms. Use this tool at your own risk and within the boundaries of international copyright law."
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
                Terms & <span className="text-accent">Privacy</span>
              </h1>
              <p className="text-lg text-foreground/50 uppercase tracking-[0.2em] font-light">
                Governing Protocols // Ethical Framework
              </p>
            </div>

            <div className="grid gap-8 mt-12">
              {sections.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="glass-card p-10 space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-accent/10 border border-accent/20 text-accent">
                      <s.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-serif tracking-widest uppercase">{s.title}</h3>
                  </div>
                  <p className="text-foreground/60 leading-relaxed tracking-wide uppercase text-xs sm:text-sm">
                    {s.content}
                  </p>
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
