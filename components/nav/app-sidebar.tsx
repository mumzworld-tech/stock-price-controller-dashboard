'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { navRouteGroups } from '@/components/nav/data/nav-routes';
import { NavGroup } from '@/components/nav/nav-group';
import { NavSkeleton } from '@/components/nav/nav-skeleton';
import { NavUser } from '@/components/nav/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSession } from '@/lib/auth-client';
import Logo from '@/public/img/logo.png';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = useSession();

  const userData = session?.user
    ? {
        name: session.user.name || 'User',
        email: session.user.email || '',
        image: session.user.image || undefined,
      }
    : null;

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src={Logo} alt="Logo" width={36} height={36} className="rounded-sm" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Inventory</span>
                  <span className="truncate text-xs">Mumzworld</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navRouteGroups.map((group, index) => (
          <NavGroup key={index} title={group.title} items={group.routes} />
        ))}
      </SidebarContent>
      <SidebarFooter>{isPending ? <NavSkeleton /> : userData && <NavUser user={userData} />}</SidebarFooter>
    </Sidebar>
  );
}
