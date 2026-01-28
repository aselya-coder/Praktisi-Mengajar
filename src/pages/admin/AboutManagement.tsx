import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, AboutFormData } from "@/lib/api";
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

const AboutManagement = () => {
  const queryClient = useQueryClient();

  /* ================= GET DATA ================= */

  const { data: about, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: api.getAbout,
  });

  /* ================= FORM STATE ================= */

  const [formData, setFormData] = useState<AboutFormData>({
    badge: "",
    title: "",
    description1: "",
    description2: "",
    whyChooseUs: ["", "", "", "", "", ""],
  });

  useEffect(() => {
    if (about) {
      setFormData({
        badge: about.badge,
        title: about.title,
        description1: about.description1,
        description2: about.description2,
        whyChooseUs: about.whyChooseUs.length
          ? about.whyChooseUs
          : ["", "", "", "", "", ""],
      });
    }
  }, [about]);

  /* ================= UPDATE ================= */

  const updateMutation = useMutation({
    mutationFn: api.updateAbout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("About section berhasil diperbarui!");
    },
    onError: () => {
      toast.error("Gagal memperbarui about section");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleWhyChooseUsChange = (index: number, value: string) => {
    const updated = [...formData.whyChooseUs];
    updated[index] = value;
    setFormData({ ...formData, whyChooseUs: updated });
  };

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Section</h1>
        <p className="text-muted-foreground">
          Kelola konten tentang perusahaan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Konten Utama */}
        <Card>
          <CardHeader>
            <CardTitle>Konten Utama</CardTitle>
            <CardDescription>
              Teks dan informasi pada about section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Badge Text</Label>
              <Input
                value={formData.badge}
                onChange={(e) =>
                  setFormData({ ...formData, badge: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Judul</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Deskripsi Paragraf 1</Label>
              <Textarea
                value={formData.description1}
                onChange={(e) =>
                  setFormData({ ...formData, description1: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Deskripsi Paragraf 2</Label>
              <Textarea
                value={formData.description2}
                onChange={(e) =>
                  setFormData({ ...formData, description2: e.target.value })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card>
          <CardHeader>
            <CardTitle>Mengapa Memilih Kami</CardTitle>
            <CardDescription>6 alasan utama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.whyChooseUs.map((item, index) => (
              <div key={index} className="space-y-2">
                <Label>Alasan {index + 1}</Label>
                <Input
                  value={item}
                  onChange={(e) =>
                    handleWhyChooseUsChange(index, e.target.value)
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={updateMutation.isPending}>
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

export default AboutManagement;
