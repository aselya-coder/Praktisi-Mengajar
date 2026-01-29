import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

/* ================= TYPES ================= */

interface Service {
  id: string;
  iconName: string;
  title: string;
  description: string;
  features: string[];
  order: number;
}

interface ServiceFormData {
  iconName: string;
  title: string;
  description: string;
  features: string[];
  order: number;
}

interface UpdateServicePayload extends ServiceFormData {
  id: string;
}

/* ================= CONSTANT ================= */

const iconOptions = [
  "GraduationCap",
  "Users",
  "Mic2",
  "BookOpen",
  "Clock",
  "Award",
  "Briefcase",
  "Star",
];

/* ================= COMPONENT ================= */

const ServicesManagement = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState<ServiceFormData>({
    iconName: "GraduationCap",
    title: "",
    description: "",
    features: ["", "", ""],
    order: 1,
  });

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: api.getServices,
  });

  const createMutation = useMutation({
    mutationFn: (data: ServiceFormData) => api.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service berhasil ditambahkan!");
      setDialogOpen(false);
      resetForm();
    },
    onError: () => toast.error("Gagal menambahkan service"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: UpdateServicePayload) =>
      api.updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service berhasil diperbarui!");
      setDialogOpen(false);
      setEditingService(null);
      resetForm();
    },
    onError: () => toast.error("Gagal memperbarui service"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service berhasil dihapus!");
    },
    onError: () => toast.error("Gagal menghapus service"),
  });

  const resetForm = () => {
    const nextOrder = (services?.length || 0) + 1;
    setFormData({
      iconName: "GraduationCap",
      title: "",
      description: "",
      features: ["", "", ""],
      order: nextOrder,
    });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      iconName: service.iconName,
      title: service.title,
      description: service.description,
      features: service.features,
      order: service.order,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      features: formData.features.filter((feature) => feature.trim() !== ""),
    };

    if (editingService) {
      updateMutation.mutate({ id: editingService.id, ...dataToSubmit });
    } else {
      createMutation.mutate(dataToSubmit);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">Kelola layanan yang ditawarkan</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Service
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Tambah Service Baru"}
              </DialogTitle>
              <DialogDescription>
                Isi informasi layanan yang ingin ditampilkan
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Judul Service *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Deskripsi *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <Select
                  value={formData.iconName}
                  onValueChange={(value) =>
                    setFormData({ ...formData, iconName: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Features (3 poin)</Label>
                {formData.features.map((feature, index) => (
                  <Input
                    key={index}
                    value={feature}
                    onChange={(e) =>
                      handleFeatureChange(index, e.target.value)
                    }
                    placeholder={`Feature ${index + 1}`}
                  />
                ))}
              </div>

              <div className="space-y-2">
                <Label>Urutan</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: Number(e.target.value),
                    })
                  }
                  min={1}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    setEditingService(null);
                    resetForm();
                  }}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingService ? "Perbarui" : "Tambah"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Services</CardTitle>
          <CardDescription>
            Total: {services?.length || 0} layanan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Urutan</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services
                ?.sort((a, b) => a.order - b.order)
                .map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.order}</TableCell>
                    <TableCell>{service.iconName}</TableCell>
                    <TableCell className="font-medium">
                      {service.title}
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {service.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(service)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Yakin ingin menghapus service ini?")) {
                              deleteMutation.mutate(service.id);
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

export default ServicesManagement;
