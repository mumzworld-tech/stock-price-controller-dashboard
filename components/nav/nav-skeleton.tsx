import { SidebarMenu, SidebarMenuItem, SidebarMenuSkeleton } from '@/components/ui/sidebar';

export function NavSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuSkeleton showIcon />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
