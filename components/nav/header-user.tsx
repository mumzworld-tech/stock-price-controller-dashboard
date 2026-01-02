'use client';

import { UserDropdownContent } from '@/components/nav/nav-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSession } from '@/lib/auth-client';
import { getUserInitials } from '@/lib/utils';
import { NavItemUser } from './interfaces/nav.interface';

export function HeaderUser() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />;
  }

  if (!session?.user) return;

  const userData = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image as string,
  } satisfies NavItemUser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 overflow-hidden">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userData.image} alt={userData.name} />
            <AvatarFallback className="bg-white dark:bg-muted">{getUserInitials(userData.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <UserDropdownContent user={userData} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
