export function classesToString(classes: string | Array<string | undefined | null | boolean>): string {
  if (!classes) {
    return '';
  }
  if (typeof classes === 'string') {
    return classes || '';
  }

  return classes.filter(Boolean).join(' ');
}
