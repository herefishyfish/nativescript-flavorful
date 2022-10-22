import {MitosisComponent} from "@builder.io/mitosis";

export function addValueProviderImport(component: MitosisComponent): MitosisComponent {
  component.imports.push({
    path: '@flavorful/angular/cva',
    imports: {
      ValueProvider: 'ValueProvider'
    }
  });
  let coreImports = component.imports.find((i) => i.path === '@angular/core');
  if (!coreImports) {
    coreImports = {
      path: '@angular/core',
      imports: {}
    };
    component.imports.push(coreImports);
  }
  coreImports.imports.forwardRef = 'forwardRef';
  return component;
}
