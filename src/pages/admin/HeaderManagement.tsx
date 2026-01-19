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

interface NavLink {
  id: string;
  href: string;
  label: string;
  order: number;
  active: boolean;
}

const HeaderManagement = () => {
  const queryClient = useQueryClient();
  
  const { data: header, isLoading: headerLoading } = useQuery({
    queryKey: ["header"],
    queryFn: api.getHeader,
  });

  const { data: navLinks, isLoading: navLinksLoading } = useQuery({
    queryKey: ["navLinks"],
    queryFn: api.getNavLinks,
  });

  const [headerData, setHeaderData] = useState({
    logoText: "",
    logoFullText: "",
    mode: "fixed",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<NavLink | null>(null);
  const [linkFormData, setLinkFormData] = useState({
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

  const updateHeaderMutation = useMutation({
    mutationFn: (data: any) => api.updateHeader(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["header"] });
      toast.success("Header berhasil diperbarui!");
    },
    onError: () => toast.error("Gagal memperbarui header"),
  });

  const createLinkMutation = useMutation({
    mutationFn: api.createNavLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] });
      toast.success("Nav link berhasil ditambahkan!");
      setDialogOpen(false);
      resetLinkForm();
    },
    onError: () => toast.error("Gagal menambahkan nav link"),
  });

  const updateLinkMutation = useMutation({
    mutationFn: ({ id, ...data }: any) => api.updateNavLink(id, data),
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
    mutationFn: api.deleteNavLink,
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
      <div>
        <h1 className="text-3xl font-bold">Header & Navigation</h1>
        <p className="text-muted-foreground">
          Kelola header dan menu navigasi website
        </p>
      </div>

      <form onSubmit={handleSubmitHeader} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Header</CardTitle>
            <CardDescription>Logo dan mode header</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="logoText">Logo Text (Singkat)</Label>
                <Input
                  id="logoText"
                  value={headerData.logoText}
                  onChange={(e) => setHeaderData({ ...headerData, logoText: e.target.value })}
                  placeholder="PM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoFullText">Logo Text (Lengkap)</Label>
                <Input
                  id="logoFullText"
                  value={headerData.logoFullText}
                  onChange={(e) => setHeaderData({ ...headerData, logoFullText: e.target.value })}
                  placeholder="Praktisi Mengajar"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={updateHeaderMutation.isPending}>
            {updateHeaderMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Header
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Navigation Links */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Menu Navigasi</h2>
          <p className="text-sm text-muted-foreground">Kelola link menu header</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetLinkForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingLink ? "Edit Nav Link" : "Tambah Nav Link"}
              </DialogTitle>
              <DialogDescription>
                Isi informasi menu navigasi
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label *</Label>
                <Input
                  id="label"
                  value={linkFormData.label}
                  onChange={(e) => setLinkFormData({ ...linkFormData, label: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="href">Link / Anchor *</Label>
                <Input
                  id="href"
                  value={linkFormData.href}
                  onChange={(e) => setLinkFormData({ ...linkFormData, href: e.target.value })}
                  placeholder="#layanan"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Urutan</Label>
                <Input
                  id="order"
                  type="number"
                  value={linkFormData.order}
                  onChange={(e) => setLinkFormData({ ...linkFormData, order: parseInt(e.target.value) })}
                  min="1"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="active">Aktif</Label>
                <Switch
                  id="active"
                  checked={linkFormData.active}
                  onCheckedChange={(checked) => setLinkFormData({ ...linkFormData, active: checked })}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    setEditingLink(null);
                    resetLinkForm();
                  }}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingLink ? "Perbarui" : "Tambah"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Menu Navigasi</CardTitle>
          <CardDescription>Total: {navLinks?.length || 0} link</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Urutan</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {navLinks?.sort((a: NavLink, b: NavLink) => a.order - b.order).map((link: NavLink) => (
                <TableRow key={link.id}>
                  <TableCell>{link.order}</TableCell>
                  <TableCell className="font-medium">{link.label}</TableCell>
                  <TableCell>{link.href}</TableCell>
                  <TableCell>
                    <span className={link.active ? "text-green-600" : "text-muted-foreground"}>
                      {link.active ? "Aktif" : "Nonaktif"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditLink(link)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (confirm("Yakin ingin menghapus link ini?")) {
                            deleteLinkMutation.mutate(link.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
