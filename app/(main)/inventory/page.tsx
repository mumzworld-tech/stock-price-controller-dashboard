import { Package } from 'lucide-react';
import { Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { InventoryTableClient } from './components/inventory-table-client';

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-9 w-[180px]" />
        <Skeleton className="h-9 w-[120px]" />
        <Skeleton className="h-9 w-[180px]" />
        <Skeleton className="h-9 w-[150px]" />
      </div>
      <div className="rounded-md border">
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
      <div>
        <div className="flex items-center gap-2">
          <Package />
          <h1 className="text-2xl font-bold mb-0">Inventory</h1>
        </div>
        <p className="text-muted-foreground">Manage stock and price</p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <InventoryTableClient />
      </Suspense>
    </div>
  );
}
