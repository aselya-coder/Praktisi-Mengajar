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

const FooterManagement = () => {
  const queryClient = useQueryClient();
  const { data: footer, isLoading } = useQuery({
    queryKey: ["footer"],
    queryFn: api.getFooter,
  });

  const [formData, setFormData] = useState({
    description: "",
    phone: "",
    email: "",
    location: "",
    copyright: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  });

  useEffect(() => {
    if (footer) {
      setFormData({
        description: footer.description || "",
        phone: footer.phone || "",
        email: footer.email || "",
        location: footer.location || "",
        copyright: footer.copyright || "",
        socialMedia: footer.socialMedia || {
          facebook: "",
          instagram: "",
          linkedin: "",
        },
      });
    }
  }, [footer]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.updateFooter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
      toast.success("Footer berhasil diperbarui!");
    },
    onError: () => toast.error("Gagal memperbarui footer"),
  });

  const handleSubmit = (e: React.FormEvent) => {
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
        <h1 className="text-3xl font-bold">Footer</h1>
        <p className="text-muted-foreground">
          Kelola konten footer website
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Umum</CardTitle>
            <CardDescription>Deskripsi dan tagline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="copyright">Copyright Text</Label>
              <Input
                id="copyright"
                value={formData.copyright}
                onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Kontak</CardTitle>
            <CardDescription>Detail kontak yang ditampilkan di footer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telepon / WhatsApp</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Sosial</CardTitle>
            <CardDescription>Link ke akun media sosial (opsional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={formData.socialMedia.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, facebook: e.target.value },
                  })
                }
                placeholder="https://facebook.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={formData.socialMedia.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={formData.socialMedia.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/..."
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

export default FooterManagement;
