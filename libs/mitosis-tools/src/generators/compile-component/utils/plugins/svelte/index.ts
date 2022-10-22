import {MitosisComponent} from "@builder.io/mitosis";
import { replaceSvelteComponentTags } from "./replace-svelte-component-tags";

const metadatas = new Map();

export function sveltePlugin() {
  return {
    code: {
      pre: (code: string): string => {
        return replaceSvelteComponentTags(code);
      }
    }
  }
}
