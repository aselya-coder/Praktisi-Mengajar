import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const HeroManagement = () => {
  const queryClient = useQueryClient();
  const { data: hero, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: api.getHero,
  });

  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    subtitle: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    secondaryButtonText: "",
    imageUrl: "",
    benefits: ["", "", ""],
    stats: {
      universities: "",
      schools: "",
      sessions: "",
      satisfaction: "",
    },
  });

  useEffect(() => {
    if (hero) {
      setFormData({
        badge: hero.badge || "",
        title: hero.title || "",
        subtitle: hero.subtitle || "",
        description: hero.description || "",
        buttonText: hero.buttonText || "",
        buttonLink: hero.buttonLink || "",
        secondaryButtonText: hero.secondaryButtonText || "",
        imageUrl: hero.imageUrl || "",
        benefits: hero.benefits || ["", "", ""],
        stats: hero.stats || {
          universities: "",
          schools: "",
          sessions: "",
          satisfaction: "",
        },
      });
    }
  }, [hero]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.updateHero(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success("Hero section berhasil diperbarui!");
    },
    onError: () => {
      toast.error("Gagal memperbarui hero section");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hero Section</h1>
        <p className="text-muted-foreground">
          Kelola konten hero/banner utama website
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Konten Utama</CardTitle>
            <CardDescription>Teks dan informasi pada hero section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="badge">Badge Text</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Mitra Pendidikan Terpercaya"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Judul Utama</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Hadirkan Praktisi Industri..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle (Highlight)</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Praktisi Industri"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Layanan Guru Tamu, Dosen Tamu..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tombol CTA</CardTitle>
            <CardDescription>Tombol utama dan sekunder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Teks Tombol Utama</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonLink">Link Tombol Utama</Label>
                <Input
                  id="buttonLink"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryButtonText">Teks Tombol Sekunder</Label>
              <Input
                id="secondaryButtonText"
                value={formData.secondaryButtonText}
                onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keunggulan (Benefits)</CardTitle>
            <CardDescription>3 poin keunggulan utama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`benefit-${index}`}>Benefit {index + 1}</Label>
                <Input
                  id={`benefit-${index}`}
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  placeholder={`Keunggulan ${index + 1}`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistik</CardTitle>
            <CardDescription>Angka pencapaian yang ditampilkan</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="universities">Universitas</Label>
              <Input
                id="universities"
                value={formData.stats.universities}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, universities: e.target.value },
                  })
                }
                placeholder="50+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schools">Sekolah</Label>
              <Input
                id="schools"
                value={formData.stats.schools}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, schools: e.target.value },
                  })
                }
                placeholder="100+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessions">Sesi</Label>
              <Input
                id="sessions"
                value={formData.stats.sessions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, sessions: e.target.value },
                  })
                }
                placeholder="500+"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="satisfaction">Tingkat Kepuasan</Label>
              <Input
                id="satisfaction"
                value={formData.stats.satisfaction}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, satisfaction: e.target.value },
                  })
                }
                placeholder="98%"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeroManagement;
