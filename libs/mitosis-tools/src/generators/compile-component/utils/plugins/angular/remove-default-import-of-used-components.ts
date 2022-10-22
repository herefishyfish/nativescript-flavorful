import {MitosisComponent, MitosisImport} from "@builder.io/mitosis";

export function removeDefaultImportOfUsedComponents(json: MitosisComponent, uses: MitosisImport[]) {
  json.imports = json.imports.map(jsonImport => {
    const usedImport = uses.find(usedImport => usedImport.path === jsonImport.path);
    if (usedImport) {
      jsonImport.imports = Object.keys(jsonImport.imports).filter(importName => {
        return !usedImport.imports[importName];
      }).reduce((acc, importName) => {
        acc[importName] = jsonImport.imports[importName];
        return acc;
      }, {});
    }
    if (Object.keys(jsonImport.imports).length === 0) {
      return null;
    }
    return jsonImport;
  }).filter(Boolean);
  return json;
}
