import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ProcessStep, ProcessFormData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProcessManagement() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<ProcessFormData>({
    order: 1,
    number: 1,
    iconName: "",
    title: "",
    description: "",
    isActive: true,
  });

  const {
    data: steps = [],
    isLoading,
  } = useQuery<ProcessStep[]>({
    queryKey: ["processSteps"],
    queryFn: api.getProcessSteps,
  });

  const createMutation = useMutation({
    mutationFn: api.createProcessStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processSteps"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteProcessStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["processSteps"] });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const isNumberField = name === "number" || name === "order";
    setForm((prev) => ({
      ...prev,
      [name]: isNumberField ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form);
  };

  const resetForm = () => {
    setForm({
      order: (steps.length || 0) + 1,
      number: (steps.length || 0) + 1,
      iconName: "",
      title: "",
      description: "",
      isActive: true,
    });
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold">Process Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
        <Input
          name="order"
          type="number"
          value={form.order}
          onChange={handleChange}
          placeholder="Step Order"
        />
        <Input
          name="number"
          type="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Step Number"
        />
        <Input
          name="iconName"
          value={form.iconName}
          onChange={handleChange}
          placeholder="Icon Name (lucide)"
        />
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Saving..." : "Add Step"}
        </Button>
      </form>

      <div className="space-y-4">
        {sortedSteps.map((step) => (
          <div
            key={step.id}
            className="border rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">
                {step.order}. {step.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
              <p className="text-xs">
                Status: {step.isActive ? "Active" : "Inactive"}
              </p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate(step.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}