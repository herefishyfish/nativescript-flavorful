import {Tree} from "@nrwl/devkit";

const defaultIndexContent = {
  angular: `export * from './cva;'`
}

export function updateIndexes(tree: Tree, outProjectPath: string, targetFramework: string, componentName: string) {
  const targetIndex = tree.read(`${outProjectPath}/index.ts`, 'utf-8') || (defaultIndexContent[targetFramework] || '');
  if (targetIndex.indexOf(`export * from './${componentName}'`) === -1) {
    tree.write(`${outProjectPath}/index.ts`, targetIndex + '\n' + `export * from './${componentName}'`);
  }
  const tsConfigBase = JSON.parse(tree.read('./tsconfig.base.json', 'utf-8'));
  tsConfigBase.compilerOptions.paths[`@flavorful/${targetFramework}/${componentName}`] = [`${outProjectPath}/${componentName}/index.ts`];
  tree.write('./tsconfig.base.json', JSON.stringify(tsConfigBase, null, 2));
}
