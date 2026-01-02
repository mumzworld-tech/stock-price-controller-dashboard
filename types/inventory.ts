import { CountryCode } from './country-code';

export interface InventoryItem {
  id: string;
  sku: string;
  countryCode: string;
  fulfillmentModelId: string;
  vendorId: number;
  vendorName: string;
  vendorPriority: number;
  origin: string;
  quantity: number | null;
  sellingPrice: number | null;
  costPrice: number | null;
  promoPrice: number | null;
  promoStartDate: string | null;
  promoEndDate: string | null;
  shippingTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  inventoryTrackingId: string;
  fulfillmentModel: {
    fulfillmentModel: string;
    priority: number;
  };
  sourceCode: string;
}

export type InventoryFilters = {
  sku: string;
  countryCode: CountryCode | '';
  vendor: string;
  fulfillmentModel: string[];
  page: number;
  limit: number;
};

export const DEFAULT_INVENTORY_FILTERS: InventoryFilters = {
  sku: '',
  countryCode: '',
  vendor: '',
  fulfillmentModel: [],
  page: 1,
  limit: 10,
};
