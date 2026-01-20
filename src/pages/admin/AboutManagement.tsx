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

/* ================= TYPES ================= */

interface AboutFormData {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  whyChooseUs: string[];
}

/* ================= COMPONENT ================= */

const AboutManagement = () => {
  const queryClient = useQueryClient();

  const { data: about, isLoading } = useQuery<AboutFormData>({
    queryKey: ["about"],
    queryFn: api.getAbout,
  });

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
        badge: about.badge || "",
        title: about.title || "",
        description1: about.description1 || "",
        description2: about.description2 || "",
        whyChooseUs: about.whyChooseUs?.length
          ? about.whyChooseUs
          : ["", "", "", "", "", ""],
      });
    }
  }, [about]);

  const updateMutation = useMutation({
    mutationFn: (data: AboutFormData) => api.updateAbout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("About section berhasil diperbarui!");
    },
    onError: () => toast.error("Gagal memperbarui about section"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleWhyChooseUsChange = (index: number, value: string) => {
    const newItems = [...formData.whyChooseUs];
    newItems[index] = value;
    setFormData({ ...formData, whyChooseUs: newItems });
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
              <Label htmlFor="badge">Badge Text</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) =>
                  setFormData({ ...formData, badge: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description1">Deskripsi Paragraf 1</Label>
              <Textarea
                id="description1"
                value={formData.description1}
                onChange={(e) =>
                  setFormData({ ...formData, description1: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description2">Deskripsi Paragraf 2</Label>
              <Textarea
                id="description2"
                value={formData.description2}
                onChange={(e) =>
                  setFormData({ ...formData, description2: e.target.value })
                }
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Mengapa Memilih Kami */}
        <Card>
          <CardHeader>
            <CardTitle>Mengapa Memilih Kami</CardTitle>
            <CardDescription>6 alasan utama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.whyChooseUs.map((item, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`why-${index}`}>Alasan {index + 1}</Label>
                <Input
                  id={`why-${index}`}
                  value={item}
                  onChange={(e) =>
                    handleWhyChooseUsChange(index, e.target.value)
                  }
                  placeholder={`Alasan ${index + 1}`}
                />
              </div>
            ))}
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

export default AboutManagement;
