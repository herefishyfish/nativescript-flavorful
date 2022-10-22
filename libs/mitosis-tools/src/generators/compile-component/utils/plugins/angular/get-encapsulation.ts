import {ViewEncapsulation} from "@angular/core";

const encapsulationsMap = {
  '0': 'Emulated',
  '2': 'None',
  '3': 'ShadowDom',
}

export function getEncapsulation(encapsulation: ViewEncapsulation) {
  if (!encapsulationsMap.hasOwnProperty(encapsulation)) {
    throw new Error(`Incorrect Encapsulation Value. It should be one of ${Object.keys(encapsulationsMap).join(', ')}`);
  }
  return `ViewEncapsulation.${encapsulationsMap[encapsulation]}`;
}
