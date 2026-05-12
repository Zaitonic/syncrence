"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShieldAlert, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "About", href: "/about" },
    { name: "Terms & Privacy", href: "/terms" },
    { name: "Contact", href: "/contact" },
    { name: "Credits", href: "/credits" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-glass-border cutout-effect group-hover:border-accent transition-colors">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-medium tracking-widest text-foreground uppercase group-hover:text-accent transition-colors">
            Sync<span className="text-accent group-hover:text-foreground">Rence</span>
          </span>
        </Link>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-foreground/60 hover:text-accent transition-colors"
        >
          <Menu size={28} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#040d0a]/90 backdrop-blur-3xl border-l border-glass-border z-[70] p-12 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-end mb-12">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-accent/60 hover:text-accent transition-all border border-glass-border rounded-full hover:scale-110"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8 mb-auto">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-3xl font-serif tracking-[0.2em] text-foreground/50 hover:text-accent transition-all hover:pl-6 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform"></span>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-8 mt-12 pt-8 border-t border-glass-border/30">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent uppercase tracking-[0.3em] text-[10px] font-bold">
                    <Scale size={14} />
                    <span>Legal Protocol</span>
                  </div>
                  <p className="text-[11px] text-foreground/30 leading-relaxed tracking-wider uppercase italic">
                    Respect digital ownership. Unauthorized distribution of copyrighted material is prohibited.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent uppercase tracking-[0.3em] text-[10px] font-bold">
                    <ShieldAlert size={14} />
                    <span>Security Layer</span>
                  </div>
                  <p className="text-[11px] text-foreground/30 leading-relaxed tracking-wider uppercase italic">
                    This engine operates as a neutral synthesis layer. All interactions are transient and encrypted.
                  </p>
                </div>

                <p className="text-[10px] text-accent/20 tracking-[0.6em] uppercase pt-4 font-mono">
                  SyncRence Core // 2.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
