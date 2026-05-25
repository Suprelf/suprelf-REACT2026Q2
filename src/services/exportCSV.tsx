import type { Pokemon } from '../types/types';
import { fetchPokemonDetails } from './api';

export const generatePokemonCSV = async (data: Pokemon[]) => {
  const detailed = await Promise.all(
    data.map(async (p) => {
      const details = await fetchPokemonDetails(p.name);

      return {
        id: details.id,
        name: p.name,
        description: details.flavorText,
        image: p.image,
      };
    })
  );

  const headers = ['id', 'name', 'description', 'image'];

  const rows = detailed.map((p) => [
    String(p.id),
    p.name,
    p.description,
    p.image,
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((r) =>
      r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.length}_items.csv`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};
