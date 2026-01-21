import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

/* ==== TYPES ==== */
interface HeaderData {
  logoText: string;
  logoFullText: string;
}

interface NavLink {
  id: string | number;
  label: string;
  href: string;
  order: number;
  active: boolean;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: header } = useQuery<HeaderData>({
    queryKey: ["header"],
    queryFn: () => api.getHeader() as Promise<HeaderData>,
  });

  const { data: navLinks = [] } = useQuery<NavLink[]>({
    queryKey: ["navLinks"],
    queryFn: () => api.getNavLinks() as Promise<NavLink[]>,
  });

  // ✅ FINAL WA LINK
const whatsappLink =
  "https://wa.me/6285646420488?text=" +
  encodeURIComponent("Halo, saya tertarik dengan layanan Praktisi Mengajar");

  if (!header) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                {header.logoText}
              </span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">
              {header.logoFullText}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks
              .filter((link) => link.active)
              .sort((a, b) => a.order - b.order)
              .map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-4 h-4" />
                Konsultasi
              </a>
            </Button>

            <Button variant="default" size="sm" asChild>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ajukan Praktisi
              </a>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
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
                {navLinks
                  .filter((link) => link.active)
                  .sort((a, b) => a.order - b.order)
                  .map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      className="px-2 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}

                <div className="flex flex-col gap-3 pt-4 border-t border-border">
                  <Button variant="whatsapp" size="lg" asChild>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Phone className="w-4 h-4" />
                      Konsultasi via WhatsApp
                    </a>
                  </Button>

                  <Button variant="default" size="lg" asChild>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ajukan Praktisi Mengajar
                    </a>
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
