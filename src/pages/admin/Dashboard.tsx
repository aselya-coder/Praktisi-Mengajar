import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, ExternalLink } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Panduan Penggunaan */}
      <Card className="bg-gradient-hero text-primary-foreground">
        <CardHeader>
          <CardTitle>Panduan Penggunaan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-primary-foreground/90">
            • Gunakan menu sidebar untuk mengakses berbagai section
          </p>
          <p className="text-primary-foreground/90">
            • Klik "Lihat Website" untuk melihat hasil perubahan
          </p>
          <p className="text-primary-foreground/90">
            • Simpan setiap perubahan setelah mengedit konten
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
