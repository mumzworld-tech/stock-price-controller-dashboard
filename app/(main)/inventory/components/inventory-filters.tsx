'use client';

import { Search, X } from 'lucide-react';

import { DataTableFacetedFilter } from '@/components/data-table';
import { DateRangePicker } from '@/components/date-picker/date-range-picker';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRY_CODE_OPTIONS, CountryCode } from '@/types/country-code';
import { FULFILLMENT_MODEL_OPTIONS } from '@/types/fulfillment-model';
import { InventoryFilters as InventoryFiltersType } from '@/types/inventory';

interface InventoryFiltersProps {
  filters: InventoryFiltersType;
  onFilterChange: <K extends keyof InventoryFiltersType>(key: K, value: InventoryFiltersType[K]) => void;
  onFiltersChange: (updates: Partial<InventoryFiltersType>) => void;
  onReset: () => void;
}

export function InventoryFilters({ filters, onFilterChange, onFiltersChange, onReset }: InventoryFiltersProps) {
  const hasActiveFilters =
    filters.sku ||
    filters.countryCode ||
    filters.vendor ||
    (filters.fulfillmentModel?.length ?? 0) > 0 ||
    filters.updatedFrom ||
    filters.updatedTo;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* SKU Search */}
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

      {/* Country Code Select */}
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

      {/* Fulfillment Model Faceted Filter */}
      <DataTableFacetedFilter
        title="Fulfillment"
        options={FULFILLMENT_MODEL_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
        selectedValues={filters.fulfillmentModel ?? []}
        onChange={(values) => onFilterChange('fulfillmentModel', values)}
      />

      {/* Vendor Search */}
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
        value={{ from: filters.updatedFrom, to: filters.updatedTo }}
        onChange={(range) => {
          onFiltersChange({ updatedFrom: range.from, updatedTo: range.to });
        }}
      />

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="px-2">
          <X className="size-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
