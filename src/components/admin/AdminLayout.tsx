import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Image,
  Briefcase,
  GitBranch,
  MessageSquare,
  Info,
  Phone,
  Navigation,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Image, label: "Hero Section", path: "/admin/hero" },
    { icon: Briefcase, label: "Services", path: "/admin/services" },
    { icon: GitBranch, label: "Process Steps", path: "/admin/process" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
    { icon: Info, label: "About", path: "/admin/about" },
    { icon: Phone, label: "CTA & Contact", path: "/admin/cta" },
    { icon: Navigation, label: "Header & Nav", path: "/admin/header" },
    { icon: Settings, label: "Footer", path: "/admin/footer" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">PM</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Praktisi Mengajar</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border transition-transform duration-300 z-30 overflow-y-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "pt-16 transition-all duration-300",
          sidebarOpen ? "lg:pl-64" : ""
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
