import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const CTA = () => {
  // FETCH DATA FROM API - NO HARDCODE
  const { data: cta } = useQuery({
    queryKey: ["cta"],
    queryFn: api.getCTA,
  });

  // Provide automatic default content when API hasn't returned data yet
  const defaults = {
    badge: "Hubungi Kami",
    title: "Siap Terhubung dengan Praktisi Pengajar",
    description: "Ajukan kebutuhan pengajar tamu, pembicara seminar, atau kolaborasi kurikulum. Tim kami akan merespons secepatnya.",
    buttonText: "Hubungi via WhatsApp",
    secondaryButtonText: "Konsultasi Gratis",
    buttonLink: "https://wa.me/6285646420488?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Praktisi%20Mengajar",
    phone: "+62 856-4642-0488",
    email: "halo@praktisimengajar.id",
    location: "Indonesia",
  };

  const data = { ...defaults, ...(cta || {}) } as typeof defaults & Partial<typeof cta>;

  const whatsappLink =
    "https://wa.me/6285646420488?text=" +
    encodeURIComponent("Halo, saya tertarik dengan layanan Praktisi Mengajar");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  
    const pesan = `
  Halo, saya ingin mengajukan:
  
  Nama: ${data.get("nama")}
  Jabatan: ${data.get("jabatan")}
  Institusi: ${data.get("institusi")}
  Email: ${data.get("email")}
  WA: ${data.get("wa")}
  Layanan: ${data.get("layanan")}
  Kebutuhan: ${data.get("deskripsi")}
    `;
  
    const link =
      "https://wa.me/6285646420488?text=" + encodeURIComponent(pesan);
  
    window.open(link, "_blank");
  };  

  return (
    <section id="kontak" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              {data.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {data.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {data.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="accent" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  {data.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="whatsapp" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  {data.secondaryButtonText}
                </a>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telepon / WhatsApp</p>
                  <p className="font-medium text-foreground">{data.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{data.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lokasi</p>
                  <p className="font-medium text-foreground">{data.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            id="form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Formulir Pengajuan
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    name="nama"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jabatan *
                  </label>
                  <input
                    name="jabatan"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    placeholder="Kepala Sekolah / Dosen"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Institusi *
                </label>
                <input
                  name="institusi"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  placeholder="Nama sekolah atau universitas"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    placeholder="email@institusi.ac.id"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    No. WhatsApp *
                  </label>
                  <input
                    name="wa"
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Jenis Layanan *
                </label>
                <select
                  name="layanan"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                >
                  <option value="">Pilih layanan</option>
                  <option value="guru-tamu">Guru Tamu</option>
                  <option value="dosen-tamu">Dosen Tamu</option>
                  <option value="pembicara-seminar">Pembicara Seminar</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Deskripsi Kebutuhan
                </label>
                <textarea
                  name="deskripsi"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
                  placeholder="Jelaskan topik, jumlah peserta, tanggal yang diinginkan, dll."
                />
              </div>

              <Button type="submit" variant="default" size="lg" className="w-full">
                Kirim Pengajuan
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Dengan mengirim form ini, Anda menyetujui untuk dihubungi oleh tim kami.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
