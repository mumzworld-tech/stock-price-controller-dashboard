'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useEffect, useRef, useState } from 'react';

import { DataTable, DataTablePagination, DataTableViewOptions } from '@/components/data-table';
import { useTableState } from '@/hooks/use-table-state';
import { useUrlParams } from '@/hooks/use-url-params';
import { DEFAULT_INVENTORY_FILTERS, InventoryFilters, InventoryItem } from '@/types/inventory';
import { ApiPagination, mapApiPagination } from '@/types/pagination';

import { fetchInventory, InventoryResponse } from '../actions';
import { defaultColumnVisibility, inventoryColumns } from './inventory-columns';
import { InventoryFilters as InventoryFiltersComponent } from './inventory-filters';

export function InventoryTableClient() {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [pagination, setPagination] = useState<ApiPagination | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { params, setParam, resetParams } = useUrlParams<InventoryFilters>({
    defaults: DEFAULT_INVENTORY_FILTERS,
    arrayKeys: ['fulfillmentModel'],
  });

  const {
    columnVisibility,
    columnOrder,
    columnSizing,
    onColumnVisibilityChange,
    onColumnOrderChange,
    onColumnSizingChange,
  } = useTableState({
    key: 'inventory',
    defaultVisibility: defaultColumnVisibility,
  });

  const table = useReactTable({
    data,
    columns: inventoryColumns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    state: {
      columnVisibility,
      columnOrder,
      columnSizing,
    },
    onColumnVisibilityChange,
    onColumnOrderChange,
    onColumnSizingChange,
  });

  // Create a stable key from params for dependency tracking
  const paramsKey = JSON.stringify(params);

  // Fetch inventory data when params change
  useEffect(() => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response: InventoryResponse = await fetchInventory(params);

        if (response.success) {
          setData(response.data);
          setPagination(response.pagination);
        } else {
          setError(response.message || 'Failed to fetch inventory');
          setData([]);
          setPagination(null);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
        setIsInitialLoading(false);
      }
    };

    loadData();

    return () => {
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  const handleFilterChange = useCallback(
    <K extends keyof InventoryFilters>(key: K, value: InventoryFilters[K]) => {
      setParam(key, value);
    },
    [setParam],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setParam('page', page);
    },
    [setParam],
  );

  const handleLimitChange = useCallback(
    (limit: number) => {
      setParam('limit', limit);
    },
    [setParam],
  );

  // Map API pagination to component format
  const mappedPagination = pagination ? mapApiPagination(pagination) : null;

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <InventoryFiltersComponent filters={params} onFilterChange={handleFilterChange} onReset={resetParams} />
        <DataTableViewOptions table={table} />
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-destructive">
          <p>{error}</p>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border bg-white dark:bg-muted/50 overflow-hidden">
        <DataTable table={table} columns={inventoryColumns} isInitialLoading={isInitialLoading} isLoading={isLoading} />
      </div>
      <DataTablePagination
        pagination={mappedPagination}
        limit={params.limit}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
}
