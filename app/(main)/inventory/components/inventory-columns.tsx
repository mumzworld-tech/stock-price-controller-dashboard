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
    cell: ({ row }) => row.original.quantity?.toLocaleString() ?? '-',
    meta: { copyable: true },
  },
  {
    accessorKey: 'sellingPrice',
    header: 'Selling Price',
    cell: ({ row }) => formatPrice(row.original.sellingPrice),
    meta: { copyable: true },
  },
  {
    accessorKey: 'costPrice',
    header: 'Cost Price',
    cell: ({ row }) => formatPrice(row.original.costPrice),
    meta: { copyable: true },
  },
  {
    accessorKey: 'promoPrice',
    header: 'Promo Price',
    cell: ({ row }) => formatPrice(row.original.promoPrice),
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
    header: 'Created',
    cell: ({ row }) => formatDateTime(row.original.createdAt),
    meta: { copyable: true },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => formatDateTime(row.original.updatedAt),
    meta: { copyable: true },
  },
  {
    accessorKey: 'deletedAt',
    header: 'Deleted',
    cell: ({ row }) => formatDateTime(row.original.deletedAt),
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
