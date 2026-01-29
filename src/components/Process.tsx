import { motion } from "framer-motion";
import { MessageSquare, Search, CalendarCheck, Presentation } from "lucide-react";

const Process = () => {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Konsultasi Kebutuhan",
      description: "Hubungi kami via WhatsApp atau form untuk diskusikan kebutuhan spesifik institusi Anda.",
    },
    {
      number: "02",
      icon: Search,
      title: "Pencocokan Praktisi",
      description: "Tim kami mencarikan praktisi yang paling sesuai dengan topik dan level peserta didik.",
    },
    {
      number: "03",
      icon: CalendarCheck,
      title: "Konfirmasi & Penjadwalan",
      description: "Setelah praktisi dikonfirmasi, atur jadwal sesuai agenda institusi Anda.",
    },
    {
      number: "04",
      icon: Presentation,
      title: "Pelaksanaan Sesi",
      description: "Praktisi hadir dan menyampaikan materi yang inspiratif dan aplikatif.",
    },
  ];

  return (
    <section id="proses" className="py-20 lg:py-28 bg-muted/50">
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
            Cara Kerja
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            4 Langkah Mudah Menghadirkan Praktisi
          </h2>
          <p className="text-lg text-muted-foreground">
            Proses yang sederhana dan transparan untuk memastikan Anda mendapatkan 
            praktisi terbaik untuk institusi Anda.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center shadow-card">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
