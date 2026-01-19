import { motion } from "framer-motion";
import { GraduationCap, Users, Mic2, BookOpen, Clock, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { LucideIcon } from "lucide-react";

// ================= TYPES =================
interface Service {
  id: string | number;
  title: string;
  description: string;
  iconName: string;
  order: number;
  features?: string[];
}

interface Benefit {
  id: string | number;
  title: string;
  description: string;
  iconName: string;
}

// ================= ICON MAP =================
const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Users,
  Mic2,
  BookOpen,
  Clock,
  Award,
};

const Services = () => {
  // FETCH DATA FROM API - NO HARDCODE
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: api.getServices,
  });

  const { data: benefits = [] } = useQuery<Benefit[]>({
    queryKey: ["benefits"],
    queryFn: api.getBenefits,
  });

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
          {services
            .sort((a, b) => a.order - b.order)
            .map((service, index) => {
              const IconComponent = iconMap[service.iconName] || GraduationCap;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border hover:border-accent/30"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-primary-foreground" />
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
                    {service.features?.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
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
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.iconName] || BookOpen;
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
