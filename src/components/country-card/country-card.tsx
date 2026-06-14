import React from 'react';
import type { Country, YearData } from '../../types';
import { DataTable } from '../data-table/data-table';
import { getPopulationForYear, getCo2ForYear } from '../../utils/data-transformers';
import { formatNumber } from '../../utils/format-utils';

import styles from './country-card.module.css';

type CountryCardProps = {
  country: Country;
  yearDataMap: Map<number, YearData>;
  selectedYear: number;
  selectedColumns: string[];
};

export const CountryCard = React.memo(function CountryCard({
  country,
  yearDataMap,
  selectedYear,
  selectedColumns,
}: CountryCardProps) {
  const population = getPopulationForYear(yearDataMap, selectedYear);
  const co2 = getCo2ForYear(yearDataMap, selectedYear);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{country.id}</h3>
        {country.iso_code && <span className={styles.isoCode}>{country.iso_code}</span>}
      </div>

      <div className={styles.stats}>
        <div>
          Population ({selectedYear}): {formatNumber(population)}
        </div>
        <div>
          CO₂ Emissions ({selectedYear}): {formatNumber(co2)} tonnes
        </div>
      </div>

      <DataTable
        data={country.data}
        year={selectedYear}
        columns={selectedColumns}
      />
    </div>
  );
});