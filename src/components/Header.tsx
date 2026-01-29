import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#layanan", label: "Layanan" },
    { href: "#proses", label: "Cara Kerja" },
    { href: "#testimonial", label: "Testimonial" },
    { href: "#tentang", label: "Tentang Kami" },
  ];

  const whatsappLink = "https://wa.me/6285646420488?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Praktisi%20Mengajar";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PM</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">
              Praktisi Mengajar
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary font-medium transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4" />
                Konsultasi
              </a>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href="#kontak">Ajukan Praktisi</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border"
            >
              <nav className="py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary font-medium transition-colors px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <Button variant="whatsapp" size="lg" asChild>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4" />
                      Konsultasi via WhatsApp
                    </a>
                  </Button>
                  <Button variant="default" size="lg" asChild>
                    <a href="#kontak">Ajukan Praktisi Mengajar</a>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
