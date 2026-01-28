import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useQuery } from "@tanstack/react-query";
import { api, HeroData } from "@/lib/api";

const Hero = () => {
  const { data: hero } = useQuery<HeroData>({
    queryKey: ["hero"],
    queryFn: api.getHero,
  });

  const whatsappLink =
    "https://wa.me/6285646420488?text=" +
    encodeURIComponent("Halo, saya tertarik dengan layanan Praktisi Mengajar");

  if (!hero) return null;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.image || heroImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-primary-foreground max-w-2xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium">{hero.badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            {hero.title}{" "}
            <span className="text-gradient">{hero.subtitle}</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 mb-8">
            {hero.description}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href={hero.primaryButtonLink || whatsappLink}>
                {hero.primaryButtonText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>

            <Button variant="heroOutline" size="xl" asChild>
              <a href={hero.secondaryButtonLink || whatsappLink}>
                <MessageCircle className="w-5 h-5 mr-2" />
                {hero.secondaryButtonText}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
