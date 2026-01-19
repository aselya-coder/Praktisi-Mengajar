const API_BASE = 'http://localhost:3001';

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json() as Promise<T>;
}

async function mutateAPI<T>(
  endpoint: string,
  method: string,
  data?: any
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json() as Promise<T>;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    fetchAPI<any[]>(`/users?email=${email}&password=${password}`),

  // Hero
  getHero: () => fetchAPI<any>('/hero'),
  updateHero: (data: any) => mutateAPI<any>('/hero', 'PATCH', data),

  // Services
  getServices: () => fetchAPI<any[]>('/services'),
  createService: (data: any) => mutateAPI<any>('/services', 'POST', data),
  updateService: (id: string, data: any) =>
    mutateAPI<any>(`/services/${id}`, 'PUT', data),
  deleteService: (id: string) => mutateAPI<any>(`/services/${id}`, 'DELETE'),

  // Benefits
  getBenefits: () => fetchAPI<any[]>('/benefits'),
  createBenefit: (data: any) => mutateAPI<any>('/benefits', 'POST', data),
  updateBenefit: (id: string, data: any) =>
    mutateAPI<any>(`/benefits/${id}`, 'PUT', data),
  deleteBenefit: (id: string) => mutateAPI<any>(`/benefits/${id}`, 'DELETE'),

  // Process Steps
  getProcessSteps: () => fetchAPI<any[]>('/processSteps'),
  createProcessStep: (data: any) => mutateAPI<any>('/processSteps', 'POST', data),
  updateProcessStep: (id: string, data: any) =>
    mutateAPI<any>(`/processSteps/${id}`, 'PUT', data),
  deleteProcessStep: (id: string) => mutateAPI<any>(`/processSteps/${id}`, 'DELETE'),

  // Testimonials
  getTestimonials: () => fetchAPI<any[]>('/testimonials'),
  createTestimonial: (data: any) => mutateAPI<any>('/testimonials', 'POST', data),
  updateTestimonial: (id: string, data: any) =>
    mutateAPI<any>(`/testimonials/${id}`, 'PUT', data),
  deleteTestimonial: (id: string) =>
    mutateAPI<any>(`/testimonials/${id}`, 'DELETE'),

  // About
  getAbout: () => fetchAPI<any>('/about'),
  updateAbout: (data: any) => mutateAPI<any>('/about', 'PATCH', data),

  // CTA
  getCTA: () => fetchAPI<any>('/cta'),
  updateCTA: (data: any) => mutateAPI<any>('/cta', 'PATCH', data),

  // Header
  getHeader: () => fetchAPI<any>('/header'),
  updateHeader: (data: any) => mutateAPI<any>('/header', 'PATCH', data),

  // Nav Links
  getNavLinks: () => fetchAPI<any[]>('/navLinks'),
  createNavLink: (data: any) => mutateAPI<any>('/navLinks', 'POST', data),
  updateNavLink: (id: string, data: any) =>
    mutateAPI<any>(`/navLinks/${id}`, 'PUT', data),
  deleteNavLink: (id: string) => mutateAPI<any>(`/navLinks/${id}`, 'DELETE'),

  // Footer
  getFooter: () => fetchAPI<any>('/footer'),
  updateFooter: (data: any) => mutateAPI<any>('/footer', 'PATCH', data),
};
