export function getSelector(fileContents: string): string {
  return fileContents.match(/selector: ('|")(.*)('|")/)[2];
}
