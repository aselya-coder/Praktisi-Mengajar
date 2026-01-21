const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3002";

async function fetchAPI<T = unknown>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json() as Promise<T>;
}

async function mutateAPI<T = unknown>(
  endpoint: string,
  method: string,
  data?: unknown
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json() as Promise<T>;
}

export const api = {
  login: (email: string, password: string) =>
    fetchAPI<unknown[]>(`/users?email=${email}&password=${password}`),

  getHero: () => fetchAPI<unknown>("/hero"),
  updateHero: (data: unknown) => mutateAPI("/hero", "PATCH", data),

  getServices: () => fetchAPI<unknown[]>("/services"),
  createService: (data: unknown) => mutateAPI("/services", "POST", data),
  updateService: (id: string, data: unknown) =>
    mutateAPI(`/services/${id}`, "PUT", data),
  deleteService: (id: string) =>
    mutateAPI(`/services/${id}`, "DELETE"),

  getBenefits: () => fetchAPI<unknown[]>("/benefits"),
  createBenefit: (data: unknown) => mutateAPI("/benefits", "POST", data),
  updateBenefit: (id: string, data: unknown) =>
    mutateAPI(`/benefits/${id}`, "PUT", data),
  deleteBenefit: (id: string) =>
    mutateAPI(`/benefits/${id}`, "DELETE"),

  getProcessSteps: () => fetchAPI<unknown[]>("/processSteps"),
  createProcessStep: (data: unknown) =>
    mutateAPI("/processSteps", "POST", data),
  updateProcessStep: (id: string, data: unknown) =>
    mutateAPI(`/processSteps/${id}`, "PUT", data),
  deleteProcessStep: (id: string) =>
    mutateAPI(`/processSteps/${id}`, "DELETE"),

  getTestimonials: () => fetchAPI<unknown[]>("/testimonials"),
  createTestimonial: (data: unknown) =>
    mutateAPI("/testimonials", "POST", data),
  updateTestimonial: (id: string, data: unknown) =>
    mutateAPI(`/testimonials/${id}`, "PUT", data),
  deleteTestimonial: (id: string) =>
    mutateAPI(`/testimonials/${id}`, "DELETE"),

  getAbout: () => fetchAPI<unknown>("/about"),
  updateAbout: (data: unknown) => mutateAPI("/about", "PATCH", data),

  getCTA: () => fetchAPI<unknown>("/cta"),
  updateCTA: (data: unknown) => mutateAPI("/cta", "PATCH", data),

  getHeader: () => fetchAPI<unknown>("/header"),
  updateHeader: (data: unknown) => mutateAPI("/header", "PATCH", data),

  getNavLinks: () => fetchAPI<unknown[]>("/navLinks"),
  createNavLink: (data: unknown) => mutateAPI("/navLinks", "POST", data),
  updateNavLink: (id: string, data: unknown) =>
    mutateAPI(`/navLinks/${id}`, "PUT", data),
  deleteNavLink: (id: string) =>
    mutateAPI(`/navLinks/${id}`, "DELETE"),

  getFooter: () => fetchAPI<unknown>("/footer"),
  updateFooter: (data: unknown) => mutateAPI("/footer", "PATCH", data),
};
