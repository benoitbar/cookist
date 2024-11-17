import { Doc } from './_generated/dataModel';

export function colorLocaleSort<T extends Doc<'products'>[]>(data: T, locale: string = 'fr'): T {
  return data.sort((a, b) => `${a.color || 'z'} ${a.name}`.localeCompare(`${b.color || 'z'} ${b.name}`, locale));
}


export function localeSort<
  T extends Doc<'products' | 'recipes' | 'shopping'>[],
>(data: T, locale: string = 'fr'): T {
  return data.sort((a, b) => a.name.localeCompare(b.name, locale));
}
