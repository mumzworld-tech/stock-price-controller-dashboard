'use client';

import { Filter, Search, X } from 'lucide-react';
import { useState } from 'react';

import { DataTableFacetedFilter } from '@/components/data-table';
import { DateRangePicker } from '@/components/date-picker/date-range-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { COUNTRY_CODE_OPTIONS, CountryCode } from '@/types/country-code';
import { FULFILLMENT_MODEL_OPTIONS } from '@/types/fulfillment-model';
import { InventoryFilters as InventoryFiltersType } from '@/types/inventory';

interface InventoryFiltersProps {
  filters: InventoryFiltersType;
  onFilterChange: <K extends keyof InventoryFiltersType>(key: K, value: InventoryFiltersType[K]) => void;
  onFiltersChange: (updates: Partial<InventoryFiltersType>) => void;
  onReset: () => void;
}

function getActiveFilterCount(filters: InventoryFiltersType): number {
  let count = 0;
  if (filters.countryCode) count++;
  if (filters.vendor) count++;
  if ((filters.fulfillmentModel?.length ?? 0) > 0) count++;
  if (filters.updatedFrom || filters.updatedTo) count++;
  return count;
}

export function InventoryFilters({ filters, onFilterChange, onFiltersChange, onReset }: InventoryFiltersProps) {
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeFilterCount = getActiveFilterCount(filters);
  const hasActiveFilters =
    filters.sku ||
    filters.countryCode ||
    filters.vendor ||
    (filters.fulfillmentModel?.length ?? 0) > 0 ||
    filters.updatedFrom ||
    filters.updatedTo;

  // Mobile: SKU search + filter button with drawer
  if (isMobile) {
    return (
      <div className="flex items-center gap-2">
        <InputGroup className="bg-white flex-1">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search SKU..."
            value={filters.sku ?? ''}
            onChange={(e) => onFilterChange('sku', e.target.value)}
          />
        </InputGroup>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="relative shrink-0">
              <Filter className="size-4" />
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-2 -right-2 size-5 p-0 text-xs">{activeFilterCount}</Badge>
              )}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-4 px-4 pb-4">
              <Select
                value={filters.countryCode ?? 'all'}
                onValueChange={(value) =>
                  onFilterChange('countryCode', value === 'all' ? null : (value as CountryCode))
                }
              >
                <SelectTrigger className="bg-white w-full">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {COUNTRY_CODE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DataTableFacetedFilter
                title="Fulfillment"
                options={FULFILLMENT_MODEL_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
                selectedValues={filters.fulfillmentModel ?? []}
                onChange={(values) => onFilterChange('fulfillmentModel', values)}
              />

              <InputGroup className="bg-white w-full">
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput
                  placeholder="Search Vendor..."
                  value={filters.vendor ?? ''}
                  onChange={(e) => onFilterChange('vendor', e.target.value)}
                />
              </InputGroup>

              <DateRangePicker
                label="Updated At"
                value={{ from: filters.updatedFrom ?? undefined, to: filters.updatedTo ?? undefined }}
                onChange={(range) => {
                  onFiltersChange({ updatedFrom: range.from, updatedTo: range.to });
                }}
              />
            </div>
            <DrawerFooter className="flex-row gap-2">
              {activeFilterCount > 0 && (
                <Button variant="outline" className="flex-1" onClick={onReset}>
                  Clear all
                </Button>
              )}
              <DrawerClose asChild>
                <Button className="flex-1">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  // Desktop: all filters inline
  return (
    <div className="flex flex-wrap items-center gap-2">
      <InputGroup className="bg-white w-[250px]">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search SKU..."
          value={filters.sku ?? ''}
          onChange={(e) => onFilterChange('sku', e.target.value)}
        />
      </InputGroup>

      <Select
        value={filters.countryCode ?? 'all'}
        onValueChange={(value) => onFilterChange('countryCode', value === 'all' ? null : (value as CountryCode))}
      >
        <SelectTrigger className="bg-white w-[150px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Countries</SelectItem>
          {COUNTRY_CODE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DataTableFacetedFilter
        title="Fulfillment"
        options={FULFILLMENT_MODEL_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
        selectedValues={filters.fulfillmentModel ?? []}
        onChange={(values) => onFilterChange('fulfillmentModel', values)}
      />

      <InputGroup className="bg-white w-[200px]">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search Vendor..."
          value={filters.vendor ?? ''}
          onChange={(e) => onFilterChange('vendor', e.target.value)}
        />
      </InputGroup>

      <DateRangePicker
        label="Updated At"
        value={{ from: filters.updatedFrom ?? undefined, to: filters.updatedTo ?? undefined }}
        onChange={(range) => {
          onFiltersChange({ updatedFrom: range.from, updatedTo: range.to });
        }}
      />

      {hasActiveFilters && (
        <Button variant="ghost" onClick={onReset} className="px-2">
          <X className="size-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
