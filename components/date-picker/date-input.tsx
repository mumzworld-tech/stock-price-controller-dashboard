'use client';

import { CalendarIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DISPLAY_FORMAT = 'MMM dd, yyyy hh:mm a';
const INPUT_PLACEHOLDER = 'Jan 01, 2026 12:00 AM';

function formatDateForDisplay(date: Date | undefined): string {
  if (!date) return '';
  return DateTime.fromJSDate(date).toFormat(DISPLAY_FORMAT);
}

function parseDateInput(value: string): Date | null {
  // Try parsing with luxon (flexible parsing)
  const dt = DateTime.fromFormat(value, DISPLAY_FORMAT);
  if (dt.isValid) return dt.toJSDate();

  // Fallback to native Date parsing
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

interface DateInputProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export function DateInput({ label, value, onChange }: DateInputProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const [inputValue, setInputValue] = React.useState(formatDateForDisplay(value));

  // Sync input value when controlled value changes
  React.useEffect(() => {
    setInputValue(formatDateForDisplay(value));
    if (value) setMonth(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const parsed = parseDateInput(newValue);
    if (parsed) {
      setMonth(parsed);
      onChange?.(parsed);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date && value) {
      // Preserve time from current value
      date.setHours(value.getHours(), value.getMinutes(), value.getSeconds());
    }
    onChange?.(date);
    setInputValue(formatDateForDisplay(date));
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={inputValue}
          placeholder={INPUT_PLACEHOLDER}
          className="bg-background pr-10"
          onChange={handleInputChange}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleCalendarSelect}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
