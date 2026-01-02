'use client';

import { ColumnOrderState, ColumnSizingState, VisibilityState } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';

interface TableState {
  columnVisibility: VisibilityState;
  columnOrder: ColumnOrderState;
  columnSizing: ColumnSizingState;
}

interface UseTableStateOptions {
  key: string;
  defaultVisibility: VisibilityState;
  defaultOrder?: ColumnOrderState;
  pinnedLeft?: string[];
  pinnedRight?: string[];
  minColumnSize?: number;
}

// Ensures pinned columns stay in their positions
function enforceColumnOrder(order: ColumnOrderState, pinnedLeft: string[], pinnedRight: string[]): ColumnOrderState {
  if (order.length === 0) return order;

  // Remove pinned columns from the order
  const middleColumns = order.filter((col) => !pinnedLeft.includes(col) && !pinnedRight.includes(col));

  // Reconstruct order with pinned columns at their positions
  return [...pinnedLeft, ...middleColumns, ...pinnedRight];
}

// Ensures column sizes respect minimum
function enforceMinColumnSize(sizing: ColumnSizingState, minSize: number): ColumnSizingState {
  const enforced: ColumnSizingState = {};
  for (const [col, size] of Object.entries(sizing)) {
    enforced[col] = Math.max(size, minSize);
  }
  return enforced;
}

export function useTableState({
  key,
  defaultVisibility,
  defaultOrder = [],
  pinnedLeft = [],
  pinnedRight = [],
  minColumnSize = 60,
}: UseTableStateOptions) {
  const storageKey = `table-state-${key}`;

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultVisibility);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(defaultOrder);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoize pinned arrays to prevent infinite loops
  const pinnedLeftKey = pinnedLeft.join(',');
  const pinnedRightKey = pinnedRight.join(',');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed: TableState = JSON.parse(stored);
        if (parsed.columnVisibility) setColumnVisibility(parsed.columnVisibility);
        if (parsed.columnOrder) {
          setColumnOrder(enforceColumnOrder(parsed.columnOrder, pinnedLeft, pinnedRight));
        }
        if (parsed.columnSizing) setColumnSizing(enforceMinColumnSize(parsed.columnSizing, minColumnSize));
      }
    } catch (e) {
      console.error('Failed to load table state:', e);
    }
    setIsLoaded(true);
  }, [storageKey, pinnedLeftKey, pinnedRightKey]);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;

    try {
      const state: TableState = { columnVisibility, columnOrder, columnSizing };
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save table state:', e);
    }
  }, [storageKey, columnVisibility, columnOrder, columnSizing, isLoaded]);

  const handleVisibilityChange = useCallback(
    (updater: VisibilityState | ((old: VisibilityState) => VisibilityState)) => {
      setColumnVisibility((prev) => (typeof updater === 'function' ? updater(prev) : updater));
    },
    [],
  );

  const handleOrderChange = useCallback(
    (updater: ColumnOrderState | ((old: ColumnOrderState) => ColumnOrderState)) => {
      setColumnOrder((prev) => {
        const newOrder = typeof updater === 'function' ? updater(prev) : updater;
        return enforceColumnOrder(newOrder, pinnedLeft, pinnedRight);
      });
    },
    [pinnedLeftKey, pinnedRightKey],
  );

  const handleSizingChange = useCallback(
    (updater: ColumnSizingState | ((old: ColumnSizingState) => ColumnSizingState)) => {
      setColumnSizing((prev) => {
        const newSizing = typeof updater === 'function' ? updater(prev) : updater;
        return enforceMinColumnSize(newSizing, minColumnSize);
      });
    },
    [minColumnSize],
  );

  return {
    columnVisibility,
    columnOrder,
    columnSizing,
    onColumnVisibilityChange: handleVisibilityChange,
    onColumnOrderChange: handleOrderChange,
    onColumnSizingChange: handleSizingChange,
    isLoaded,
  };
}
