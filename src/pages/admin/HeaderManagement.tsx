import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

/* ===== TYPES ===== */
interface NavLink {
  id: string;
  href: string;
  label: string;
  order: number;
  active: boolean;
}

interface HeaderData {
  logoText: string;
  logoFullText: string;
  mode: string;
}

interface NavLinkForm {
  href: string;
  label: string;
  order: number;
  active: boolean;
}

const HeaderManagement = () => {
  const queryClient = useQueryClient();

  const { data: header, isLoading: headerLoading } = useQuery<HeaderData>({
    queryKey: ["header"],
    queryFn: api.getHeader,
  });

  const { data: navLinks, isLoading: navLinksLoading } = useQuery<NavLink[]>({
    queryKey: ["navLinks"],
    queryFn: api.getNavLinks,
  });

  const [headerData, setHeaderData] = useState<HeaderData>({
    logoText: "",
    logoFullText: "",
    mode: "fixed",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<NavLink | null>(null);
  const [linkFormData, setLinkFormData] = useState<NavLinkForm>({
    href: "",
    label: "",
    order: 1,
    active: true,
  });

  useEffect(() => {
    if (header) {
      setHeaderData({
        logoText: header.logoText || "",
        logoFullText: header.logoFullText || "",
        mode: header.mode || "fixed",
      });
    }
  }, [header]);

  /* ===== MUTATIONS (NO ANY) ===== */
  const updateHeaderMutation = useMutation({
    mutationFn: (data: HeaderData) => api.updateHeader(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["header"] });
      toast.success("Header berhasil diperbarui!");
    },
    onError: () => toast.error("Gagal memperbarui header"),
  });

  const createLinkMutation = useMutation({
    mutationFn: (data: NavLinkForm) => api.createNavLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] });
      toast.success("Nav link berhasil ditambahkan!");
      setDialogOpen(false);
      resetLinkForm();
    },
    onError: () => toast.error("Gagal menambahkan nav link"),
  });

  const updateLinkMutation = useMutation({
    mutationFn: (payload: { id: string } & NavLinkForm) =>
      api.updateNavLink(payload.id, {
        href: payload.href,
        label: payload.label,
        order: payload.order,
        active: payload.active,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] });
      toast.success("Nav link berhasil diperbarui!");
      setDialogOpen(false);
      setEditingLink(null);
      resetLinkForm();
    },
    onError: () => toast.error("Gagal memperbarui nav link"),
  });

  const deleteLinkMutation = useMutation({
    mutationFn: (id: string) => api.deleteNavLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] });
      toast.success("Nav link berhasil dihapus!");
    },
    onError: () => toast.error("Gagal menghapus nav link"),
  });

  const handleSubmitHeader = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeaderMutation.mutate(headerData);
  };

  const resetLinkForm = () => {
    setLinkFormData({
      href: "",
      label: "",
      order: (navLinks?.length || 0) + 1,
      active: true,
    });
  };

  const handleEditLink = (link: NavLink) => {
    setEditingLink(link);
    setLinkFormData({
      href: link.href,
      label: link.label,
      order: link.order,
      active: link.active,
    });
    setDialogOpen(true);
  };

  const handleSubmitLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLink) {
      updateLinkMutation.mutate({ id: editingLink.id, ...linkFormData });
    } else {
      createLinkMutation.mutate(linkFormData);
    }
  };

  if (headerLoading || navLinksLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ---- HEADER FORM ---- */}
      <form onSubmit={handleSubmitHeader}>
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Header</CardTitle>
            <CardDescription>Logo dan mode header</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Logo Singkat</Label>
              <Input
                value={headerData.logoText}
                onChange={(e) => setHeaderData({ ...headerData, logoText: e.target.value })}
              />
            </div>
            <div>
              <Label>Logo Lengkap</Label>
              <Input
                value={headerData.logoFullText}
                onChange={(e) => setHeaderData({ ...headerData, logoFullText: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end mt-4">
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Simpan Header
          </Button>
        </div>
      </form>

      {/* ---- NAVIGATION TABLE ---- */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Navigasi</CardTitle>
          <CardDescription>Total: {navLinks?.length || 0}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Urutan</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {navLinks?.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>{link.order}</TableCell>
                  <TableCell>{link.label}</TableCell>
                  <TableCell>{link.href}</TableCell>
                  <TableCell>{link.active ? "Aktif" : "Nonaktif"}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleEditLink(link)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteLinkMutation.mutate(link.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeaderManagement;
