import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#layanan", label: "Layanan" },
    { href: "#proses", label: "Cara Kerja" },
    { href: "#testimonial", label: "Testimonial" },
    { href: "#tentang", label: "Tentang Kami" },
    { href: "#kontak", label: "Hubungi Kami" },
  ];

  const services = [
    "Guru Tamu",
    "Dosen Tamu",
    "Pembicara Seminar",
    "Workshop",
    "Mentoring",
  ];

  return (
    <footer className="bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">PM</span>
              </div>
              <span className="font-bold text-xl">Praktisi Mengajar</span>
            </div>
            <p className="text-primary-foreground/70 mb-6">
              Menjembatani industri dan pendidikan untuk masa depan Indonesia yang lebih baik.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <span>+62 856-4642-0488</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@praktisimengajar.id</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Layanan</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Hubungi Kami</h4>
            <p className="text-primary-foreground/70 mb-6">
              Tertarik menghadirkan praktisi ke institusi Anda? Konsultasi gratis sekarang!
            </p>
            <a
              href="https://wa.me/6285646420488?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Praktisi%20Mengajar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Kami
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Praktisi Mengajar. Semua hak dilindungi.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
