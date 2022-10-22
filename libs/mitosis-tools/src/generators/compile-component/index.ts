import {createProjectGraphAsync, formatFiles, generateFiles, getProjects, names, Tree} from '@nrwl/devkit';
import {CompileComponentSchema} from "./schema";
import {CompileOptions} from "./compile-options";
import {parse, resolve} from 'path';
import {run as compile} from '@builder.io/mitosis-cli/dist/commands/compile';
import {compileComponentConfig} from './compile-component.config';
import {copySync} from "fs-extra";
import {updateIndexes} from "./utils/update-indexes";

const filesystemTools = require('gluegun/filesystem');
const stringTools = require('gluegun/strings');
const printTools = require('gluegun/print');
const targetsMap = {
  angular: 'angular',
  react: 'react',
  svelte: 'svelte',
  vue: 'vue',
  wc: 'lit'
}

export default async function (tree: Tree, schema: CompileComponentSchema) {
  const projects = getProjects(tree);
  const targetProject = projects.get(schema.componentName);
  const targetOptions = targetProject.targets.compile.options as CompileOptions;
  const componentPaths = targetOptions.components.map((component) => resolve(targetProject.root, component));
  const assets = (targetOptions.assets || []).map(assetPath => {
    return {
      src: resolve(targetProject.root, assetPath),
      dest: (folder: string) => folder + '/' + assetPath
    }
  });
  const componentName = schema.componentName.replace('mitosis-', '');

  for (const target of schema.targetFrameworks) {
    const outFiles = [];
    const outProjectPath = compileComponentConfig.outputPaths[target];
    const outFolder = `${outProjectPath}/${componentName}`;
    for (const componentPath of componentPaths) {
      const parsedComponentPath = parse(componentPath);
      const outFile = `${outFolder}/${parsedComponentPath.name}.${compileComponentConfig.defaultOptions[target].outputExtension}`;
      outFiles.push(outFile);
      await compile({
        parameters: {
          options: {
            config: resolve(__dirname, 'mitosis.config.ts'),
            from: 'mitosis',
            to: targetsMap[target],
            out: outFile,
            force: true,
            state: 'useState'
          },
          array: [componentPath]
        },
        strings: stringTools.strings,
        filesystem: filesystemTools.filesystem,
        print: printTools.print
      });
      assets.forEach(asset => {
        copySync(asset.src, asset.dest(outFolder));
      });
    }
    const graph = await createProjectGraphAsync({exitOnError: true});
    const deps = graph.dependencies[schema.componentName].filter(dep => dep.source === schema.componentName && /mitosis-(.*)/.test(dep.target) && dep.target !== 'mitosis-shared');
    generateFiles(tree, resolve(__dirname, 'files', target), outProjectPath, {
      ...names(componentName),
      controlValueAccessor: !!targetOptions.controlValueAccessor,
      moduleExports: outFiles.map(outFile => ({
        names: names(outFile.replace(`${outFolder}/`, '').replace(/\.?(component)?\.ts(x)?/, '')),
        path: outFile.replace(`${outFolder}/`, './').replace(/\.ts(x)?/, '')
      })),
      uses: deps.map(deps => {
        const targetName = deps.target.replace('mitosis-', '');
        return {
          ...names(targetName),
          path: `@flavorful/${target}/${targetName}`
        }
      }),
    });

    updateIndexes(tree, outProjectPath, target, componentName);
    await formatFiles(tree);
  }

  return () => {
  };
}
