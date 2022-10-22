import {readFileSync, writeFileSync} from "fs";
import {getSelector} from "./get-selector";

export function addSelectorToCva(selector: string): void {
  const fileContents = readFileSync('libs/angular/cva/value-accessor.directive.ts', 'utf8');
  const cvaSelector = getSelector(fileContents).split(',').map(selector => selector.replace(/ /g, ''));
  if (cvaSelector.indexOf(selector) === -1) {
    cvaSelector.push(selector);
    const newFileContents = fileContents.replace(/selector: ('|")(.*)('|")/, `selector: '${cvaSelector.filter(Boolean).join(', ')}'`);
    writeFileSync('libs/angular/cva/value-accessor.directive.ts', newFileContents);
  }
}
