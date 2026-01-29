import { motion } from "framer-motion";
import { GraduationCap, Users, Mic2, BookOpen, Clock, Award } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Guru Tamu",
      description: "Praktisi industri hadir langsung ke sekolah untuk berbagi pengalaman nyata dunia kerja kepada siswa.",
      features: ["Sesi 1-2 jam", "Materi disesuaikan kurikulum", "Interaktif & inspiratif"],
    },
    {
      icon: Users,
      title: "Dosen Tamu",
      description: "Kuliah tamu dari profesional berpengalaman untuk memperkaya wawasan mahasiswa.",
      features: ["Kuliah umum/khusus", "Studi kasus industri", "Diskusi mendalam"],
    },
    {
      icon: Mic2,
      title: "Pembicara Seminar",
      description: "Keynote speaker dan narasumber untuk acara kampus, workshop, dan konferensi pendidikan.",
      features: ["Event besar/kecil", "Topik trending", "Pengalaman berkesan"],
    },
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: "Materi Relevan",
      description: "Konten pembelajaran yang sesuai dengan kebutuhan industri terkini",
    },
    {
      icon: Clock,
      title: "Fleksibel",
      description: "Jadwal dan durasi dapat disesuaikan dengan agenda institusi Anda",
    },
    {
      icon: Award,
      title: "Terverifikasi",
      description: "Semua praktisi telah melalui proses kurasi dan verifikasi ketat",
    },
  ];

  return (
    <section id="layanan" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Layanan Kami
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Solusi Praktisi Mengajar untuk Institusi Anda
          </h2>
          <p className="text-lg text-muted-foreground">
            Pilih layanan yang sesuai dengan kebutuhan institusi pendidikan Anda. 
            Kami siap menghadirkan praktisi terbaik ke ruang kelas.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border hover:border-accent/30"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Benefits Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-muted rounded-2xl p-8 lg:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
