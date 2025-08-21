import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="bg-background text-foreground">
      <SidebarHeader className="h-16 border-b border-border flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center text-primary uppercase">
          Dashboard
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
         
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
