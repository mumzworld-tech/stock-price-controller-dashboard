'use client';

import { Calendar as CalendarIcon, ChevronDownIcon, LucideIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { DateInput } from '@/components/date-picker/date-input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

const DISPLAY_FORMAT = 'MMM dd, yyyy hh:mm a';

interface DateRangeValue {
  from?: string; // ISO string
  to?: string; // ISO string
}

interface DateRangePickerProps {
  label?: string;
  prependIcon?: LucideIcon;
  value?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
}

function isoToDate(iso?: string): Date | undefined {
  if (!iso) return undefined;
  const dt = DateTime.fromISO(iso);
  return dt.isValid ? dt.toJSDate() : undefined;
}

function dateToIso(date?: Date): string | undefined {
  if (!date) return undefined;
  return DateTime.fromJSDate(date).toISO() ?? undefined;
}

function formatForButton(iso?: string): string | null {
  if (!iso) return null;
  const dt = DateTime.fromISO(iso);
  return dt.isValid ? dt.toFormat(DISPLAY_FORMAT) : null;
}

export function DateRangePicker({
  label = 'Select date',
  prependIcon = CalendarIcon,
  value,
  onChange,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const fromDate = isoToDate(value?.from);
  const toDate = isoToDate(value?.to);

  const dateRange: DateRange | undefined = fromDate || toDate ? { from: fromDate, to: toDate } : undefined;

  const handleCalendarSelect = (range: DateRange | undefined) => {
    onChange?.({
      from: dateToIso(range?.from),
      to: dateToIso(range?.to),
    });
  };

  const handleFromChange = (date: Date | undefined) => {
    onChange?.({
      from: dateToIso(date),
      to: value?.to,
    });
  };

  const handleToChange = (date: Date | undefined) => {
    onChange?.({
      from: value?.from,
      to: dateToIso(date),
    });
  };

  const fromDisplay = formatForButton(value?.from);
  const toDisplay = formatForButton(value?.to);
  const hasValue = fromDisplay && toDisplay;

  const PrependIcon = prependIcon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" id="date" className="w-50 text-left">
          {PrependIcon && <PrependIcon />}
          <div className="truncate w-100">{hasValue ? `${fromDisplay} - ${toDisplay}` : label}</div>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 h-[300px] md:h-auto overflow-y-auto" align="start">
        <Calendar mode="range" selected={dateRange} captionLayout="label" onSelect={handleCalendarSelect} />
        <Separator />
        <div className="flex flex-col gap-3 p-3">
          <DateInput label="From" value={fromDate} onChange={handleFromChange} />
          <DateInput label="To" value={toDate} onChange={handleToChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
