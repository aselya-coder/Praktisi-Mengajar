import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Image, 
  Briefcase, 
  GitBranch, 
  MessageSquare, 
  Eye,
  ExternalLink 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: api.getServices,
  });

  const { data: processSteps } = useQuery({
    queryKey: ["processSteps"],
    queryFn: api.getProcessSteps,
  });

  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: api.getTestimonials,
  });

  const { data: navLinks } = useQuery({
    queryKey: ["navLinks"],
    queryFn: api.getNavLinks,
  });

  const stats = [
    {
      title: "Hero Section",
      description: "Banner utama website",
      icon: Image,
      count: 1,
      path: "/admin/hero",
      color: "text-blue-500",
    },
    {
      title: "Services",
      description: "Layanan yang ditawarkan",
      icon: Briefcase,
      count: services?.length || 0,
      path: "/admin/services",
      color: "text-green-500",
    },
    {
      title: "Process Steps",
      description: "Langkah-langkah proses",
      icon: GitBranch,
      count: processSteps?.length || 0,
      path: "/admin/process",
      color: "text-purple-500",
    },
    {
      title: "Testimonials",
      description: "Testimoni dari klien",
      icon: MessageSquare,
      count: testimonials?.length || 0,
      path: "/admin/testimonials",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang di Admin Panel Praktisi Mengajar
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Eye className="w-4 h-4 mr-2" />
            Lihat Website
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(stat.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.count}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>Kelola konten website dengan mudah</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-start"
            onClick={() => navigate("/admin/hero")}
          >
            <Image className="w-5 h-5 mb-2" />
            <span className="font-semibold">Edit Hero Section</span>
            <span className="text-xs text-muted-foreground">
              Ubah banner dan CTA utama
            </span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-start"
            onClick={() => navigate("/admin/services")}
          >
            <Briefcase className="w-5 h-5 mb-2" />
            <span className="font-semibold">Kelola Services</span>
            <span className="text-xs text-muted-foreground">
              Tambah atau edit layanan
            </span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-start"
            onClick={() => navigate("/admin/testimonials")}
          >
            <MessageSquare className="w-5 h-5 mb-2" />
            <span className="font-semibold">Kelola Testimonial</span>
            <span className="text-xs text-muted-foreground">
              Tambah testimoni baru
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gradient-hero text-primary-foreground">
        <CardHeader>
          <CardTitle>Panduan Penggunaan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-primary-foreground/90">
            • Gunakan menu sidebar untuk mengakses berbagai section
          </p>
          <p className="text-primary-foreground/90">
            • Klik "Lihat Website" untuk preview perubahan
          </p>
          <p className="text-primary-foreground/90">
            • Semua perubahan otomatis tersimpan ke database
          </p>
          <p className="text-primary-foreground/90">
            • Gunakan tombol edit/hapus pada setiap item untuk mengelola konten
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default Dashboard;
