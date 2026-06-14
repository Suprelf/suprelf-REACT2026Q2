import { useMemo } from 'react';
import { List, type RowComponentProps } from 'react-window';

import type { Country, YearData } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

type CountryItem = {
  country: Country;
  yearDataMap: Map<number, YearData>;
};

type RowProps = {
  items: CountryItem[];
  selectedYear: number;
  selectedColumns: string[];
};

function Row({ index, style, items, selectedYear, selectedColumns }: RowComponentProps<RowProps>) {
  const item = items[index];

  return (
    <div style={style}>
      <CountryCard
        country={item.country}
        yearDataMap={item.yearDataMap}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
}

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const countriesWithYearMap = useMemo(() => {
    return countries.map((country) => ({
      country,
      yearDataMap: createYearDataMap(country.data),
    }));
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countriesWithYearMap
      .filter(({ country }) => {
        const matchesSearch = country.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRegion =
          !selectedRegion || country.data.some((d) => d.region === selectedRegion);

        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc'
            ? a.country.id.localeCompare(b.country.id)
            : b.country.id.localeCompare(a.country.id);
        }

        const popA = getPopulationForYear(a.yearDataMap, selectedYear) ?? 0;

        const popB = getPopulationForYear(b.yearDataMap, selectedYear) ?? 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      });
  }, [countriesWithYearMap, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const rowHeight = useMemo(() => 129 + selectedColumns.length * 38, [selectedColumns.length]);

  return (
    <div className={styles.countryList}>
      <List
        rowComponent={Row}
        rowCount={filteredCountries.length}
        rowHeight={rowHeight}
        rowProps={{
          items: filteredCountries,
          selectedYear,
          selectedColumns,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
