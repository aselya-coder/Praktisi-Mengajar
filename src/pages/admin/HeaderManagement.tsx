import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

/* ================= TYPES ================= */
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
  mode: "fixed" | "sticky";
}

interface NavLinkForm {
  href: string;
  label: string;
  order: number;
  active: boolean;
}

/* ================= COMPONENT ================= */
const HeaderManagement = () => {
  const queryClient = useQueryClient();

  /* ===== QUERY HEADER ===== */
  const {
    data: header,
    isLoading: headerLoading,
  } = useQuery({
    queryKey: ["header"],
    queryFn: async (): Promise<HeaderData> => {
      return await api.getHeader();
    },
  });

  /* ===== QUERY NAV LINKS ===== */
  const {
    data: navLinks = [],
    isLoading: navLinksLoading,
  } = useQuery({
    queryKey: ["navLinks"],
    queryFn: async (): Promise<NavLink[]> => {
      return await api.getNavLinks();
    },
  });

  /* ===== STATE ===== */
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

  /* ===== EFFECT ===== */
  useEffect(() => {
    if (header) {
      setHeaderData(header);
    }
  }, [header]);

  /* ================= MUTATIONS ================= */

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
      toast.success("Menu berhasil ditambahkan!");
      closeDialog();
    },
    onError: () => toast.error("Gagal menambahkan menu"),
  });

  const updateLinkMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: string } & NavLinkForm) =>
      api.updateNavLink(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] });
      toast.success("Menu berhasil diperbarui!");
      closeDialog();
    },
    onError: () => toast.error("Gagal memperbarui menu"),
  });

  const deleteLinkMutation = useMutation({
    mutationFn: (id: string) => api.deleteNavLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["navLinks"] });
      toast.success("Menu berhasil dihapus!");
    },
    onError: () => toast.error("Gagal menghapus menu"),
  });

  /* ================= HANDLER ================= */

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingLink(null);
    setLinkFormData({
      href: "",
      label: "",
      order: navLinks.length + 1,
      active: true,
    });
  };

  const handleSubmitHeader = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeaderMutation.mutate(headerData);
  };

  const handleEditLink = (link: NavLink) => {
    setEditingLink(link);
    setLinkFormData(link);
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

  /* ================= LOADING ================= */
  if (headerLoading || navLinksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">
      {/* HEADER FORM */}
      <form onSubmit={handleSubmitHeader}>
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Header</CardTitle>
            <CardDescription>Logo dan mode header</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Logo Singkat</Label>
              <Input
                value={headerData.logoText}
                onChange={(e) =>
                  setHeaderData({ ...headerData, logoText: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Logo Lengkap</Label>
              <Input
                value={headerData.logoFullText}
                onChange={(e) =>
                  setHeaderData({
                    ...headerData,
                    logoFullText: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Mode Header</Label>
              <select
                className="w-full border rounded px-3 py-2"
                value={headerData.mode}
                onChange={(e) =>
                  setHeaderData({
                    ...headerData,
                    mode: e.target.value as "fixed" | "sticky",
                  })
                }
              >
                <option value="fixed">Fixed</option>
                <option value="sticky">Sticky</option>
              </select>
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

      {/* NAVIGATION TABLE */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Menu Navigasi</CardTitle>
            <CardDescription>Total: {navLinks.length}</CardDescription>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Menu
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingLink ? "Edit Menu" : "Tambah Menu"}
                </DialogTitle>
                <DialogDescription>Atur menu header</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmitLink} className="space-y-4">
                <div>
                  <Label>Label</Label>
                  <Input
                    value={linkFormData.label}
                    onChange={(e) =>
                      setLinkFormData({
                        ...linkFormData,
                        label: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Link</Label>
                  <Input
                    value={linkFormData.href}
                    onChange={(e) =>
                      setLinkFormData({
                        ...linkFormData,
                        href: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Urutan</Label>
                  <Input
                    type="number"
                    value={linkFormData.order}
                    onChange={(e) =>
                      setLinkFormData({
                        ...linkFormData,
                        order: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={linkFormData.active}
                    onCheckedChange={(v) =>
                      setLinkFormData({ ...linkFormData, active: v })
                    }
                  />
                  <span>Aktif</span>
                </div>

                <Button type="submit" className="w-full">
                  Simpan
                </Button>
              </form>
            </DialogContent>
          </Dialog>
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
              {navLinks.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>{link.order}</TableCell>
                  <TableCell>{link.label}</TableCell>
                  <TableCell>{link.href}</TableCell>
                  <TableCell>
                    {link.active ? "Aktif" : "Nonaktif"}
                  </TableCell>
                  <TableCell className="space-x-2">
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
