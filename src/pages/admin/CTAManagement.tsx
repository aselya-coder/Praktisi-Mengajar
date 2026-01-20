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

interface CTAData {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText: string;
  phone: string;
  email: string;
  location: string;
}

const CTAManagement = () => {
  const queryClient = useQueryClient();

  const { data: cta, isLoading } = useQuery<CTAData>({
    queryKey: ["cta"],
    queryFn: api.getCTA,
  });

  const [formData, setFormData] = useState<CTAData>({
    badge: "",
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    secondaryButtonText: "",
    phone: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    if (cta) {
      setFormData({
        badge: cta.badge || "",
        title: cta.title || "",
        description: cta.description || "",
        buttonText: cta.buttonText || "",
        buttonLink: cta.buttonLink || "",
        secondaryButtonText: cta.secondaryButtonText || "",
        phone: cta.phone || "",
        email: cta.email || "",
        location: cta.location || "",
      });
    }
  }, [cta]);

  const updateMutation = useMutation({
    mutationFn: (data: CTAData) => api.updateCTA(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cta"] });
      toast.success("CTA section berhasil diperbarui!");
    },
    onError: () => toast.error("Gagal memperbarui CTA section"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate(formData);
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
        <h1 className="text-3xl font-bold">CTA & Contact Section</h1>
        <p className="text-muted-foreground">
          Kelola konten call-to-action dan informasi kontak
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* === Konten CTA === */}
        <Card>
          <CardHeader>
            <CardTitle>Konten CTA</CardTitle>
            <CardDescription>Teks dan informasi pada CTA section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="badge">Badge Text</Label>
              <Input id="badge" value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* === Tombol CTA === */}
        <Card>
          <CardHeader>
            <CardTitle>Tombol CTA</CardTitle>
            <CardDescription>Tombol aksi utama dan sekunder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Teks Tombol Utama</Label>
                <Input id="buttonText" value={formData.buttonText} onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonLink">Link Tombol Utama</Label>
                <Input id="buttonLink" value={formData.buttonLink} onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryButtonText">Teks Tombol Sekunder</Label>
              <Input id="secondaryButtonText" value={formData.secondaryButtonText} onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        {/* === Kontak === */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Kontak</CardTitle>
            <CardDescription>Detail kontak yang ditampilkan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telepon / WhatsApp</Label>
              <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
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

export default CTAManagement;
