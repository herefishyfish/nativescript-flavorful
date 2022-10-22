export interface CompileComponentSchema {
  targetFrameworks: Array<'angular' | 'react' | 'svelte' | 'vue'>;
  componentName: string;
}
