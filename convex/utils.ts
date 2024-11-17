import { Doc } from './_generated/dataModel';

function mapColorToPosition(color: string | void) {
  switch (color) {
    case 'danger':
      return 'a'
    case 'primary':
      return 'b'
    case 'success':
      return 'c'
    default:
      return 'z'
  }
}

export function colorLocaleSort<T extends Doc<'products'>[]>(data: T, locale: string = 'fr'): T {
  return data.sort((a, b) => `${mapColorToPosition(a.color)} ${a.name}`.localeCompare(`${mapColorToPosition(b.color)} ${b.name}`, locale));
}


export function localeSort<
  T extends Doc<'products' | 'recipes' | 'shopping'>[],
>(data: T, locale: string = 'fr'): T {
  return data.sort((a, b) => a.name.localeCompare(b.name, locale));
}
