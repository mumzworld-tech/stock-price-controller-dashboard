import { SearchIcon } from 'lucide-react';
import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/nav/app-sidebar';
import { Header } from '@/components/nav/header';
import { HeaderUser } from '@/components/nav/header-user';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  return (
    <SidebarProvider
      className="bg-[#fafafa] dark:bg-background"
      defaultOpen={cookieStore.get('sidebar_state')?.value === 'true'}
    >
      <AppSidebar />
      <SidebarInset className="bg-transparent">
        <Header>
          <SidebarTrigger />

          <InputGroup className="bg-white max-w-100">
            <InputGroupInput placeholder="Search" disabled />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <HeaderUser />
          </div>
        </Header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
