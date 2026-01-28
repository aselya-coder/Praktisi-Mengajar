import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, HeroData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function HeroManagement() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<HeroData>({
    badge: "",
    title: "",
    subtitle: "",
    description: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    image: "",
  });

  /* ===== GET HERO DATA ===== */
  const { data, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: api.getHero,
  });

  /* ===== UPDATE HERO ===== */
  const mutation = useMutation({
    mutationFn: api.updateHero,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hero"] });
      alert("Hero berhasil diperbarui ✅");
    },
  });

  /* ===== SYNC DATA ===== */
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  /* ===== HANDLER ===== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold">Hero Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="badge"
          value={form.badge}
          onChange={handleChange}
          placeholder="Badge"
        />

        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <Input
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
        />

        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <Input
          name="primaryButtonText"
          value={form.primaryButtonText}
          onChange={handleChange}
          placeholder="Primary Button Text"
        />

        <Input
          name="primaryButtonLink"
          value={form.primaryButtonLink}
          onChange={handleChange}
          placeholder="Primary Button Link"
        />

        <Input
          name="secondaryButtonText"
          value={form.secondaryButtonText}
          onChange={handleChange}
          placeholder="Secondary Button Text"
        />

        <Input
          name="secondaryButtonLink"
          value={form.secondaryButtonLink}
          onChange={handleChange}
          placeholder="Secondary Button Link"
        />

        <Input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </div>
  );
}
