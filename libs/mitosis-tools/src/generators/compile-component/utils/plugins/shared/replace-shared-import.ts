import {MitosisComponent} from "@builder.io/mitosis";

export function replaceSharedImport(json: MitosisComponent, targetFramework: string) {
  json.imports = json.imports.map(jsonImport => {
    if (jsonImport.path === '@flavorful/mitosis/shared') {
      jsonImport.path = `@flavorful/${targetFramework}/shared`;
    }
    return jsonImport;
  });
  return json;
}
