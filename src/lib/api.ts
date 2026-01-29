const API_BASE = "/api";
/* ================= BASE ================= */

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

async function mutateAPI<T>(
  endpoint: string,
  method: string,
  data?: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) throw new Error("Network error");
  return res.json();
}

/* ================= AUTH ================= */

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}

/* ================= HERO ================= */

export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  image: string;
}

/* ================= HEADER ================= */

export interface HeaderData {
  logoText: string;
  logoFullText: string;
  mode: "fixed" | "sticky";
}

/* ================= NAV ================= */

export interface NavLink {
  id: string;
  href: string;
  label: string;
  order: number;
  active: boolean;
}

export interface NavLinkForm {
  href: string;
  label: string;
  order: number;
  active: boolean;
}

/* ================= ABOUT ================= */

export interface AboutFormData {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  whyChooseUs: string[];
}

/* ================= CTA ================= */

export interface CTAData {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText: string;
  phone: string;
  email: string;
  location: string;
}

/* ================= FOOTER ================= */

export interface FooterData {
  description: string;
  phone: string;
  email: string;
  location: string;
  copyright: string;
  socialMedia: {
    name: string;
    url: string;
  }[];
}

/* ================= PROCESS (PENTING) ================= */

export interface ProcessStep {
  id: string;
  number: number;
  iconName: string;
  title: string;
  description: string;
  isActive: boolean;
  order: number;
}

export interface ProcessFormData {
  number: number;
  iconName: string;
  title: string;
  description: string;
  isActive: boolean;
  order: number;
}

/* ================= SERVICES ================= */

export interface Service {
  id: string;
  iconName: string;
  title: string;
  description: string;
  features: string[];
  order: number;
}

export interface ServiceFormData {
  iconName: string;
  title: string;
  description: string;
  features: string[];
  order: number;
}

/* ================= TESTIMONIALS ================= */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  institution: string;
  rating: number;
}

export interface TestimonialFormData {
  quote: string;
  name: string;
  role: string;
  institution: string;
  rating: number;
}

/* ================= BENEFITS ================= */

export interface Benefit {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface BenefitFormData {
  iconName: string;
  title: string;
  description: string;
}

/* ================= API ================= */

export const api = {
  /* ===== AUTH ===== */
  login: async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const users = await fetchAPI<User[]>(
      `/users?email=${email}&password=${password}`
    );
    return users[0] ?? null;
  },

  /* ===== HERO ===== */
  getHero: () => fetchAPI<HeroData>("/hero"),
  updateHero: (data: Partial<HeroData>) =>
    mutateAPI<HeroData>("/hero", "PATCH", data),

  /* ===== PROCESS ===== */
  getProcessSteps: () =>
    fetchAPI<ProcessStep[]>("/processSteps"),

  createProcessStep: (data: ProcessFormData) =>
    mutateAPI<ProcessStep>("/processSteps", "POST", data),

  updateProcessStep: (id: string, data: ProcessFormData) =>
    mutateAPI<ProcessStep>(`/processSteps/${id}`, "PUT", data),

  deleteProcessStep: (id: string) =>
    mutateAPI<void>(`/processSteps/${id}`, "DELETE"),

  /* ===== NAV ===== */
  getNavLinks: () => fetchAPI<NavLink[]>("/navLinks"),
  createNavLink: (data: NavLinkForm) =>
    mutateAPI<NavLink>("/navLinks", "POST", data),
  updateNavLink: (id: string, data: NavLinkForm) =>
    mutateAPI<NavLink>(`/navLinks/${id}`, "PUT", data),
  deleteNavLink: (id: string) =>
    mutateAPI<void>(`/navLinks/${id}`, "DELETE"),

  /* ===== ABOUT ===== */
  getAbout: () => fetchAPI<AboutFormData>("/about"),
  updateAbout: (data: Partial<AboutFormData>) =>
    mutateAPI<AboutFormData>("/about", "PATCH", data),

  /* ===== CTA ===== */
  getCTA: () => fetchAPI<CTAData>("/cta"),
  updateCTA: (data: Partial<CTAData>) =>
    mutateAPI<CTAData>("/cta", "PATCH", data),

  /* ===== HEADER ===== */
  getHeader: () => fetchAPI<HeaderData>("/header"),
  updateHeader: (data: HeaderData) =>
    mutateAPI<HeaderData>("/header", "PATCH", data),

  /* ===== FOOTER ===== */
  getFooter: () => fetchAPI<FooterData>("/footer"),
  updateFooter: (data: Partial<FooterData>) =>
    mutateAPI<FooterData>("/footer", "PATCH", data),

  /* ===== SERVICES ===== */
  getServices: () => fetchAPI<Service[]>("/services"),
  createService: (data: ServiceFormData) =>
    mutateAPI<Service>("/services", "POST", data),
  updateService: (id: string, data: ServiceFormData) =>
    mutateAPI<Service>(`/services/${id}`, "PUT", data),
  deleteService: (id: string) =>
    mutateAPI<void>(`/services/${id}`, "DELETE"),

  /* ===== BENEFITS ===== */
  getBenefits: () => fetchAPI<Benefit[]>("/benefits"),
  createBenefit: (data: BenefitFormData) =>
    mutateAPI<Benefit>("/benefits", "POST", data),
  updateBenefit: (id: string, data: BenefitFormData) =>
    mutateAPI<Benefit>(`/benefits/${id}`, "PUT", data),
  deleteBenefit: (id: string) =>
    mutateAPI<void>(`/benefits/${id}`, "DELETE"),

  /* ===== TESTIMONIALS ===== */
  getTestimonials: () => fetchAPI<Testimonial[]>("/testimonials"),
  createTestimonial: (data: TestimonialFormData) =>
    mutateAPI<Testimonial>("/testimonials", "POST", data),
  updateTestimonial: (id: string, data: TestimonialFormData) =>
    mutateAPI<Testimonial>(`/testimonials/${id}`, "PUT", data),
  deleteTestimonial: (id: string) =>
    mutateAPI<void>(`/testimonials/${id}`, "DELETE"),

};