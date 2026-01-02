import { InventoryFilters } from '@/types/inventory';

export function buildInventoryQueryString(filters: InventoryFilters): string {
  const params = new URLSearchParams();

  params.set('page', String(filters.page));
  params.set('limit', String(filters.limit));

  if (filters.sku) params.set('sku', filters.sku);
  if (filters.countryCode) params.set('countryCode', filters.countryCode);
  if (filters.vendor) params.set('vendor', filters.vendor);

  // Handle array of fulfillment models
  if (filters.fulfillmentModel.length > 0) {
    filters.fulfillmentModel.forEach((fm) => {
      params.append('fulfillmentModel', fm);
    });
  }

  return params.toString();
}
