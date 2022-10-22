import {MitosisComponent} from "@builder.io/mitosis";

export function replaceMitosisImports(json: MitosisComponent, targetFramework: string) {
  json.imports = json.imports.map(jsonImport => {
    const mitosisImportMatch = jsonImport.path.match(/@flavorful\/mitosis(.*)?/);
    if (mitosisImportMatch) {
      jsonImport.path = `@flavorful/${targetFramework}${mitosisImportMatch[1]}`;
    }
    return jsonImport;
  });
  return json;
}
