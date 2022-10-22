import { angularPlugin } from "./utils/plugins/angular";
import { reactPlugin } from "./utils/plugins/react";
import { sveltePlugin } from "./utils/plugins/svelte";
import { vuePlugin } from "./utils/plugins/vue";


module.exports = {
  options: {
    angular: {
      plugins: [angularPlugin],
      typescript: true,
      preserveImports: true
    },
    react: {
      plugins: [reactPlugin],
      typescript: true,
      preserveImports: true
    },
    vue: {
      plugins: [vuePlugin],
      typescript: true,
      preserveImports: true
    },
    svelte: {
      plugins: [sveltePlugin],
      typescript: true,
      preserveImports: true
    }
  }
};
