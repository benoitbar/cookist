import { Doc } from './_generated/dataModel';

export function localeSort(
  data: Doc<'products' | 'recipes' | 'shopping'>[],
  locale: string = 'fr'
) {
  return data.sort((a, b) => a.name.localeCompare(b.name, locale));
}
