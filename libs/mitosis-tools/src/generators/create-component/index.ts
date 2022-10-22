import {generateFiles, names, Tree} from '@nrwl/devkit';

export default async function (tree: Tree, schema: any) {
  const namings = names(schema.name);
  generateFiles(tree, `${__dirname}/files`, 'libs/mitosis', {
    ...namings,
  });
  const tsConfigBaseJson = JSON.parse(tree.read('tsconfig.base.json', 'utf-8'));
  tsConfigBaseJson.compilerOptions.paths[`@flavorful/mitosis/${namings.fileName}`] = [`libs/mitosis/${namings.fileName}/src/index.ts`];
  tree.write('tsconfig.base.json', JSON.stringify(tsConfigBaseJson, null, 2));
  const workspaceJson = JSON.parse(tree.read('workspace.json', 'utf-8'));
  workspaceJson.projects[`mitosis-${namings.fileName}`] = `libs/mitosis/${namings.fileName}`;
  tree.write('workspace.json', JSON.stringify(workspaceJson, null, 2));
  return () => {
  };
}
