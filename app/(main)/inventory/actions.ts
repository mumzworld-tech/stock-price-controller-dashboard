'use server';

import { InventoryFilters, InventoryItem } from '@/types/inventory';
import { ApiPagination } from '@/types/pagination';
import { buildInventoryQueryString } from './utils';

interface InventoryApiResponse {
  success: boolean;
  message: string | null;
  data: InventoryItem[];
  pagination: ApiPagination;
}

export interface InventoryResponse {
  success: boolean;
  message: string | null;
  data: InventoryItem[];
  pagination: ApiPagination | null;
}

export async function fetchInventory(filters: InventoryFilters): Promise<InventoryResponse> {
  const baseUrl = process.env.SPCS_API_URL;
  const apiKey = process.env.SPCS_API_KEY;

  if (!baseUrl || !apiKey) {
    return {
      success: false,
      message: 'API configuration missing',
      data: [],
      pagination: null,
    };
  }

  const queryString = buildInventoryQueryString(filters);
  const url = `${baseUrl}/inventory?${queryString}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-KEY': apiKey,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        message: `API error: ${response.status}`,
        data: [],
        pagination: null,
      };
    }

    const json: InventoryApiResponse = await response.json();

    return {
      success: json.success,
      message: json.message,
      data: json.data,
      pagination: json.pagination ?? null,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch inventory',
      data: [],
      pagination: null,
    };
  }
}
