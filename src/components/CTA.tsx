import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const CTA = () => {
  const { data: cta } = useQuery({
    queryKey: ["cta"],
    queryFn: api.getCTA,
  });

  if (!cta) return null;

  const whatsappLink =
    "https://wa.me/6285646420488?text=Halo,%20saya%20tertarik%20dengan%20layanan%20Praktisi%20Mengajar";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const pesan = `Halo, saya ingin mengajukan:

Nama: ${data.get("nama")}
Jabatan: ${data.get("jabatan")}
Institusi: ${data.get("institusi")}
Email: ${data.get("email")}
WA: ${data.get("wa")}
Layanan: ${data.get("layanan")}
Kebutuhan: ${data.get("deskripsi")}`;

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
              {cta.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {cta.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {cta.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="accent" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  {cta.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>

              <Button variant="whatsapp" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  {cta.secondaryButtonText}
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
                  <p className="font-medium text-foreground">{cta.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{cta.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lokasi</p>
                  <p className="font-medium text-foreground">{cta.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
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
                <input name="nama" required placeholder="Nama" className="input" />
                <input name="jabatan" required placeholder="Jabatan" className="input" />
              </div>

              <input name="institusi" required placeholder="Institusi" className="input" />

              <div className="grid sm:grid-cols-2 gap-5">
                <input name="email" type="email" required placeholder="Email" className="input" />
                <input name="wa" required placeholder="No. WA" className="input" />
              </div>

              <select name="layanan" required className="input">
                <option value="">Pilih layanan</option>
                <option value="guru-tamu">Guru Tamu</option>
                <option value="dosen-tamu">Dosen Tamu</option>
                <option value="pembicara-seminar">Pembicara Seminar</option>
              </select>

              <textarea name="deskripsi" rows={4} placeholder="Kebutuhan" className="input" />

              <Button type="submit" className="w-full">
                Kirim Pengajuan
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
