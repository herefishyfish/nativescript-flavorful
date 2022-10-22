import {ExecutorContext} from "nx/src/config/misc-interfaces";
import {execSync} from 'child_process';

export default async function compile(options: { targetFrameworks: Array<string> }, executorContext: ExecutorContext): Promise<{ success: boolean }> {
  const {projectName} = executorContext;
  options.targetFrameworks = options.targetFrameworks || ['angular', 'react', 'svelte'];
  execSync(`nx g @flavorful/mitosis-tools:compile-component --targetFrameworks=${options.targetFrameworks.join(',')} --componentName=${projectName}`, {stdio: 'inherit'});
  return {success: true};
}
