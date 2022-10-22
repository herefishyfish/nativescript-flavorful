import {ExecutorContext} from "nx/src/config/misc-interfaces";
import {copySync, readFileSync, writeFileSync} from "fs-extra";

export default async function compileShared(options: { targetFrameworks: Array<string> }, executorContext: ExecutorContext): Promise<{ success: boolean }> {
  (options.targetFrameworks || ['angular', 'react', 'svelte']).forEach((targetFramework) => {
    const tsConfigBaseJson = JSON.parse(readFileSync(`./tsconfig.base.json`, {encoding: 'utf-8'}));
    tsConfigBaseJson.compilerOptions.paths[`@flavorful/${targetFramework}/shared`] = [`libs/${targetFramework}/shared/index.ts`];
    writeFileSync(`./tsconfig.base.json`, JSON.stringify(tsConfigBaseJson, null, 2));

    copySync(`libs/mitosis/shared/src`, `libs/${targetFramework}/shared`);
    if (targetFramework === 'angular') {
      writeFileSync(`libs/${targetFramework}/shared/ng-package.json`, JSON.stringify({ lib: { entryFile: "index.ts" } }, null, 2));
    }
  })
  return {success: true};
}
