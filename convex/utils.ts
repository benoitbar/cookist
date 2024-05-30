import { Doc } from './_generated/dataModel';

export function localeSort<
  T extends Doc<'products' | 'recipes' | 'shopping'>[],
>(data: T, locale: string = 'fr'): T {
  return data.sort((a, b) => a.name.localeCompare(b.name, locale));
}
