'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type BirthDateSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = CURRENT_YEAR - 14;
const END_YEAR = CURRENT_YEAR - 90;

const YEARS = Array.from({ length: START_YEAR - END_YEAR + 1 }, (_, index) =>
  String(START_YEAR - index),
);

const MONTHS = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));

export default function BirthDateSelect({ value, onChange }: BirthDateSelectProps) {
  const parsedDate = parseBirthDate(value);
  const [year, setYear] = useState(parsedDate.year);
  const [month, setMonth] = useState(parsedDate.month);
  const [day, setDay] = useState(parsedDate.day);

  const days = useMemo(() => {
    if (!year || !month) {
      return Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));
    }

    const lastDay = new Date(Number(year), Number(month), 0).getDate();
    return Array.from({ length: lastDay }, (_, index) => String(index + 1).padStart(2, '0'));
  }, [month, year]);

  useEffect(() => {
    const nextDate = parseBirthDate(value);
    setYear(nextDate.year);
    setMonth(nextDate.month);
    setDay(nextDate.day);
  }, [value]);

  const updateBirthDate = (nextYear: string, nextMonth: string, nextDay: string) => {
    setYear(nextYear);
    setMonth(nextMonth);
    setDay(nextDay);

    if (!nextYear || !nextMonth || !nextDay) {
      onChange('');
      return;
    }

    onChange(`${nextYear}-${nextMonth}-${nextDay}`);
  };

  const handleYearChange = (nextYear: string) => {
    const nextDay = clampDay(nextYear, month, day);
    updateBirthDate(nextYear, month, nextDay);
  };

  const handleMonthChange = (nextMonth: string) => {
    const nextDay = clampDay(year, nextMonth, day);
    updateBirthDate(year, nextMonth, nextDay);
  };

  return (
    <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-3" data-cy="signup-birth">
      <BirthSelect
        ariaLabel="출생 연도"
        value={year}
        placeholder="연도"
        options={YEARS}
        unit="년"
        dataCy="signup-birth-year"
        onChange={handleYearChange}
      />
      <BirthSelect
        ariaLabel="출생 월"
        value={month}
        placeholder="월"
        options={MONTHS}
        unit="월"
        dataCy="signup-birth-month"
        onChange={(nextMonth) => handleMonthChange(nextMonth)}
      />
      <BirthSelect
        ariaLabel="출생 일"
        value={day}
        placeholder="일"
        options={days}
        unit="일"
        dataCy="signup-birth-day"
        onChange={(nextDay) => updateBirthDate(year, month, nextDay)}
      />
    </div>
  );
}

function BirthSelect({
  ariaLabel,
  value,
  placeholder,
  options,
  unit,
  dataCy,
  onChange,
}: {
  ariaLabel: string;
  value: string;
  placeholder: string;
  options: string[];
  unit: string;
  dataCy: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        data-cy={dataCy}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-mt-border bg-mt-white pl-3 pr-10 text-sm leading-5 font-bold text-mt-text-primary outline-none transition-all focus:border-mt-primary focus:ring-2 focus:ring-mt-logo-blue/20"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-sm font-bold text-mt-text-primary">
        {value ? unit : ''}
      </span>
      <ChevronDown
        className="pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-mt-text-secondary"
        aria-hidden
        strokeWidth={1.8}
      />
    </div>
  );
}

function parseBirthDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return { year: '', month: '', day: '' };
  }

  return {
    year: match[1],
    month: match[2],
    day: match[3],
  };
}

function clampDay(year: string, month: string, day: string) {
  if (!year || !month || !day) {
    return day;
  }

  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  return String(Math.min(Number(day), lastDay)).padStart(2, '0');
}
