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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

/* ================= TYPES ================= */

interface ProcessStep {
  id: string;
  number: string;
  iconName: string;
  title: string;
  description: string;
  order: number;
}

interface ProcessFormData {
  number: string;
  iconName: string;
  title: string;
  description: string;
  order: number;
}

interface UpdateProcessPayload extends ProcessFormData {
  id: string;
}

/* ================= CONSTANT ================= */

const iconOptions = [
  "MessageSquare",
  "Search",
  "CalendarCheck",
  "Presentation",
  "CheckCircle",
  "Clock",
  "FileText",
  "Users",
];

/* ================= COMPONENT ================= */

const ProcessManagement = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);

  const [formData, setFormData] = useState<ProcessFormData>({
    number: "01",
    iconName: "MessageSquare",
    title: "",
    description: "",
    order: 1,
  });

  const { data: processSteps, isLoading } = useQuery<ProcessStep[]>({
    queryKey: ["processSteps"],
    queryFn: api.getProcessSteps,
  });

  const createMutation = useMutation({
    mutationFn: (data: ProcessFormData) => api.createProcessStep(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processSteps"] });
      toast.success("Langkah proses berhasil ditambahkan!");
      setDialogOpen(false);
      resetForm();
    },
    onError: () => toast.error("Gagal menambahkan langkah proses"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: UpdateProcessPayload) =>
      api.updateProcessStep(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processSteps"] });
      toast.success("Langkah proses berhasil diperbarui!");
      setDialogOpen(false);
      setEditingStep(null);
      resetForm();
    },
    onError: () => toast.error("Gagal memperbarui langkah proses"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteProcessStep(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processSteps"] });
      toast.success("Langkah proses berhasil dihapus!");
    },
    onError: () => toast.error("Gagal menghapus langkah proses"),
  });

  const resetForm = () => {
    const nextOrder = (processSteps?.length || 0) + 1;
    setFormData({
      number: String(nextOrder).padStart(2, "0"),
      iconName: "MessageSquare",
      title: "",
      description: "",
      order: nextOrder,
    });
  };

  const handleEdit = (step: ProcessStep) => {
    setEditingStep(step);
    setFormData({
      number: step.number,
      iconName: step.iconName,
      title: step.title,
      description: step.description,
      order: step.order,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStep) {
      updateMutation.mutate({ id: editingStep.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
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
          <h1 className="text-3xl font-bold">Process Steps</h1>
          <p className="text-muted-foreground">Kelola langkah-langkah proses</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Langkah
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingStep ? "Edit Langkah Proses" : "Tambah Langkah Proses"}
              </DialogTitle>
              <DialogDescription>
                Isi informasi langkah proses yang ingin ditampilkan
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Nomor</Label>
                  <Input
                    id="number"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
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
              </div>

              <div className="space-y-2">
                <Label>Judul</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Deskripsi</Label>
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
                <Label>Urutan</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => {
                    const order = Number(e.target.value);
                    setFormData({
                      ...formData,
                      order,
                      number: String(order).padStart(2, "0"),
                    });
                  }}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    setEditingStep(null);
                    resetForm();
                  }}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingStep ? "Perbarui" : "Tambah"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Langkah Proses</CardTitle>
          <CardDescription>
            Total: {processSteps?.length || 0} langkah
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processSteps
                ?.sort((a, b) => a.order - b.order)
                .map((step) => (
                  <TableRow key={step.id}>
                    <TableCell>{step.number}</TableCell>
                    <TableCell>{step.iconName}</TableCell>
                    <TableCell>{step.title}</TableCell>
                    <TableCell className="truncate max-w-md">
                      {step.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(step)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Yakin ingin menghapus?")) {
                              deleteMutation.mutate(step.id);
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

export default ProcessManagement;
