import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

/* ================= TYPE ================= */

interface HeroStats {
  universities: string;
  schools: string;
  sessions: string;
  satisfaction: string;
}

interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText: string;
  imageUrl: string;
  benefits: string[];
  stats: HeroStats;
}

/* ================= COMPONENT ================= */

const HeroManagement = () => {
  const queryClient = useQueryClient();

  const { data: hero, isLoading } = useQuery<HeroData>({
    queryKey: ["hero"],
    queryFn: api.getHero,
  });

  const [formData, setFormData] = useState<HeroData>({
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
        benefits:
          hero.benefits && hero.benefits.length >= 3
            ? hero.benefits.slice(0, 3)
            : ["", "", ""],
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
    mutationFn: (data: HeroData) => api.updateHero(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success("Hero section berhasil diperbarui!");
    },
    onError: () => toast.error("Gagal memperbarui hero section"),
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
        {/* Konten Utama */}
        <Card>
          <CardHeader>
            <CardTitle>Konten Utama</CardTitle>
            <CardDescription>Teks dan informasi pada hero</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Badge Text</Label>
              <Input
                value={formData.badge}
                onChange={(e) =>
                  setFormData({ ...formData, badge: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Judul Utama</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Subtitle</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Deskripsi</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {formData.benefits.map((b, i) => (
              <div key={i}>
                <Label>Keunggulan {i + 1}</Label>
                <Input
                  value={b}
                  onChange={(e) => handleBenefitChange(i, e.target.value)}
                />
              </div>
            ))}

            <div>
              <Label>Teks Tombol Utama</Label>
              <Input
                value={formData.buttonText}
                onChange={(e) =>
                  setFormData({ ...formData, buttonText: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Link Tombol Utama</Label>
              <Input
                value={formData.buttonLink}
                onChange={(e) =>
                  setFormData({ ...formData, buttonLink: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Teks Tombol Kedua</Label>
              <Input
                value={formData.secondaryButtonText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    secondaryButtonText: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>URL Background / Image</Label>
              <Input
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistik */}
        <Card>
          <CardHeader>
            <CardTitle>Statistik</CardTitle>
            <CardDescription>Angka yang tampil di hero</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Universitas</Label>
              <Input
                value={formData.stats.universities}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: {
                      ...formData.stats,
                      universities: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label>Sekolah</Label>
              <Input
                value={formData.stats.schools}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, schools: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label>Sesi</Label>
              <Input
                value={formData.stats.sessions}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, sessions: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label>Kepuasan (%)</Label>
              <Input
                value={formData.stats.satisfaction}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: {
                      ...formData.stats,
                      satisfaction: e.target.value,
                    },
                  })
                }
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
