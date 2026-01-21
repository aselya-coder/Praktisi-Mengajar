import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

// Hero data types
interface HeroStats {
  universities: string | number;
  schools: string | number;
  sessions: string | number;
  satisfaction: string;
}

interface HeroData {
  id?: string | number;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  imageUrl?: string;
  benefits?: string[];
  stats?: HeroStats;
}

const Hero = () => {
  // FETCH DATA FROM API - NO HARDCODE
  const { data: hero } = useQuery<HeroData>({
    queryKey: ["hero"],
    queryFn: () => api.getHero() as Promise<HeroData>,
  });

  // ✅ WhatsApp Link with Auto Message
  const whatsappLink =
    "https://wa.me/6285646420488?text=" +
    encodeURIComponent("Halo, saya tertarik dengan layanan Praktisi Mengajar");

  if (!hero) return null;

  const benefits = hero.benefits || [];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Praktisi mengajar di universitas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-primary-foreground"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/90">
                {hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {hero.title.split(hero.subtitle)[0]}{" "}
              <span className="text-gradient">{hero.subtitle}</span>{" "}
              {hero.title.split(hero.subtitle)[1]}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
              {hero.description}
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-primary-foreground/80">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-2">
                    {hero.buttonText}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {hero.secondaryButtonText}
                  </div>
                </a>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 pt-8 border-t border-primary-foreground/20"
            >
              <p className="text-sm text-primary-foreground/60 mb-4">
                Dipercaya oleh institusi pendidikan terkemuka:
              </p>
              <div className="flex items-center gap-8 text-primary-foreground/40 text-sm font-medium">
                <span>{hero.stats.universities} Universitas</span>
                <span className="w-1 h-1 bg-primary-foreground/40 rounded-full" />
                <span>{hero.stats.schools} Sekolah</span>
                <span className="w-1 h-1 bg-primary-foreground/40 rounded-full" />
                <span>{hero.stats.sessions} Sesi</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block"
          >
            {/* Floating Stats Cards */}
            <div className="relative">
              <div className="absolute top-10 right-0 bg-card/95 backdrop-blur-md rounded-xl p-6 shadow-elevated">
                <div className="text-3xl font-bold text-primary">{hero.stats.satisfaction}</div>
                <div className="text-sm text-muted-foreground">Tingkat Kepuasan</div>
              </div>
              <div className="absolute bottom-20 left-10 bg-card/95 backdrop-blur-md rounded-xl p-6 shadow-elevated">
                <div className="text-3xl font-bold text-accent">200+</div>
                <div className="text-sm text-muted-foreground">Praktisi Terverifikasi</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
          <span className="text-xs">Scroll untuk info lebih</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-primary-foreground/60 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;