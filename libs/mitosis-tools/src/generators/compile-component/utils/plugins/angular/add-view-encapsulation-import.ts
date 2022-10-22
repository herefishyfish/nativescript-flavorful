import {MitosisComponent} from "@builder.io/mitosis";

export function addViewEncapsulationImport(component: MitosisComponent) {
  let coreImports = component.imports.find((i) => i.path === '@angular/core');
  if (!coreImports) {
    coreImports = {
      path: '@angular/core',
      imports: {}
    };
    component.imports.push(coreImports);
  }
  coreImports.imports.ViewEncapsulation = 'ViewEncapsulation';
  return component;
}
