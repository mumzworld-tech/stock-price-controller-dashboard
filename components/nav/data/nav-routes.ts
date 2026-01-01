import { LayoutDashboard, Logs, Package, Store } from 'lucide-react';

import { NavItem } from '@/components/nav/interfaces/nav.interface';

interface NavRouteGroup {
  title?: string;
  routes: NavItem[];
}

export const navRouteGroups: NavRouteGroup[] = [
  {
    routes: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Inventory',
        url: '/inventory',
        icon: Package,
      },
      {
        title: 'Storefront',
        url: '/storefront',
        icon: Store,
      },
      {
        title: 'Audit',
        url: '/audit',
        icon: Logs,
      },
    ],
  },
];
