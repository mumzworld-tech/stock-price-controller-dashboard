'use client';

import { ColumnDef, VisibilityState } from '@tanstack/react-table';
import { DateTime } from 'luxon';

import { InventoryItem } from '@/types/inventory';

function formatDate(dateString: string | null): string {
  if (!dateString) return '-';
  const dt = DateTime.fromISO(dateString);
  return dt.isValid ? dt.toFormat('MMM d, yyyy') : '-';
}

function formatDateTime(dateString: string | null): string {
  if (!dateString) return '-';
  const dt = DateTime.fromISO(dateString);
  return dt.isValid ? dt.toFormat('MMM d, yyyy HH:mm') : '-';
}

function formatPrice(price: number | null): string {
  if (price === null) return '-';
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'sku', header: 'SKU' },
  { accessorKey: 'countryCode', header: 'Country' },
  {
    id: 'fulfillmentModel',
    accessorFn: (row) => row.fulfillmentModel?.fulfillmentModel ?? '-',
    header: 'Fulfillment Model',
  },
  { accessorKey: 'sourceCode', header: 'Source Code' },
  { accessorKey: 'vendorId', header: 'Vendor ID' },
  { accessorKey: 'vendorName', header: 'Vendor' },
  { accessorKey: 'vendorPriority', header: 'Vendor Priority' },
  { accessorKey: 'origin', header: 'Origin' },
  {
    accessorKey: 'quantity',
    header: 'Stock',
    cell: ({ row }) => row.original.quantity?.toLocaleString() ?? '-',
  },
  {
    accessorKey: 'sellingPrice',
    header: 'Selling Price',
    cell: ({ row }) => formatPrice(row.original.sellingPrice),
  },
  {
    accessorKey: 'costPrice',
    header: 'Cost Price',
    cell: ({ row }) => formatPrice(row.original.costPrice),
  },
  {
    accessorKey: 'promoPrice',
    header: 'Promo Price',
    cell: ({ row }) => formatPrice(row.original.promoPrice),
  },
  {
    accessorKey: 'promoStartDate',
    header: 'Promo Start',
    cell: ({ row }) => formatDate(row.original.promoStartDate),
  },
  {
    accessorKey: 'promoEndDate',
    header: 'Promo End',
    cell: ({ row }) => formatDate(row.original.promoEndDate),
  },
  { accessorKey: 'shippingTime', header: 'Shipping Time' },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => (row.original.isActive ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => formatDateTime(row.original.updatedAt),
  },
  {
    accessorKey: 'deletedAt',
    header: 'Deleted',
    cell: ({ row }) => formatDateTime(row.original.deletedAt),
  },
  { accessorKey: 'inventoryTrackingId', header: 'Tracking ID' },
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
