import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, FooterData } from "@/lib/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

const FooterManagement = () => {
  const queryClient = useQueryClient();

  const { data: footer, isLoading } = useQuery<FooterData>({
    queryKey: ["footer"],
    queryFn: api.getFooter,
  });

  const [formData, setFormData] = useState<FooterData>({
    description: "",
    phone: "",
    email: "",
    location: "",
    copyright: "",
    socialMedia: [],
  });

  useEffect(() => {
    if (footer) {
      setFormData({
        description: footer.description ?? "",
        phone: footer.phone ?? "",
        email: footer.email ?? "",
        location: footer.location ?? "",
        copyright: footer.copyright ?? "",
        socialMedia: footer.socialMedia ?? [],
      });
    }
  }, [footer]);

  const updateMutation = useMutation({
    mutationFn: (data: FooterData) => api.updateFooter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
      toast.success("Footer berhasil diperbarui");
    },
    onError: () => toast.error("Gagal memperbarui footer"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Konten Footer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Deskripsi</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Telepon</Label>
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Lokasi</Label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Copyright</Label>
            <Input
              value={formData.copyright}
              onChange={(e) =>
                setFormData({ ...formData, copyright: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={updateMutation.isPending}>
        {updateMutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Simpan
          </>
        )}
      </Button>
    </form>
  );
};

export default FooterManagement;
