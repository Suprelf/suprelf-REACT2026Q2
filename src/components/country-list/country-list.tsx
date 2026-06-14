import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';
import { useMemo } from 'react';

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

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const countriesWithYear = useMemo(() => {
    return countries.map((c) => ({
      ...c,
      yearMap: createYearDataMap(c.data),
    }));
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countriesWithYear
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);

        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        }

        const popA = getPopulationForYear(a.yearMap, selectedYear) || 0;
        const popB = getPopulationForYear(b.yearMap, selectedYear) || 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      });
  }, [countriesWithYear, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  return (
    <div className={styles.countryList}>
      {filteredCountries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}
    </div>
  );
};
