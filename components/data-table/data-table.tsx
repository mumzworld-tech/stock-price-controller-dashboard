'use client';

import { ColumnDef, flexRender, Header, Table as TanstackTable } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';

import { CopyText } from '@/components/ui/copy-text';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface ColumnMeta {
  className?: string;
  copyable?: boolean;
}

const DEFAULT_MIN_COLUMN_SIZE = 60;

interface DataTableProps<TData, TValue> {
  table: TanstackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  isInitialLoading?: boolean;
  isLoading?: boolean;
}

function ColumnResizer<TData>({ header }: { header: Header<TData, unknown> }) {
  return (
    <div
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      className="absolute top-0 right-0 h-full w-4 cursor-col-resize select-none touch-none z-10"
    />
  );
}

export function DataTable<TData, TValue>({
  table,
  columns,
  isInitialLoading,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const showSkeleton = isInitialLoading;
  const showLoadingBar = isLoading && !isInitialLoading;
  const headerRef = useRef<HTMLTableSectionElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // Get the ID of the column currently being resized
  const resizingColumnId = table.getState().columnSizingInfo.isResizingColumn;

  const columnSizeVars = (() => {
    const headers = table.getFlatHeaders();
    const colSizes: Record<string, number> = {};
    headers.forEach((header) => {
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    });
    return colSizes;
  })();

  return (
    <div className="relative overflow-x-auto">
      {showLoadingBar && headerHeight > 0 && (
        <div className="absolute left-0 right-0 h-[3px] overflow-hidden z-10" style={{ top: headerHeight }}>
          <div className="h-full w-full bg-primary/20" />
          <div className="absolute top-0 h-full w-1/4 bg-primary animate-[loading_1s_ease-in-out_infinite]" />
        </div>
      )}
      <Table ref={tableRef} style={{ ...columnSizeVars, width: table.getTotalSize() }}>
        <TableHeader ref={headerRef}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as ColumnMeta | undefined;
                const isResizing = header.column.getIsResizing();
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'group relative flex items-center overflow-hidden',
                      'hover:border-r-2 hover:border-dashed hover:border-primary',
                      isResizing && 'border-r-2 border-dashed border-primary',
                      meta?.className,
                    )}
                    style={{
                      width: `calc(var(--header-${header.id}-size) * 1px)`,
                      minWidth: header.column.columnDef.minSize ?? DEFAULT_MIN_COLUMN_SIZE,
                    }}
                  >
                    <span className="truncate">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                    <ColumnResizer header={header} />
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {showSkeleton ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="flex w-full">
                {columns.map((col, j) => (
                  <TableCell
                    key={j}
                    style={{
                      width: `calc(var(--col-${(col as { accessorKey?: string }).accessorKey || col.id || j}-size) * 1px)`,
                    }}
                  >
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="flex w-full">
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as ColumnMeta | undefined;
                  const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext());
                  const cellValue = cell.getValue();
                  const copyable = meta?.copyable ?? false;
                  const isColumnResizing = resizingColumnId === cell.column.id;

                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'flex items-center overflow-hidden',
                        isColumnResizing && 'border-r-2 border-dashed border-primary',
                        meta?.className,
                      )}
                      style={{
                        width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                        minWidth: cell.column.columnDef.minSize ?? DEFAULT_MIN_COLUMN_SIZE,
                      }}
                    >
                      {copyable && cellValue != null ? (
                        <CopyText value={String(cellValue)}>{cellContent}</CopyText>
                      ) : (
                        <span className="truncate">{cellContent}</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
