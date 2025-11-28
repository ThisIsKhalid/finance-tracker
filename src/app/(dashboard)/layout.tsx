import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="bg-background text-foreground w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
