import { motion } from "framer-motion";
import { Target, Eye, Shield, Users, LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

//tipe data
interface AboutValue {
  id: string | number;
  title: string;
  description: string;
  iconName: "Shield" | "Target" | "Users" | "Eye";
}

interface AboutData {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  values: AboutValue[];
  whyChooseUs: string[];
}

// Icon mapping
const iconMap: Record<AboutValue["iconName"], LucideIcon> = {
  Shield,
  Target,
  Users,
  Eye,
};

const About = () => {
  // FETCH DATA FROM API - NO HARDCODE
  const { data: about } = useQuery({
    queryKey: ["about"],
    queryFn: api.getAbout,
  });

  if (!about) return null;

  const values = about.values || [];

  return (
    <section id="tentang" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              {about.badge}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {about.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {about.description1}
            </p>
            <p className="text-muted-foreground mb-8">
              {about.description2}
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value: AboutValue, index: number) => {
                const IconComponent = iconMap[value.iconName] || Shield;
                return (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-hero rounded-2xl p-8 lg:p-12 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-6">Mengapa Memilih Kami?</h3>
              <ul className="space-y-4">
                {about.whyChooseUs?.map((item: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-primary-foreground/90">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
