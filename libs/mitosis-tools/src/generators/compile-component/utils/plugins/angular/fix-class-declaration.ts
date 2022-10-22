export function fixClassDeclaration(contents: string): string {
  return contents.replace(/export default class (.*) \{/, 'export class $1 {');
}
