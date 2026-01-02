'use client';

import { ColumnDef, VisibilityState } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { formatDate, formatDateTime } from '@/lib/utils';
import { InventoryItem } from '@/types/inventory';
import { CircleDollarSign, Package } from 'lucide-react';

function renderDateTime(dateString: string | null) {
  const formatted = formatDateTime(dateString);
  if (!formatted) return '-';

  return (
    <div className="flex flex-col">
      <span>{formatted.relativeTime}</span>
      <span className="text-muted-foreground">{formatted.fullDateTime}</span>
    </div>
  );
}

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
  { accessorKey: 'id', header: 'ID', meta: { copyable: true } },
  { accessorKey: 'sku', header: 'SKU', meta: { copyable: true } },
  { accessorKey: 'countryCode', header: 'Country' },
  {
    id: 'fulfillmentModel',
    accessorFn: (row) => row.fulfillmentModel?.fulfillmentModel ?? '-',
    header: 'Fulfillment Model',
  },
  { accessorKey: 'sourceCode', header: 'Source Code', meta: { copyable: true } },
  { accessorKey: 'vendorId', header: 'Vendor ID', meta: { copyable: true } },
  { accessorKey: 'vendorName', header: 'Vendor', meta: { copyable: true } },
  { accessorKey: 'vendorPriority', header: 'Vendor Priority', meta: { copyable: true } },
  { accessorKey: 'origin', header: 'Origin', meta: { copyable: true } },
  {
    accessorKey: 'quantity',
    header: 'Stock',
    cell: ({ row }) => {
      const stock = row.original.quantity?.toLocaleString();
      if (!stock) return '-';
      return (
        <Badge variant="secondary" className="text-orange-400 bg-orange-400/20">
          <Package />
          {stock}
        </Badge>
      );
    },
    meta: { copyable: true },
  },
  {
    accessorKey: 'sellingPrice',
    header: 'Selling Price',
    cell: ({ row }) => {
      const price = row.original.sellingPrice;
      if (price === null) return '-';
      const formattedPrice = formatPrice(price);
      return (
        <Badge variant="secondary" className="text-green-400 bg-green-400/10">
          <CircleDollarSign />
          {formattedPrice}
        </Badge>
      );
    },
    meta: { copyable: true },
  },
  {
    accessorKey: 'costPrice',
    header: 'Cost Price',
    cell: ({ row }) => {
      const price = row.original.costPrice;
      if (price === null) return '-';
      const formattedPrice = formatPrice(price);
      return (
        <Badge variant="secondary" className="text-green-400 bg-green-400/10">
          <CircleDollarSign />
          {formattedPrice}
        </Badge>
      );
    },
    meta: { copyable: true },
  },
  {
    accessorKey: 'promoPrice',
    header: 'Promo Price',
    cell: ({ row }) => {
      const price = row.original.promoPrice;
      if (price === null) return '-';
      const formattedPrice = formatPrice(price);
      return (
        <Badge variant="secondary" className="text-green-400 bg-green-400/10">
          <CircleDollarSign />
          {formattedPrice}
        </Badge>
      );
    },
    meta: { copyable: true },
  },
  {
    accessorKey: 'promoStartDate',
    header: 'Promo Start',
    cell: ({ row }) => formatDate(row.original.promoStartDate),
    meta: { copyable: true },
  },
  {
    accessorKey: 'promoEndDate',
    header: 'Promo End',
    cell: ({ row }) => formatDate(row.original.promoEndDate),
    meta: { copyable: true },
  },
  { accessorKey: 'shippingTime', header: 'Shipping Time', meta: { copyable: true } },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => (row.original.isActive ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => renderDateTime(row.original.createdAt),
    meta: { copyable: true },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => renderDateTime(row.original.updatedAt),
    meta: { copyable: true },
  },
  {
    accessorKey: 'deletedAt',
    header: 'Deleted At',
    cell: ({ row }) => renderDateTime(row.original.deletedAt),
    meta: { copyable: true },
  },
  { accessorKey: 'inventoryTrackingId', header: 'Tracking ID', meta: { copyable: true } },
];

export const defaultColumnVisibility: VisibilityState = {
  id: false,
  sku: true,
  countryCode: true,
  fulfillmentModel: true,
  sourceCode: false,
  vendorId: false,
  vendorName: true,
  vendorPriority: false,
  origin: true,
  quantity: true,
  sellingPrice: true,
  costPrice: false,
  promoPrice: true,
  promoStartDate: true,
  promoEndDate: true,
  shippingTime: true,
  isActive: false,
  createdAt: false,
  updatedAt: true,
  deletedAt: false,
  inventoryTrackingId: false,
};
