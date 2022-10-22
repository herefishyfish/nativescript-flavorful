export const compileComponentConfig = {
  outputPaths: {
    angular: 'libs/angular',
    react: 'libs/react',
    svelte: 'libs/svelte',
    vue: 'libs/vue',
    wc: 'libs/wc',
  },
  defaultOptions: {
    angular: {useAttributeSelector: false, outputExtension: 'ts'},
    react: {outputExtension: 'tsx'},
    svelte: {outputExtension: 'svelte'},
    vue: {outputExtension: 'vue'},
    wc: {outputExtension: 'ts'}
  }
}
