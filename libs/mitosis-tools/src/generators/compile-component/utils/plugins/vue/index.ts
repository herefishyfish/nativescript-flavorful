import { MitosisComponent } from "@builder.io/mitosis";
import { editVueComponentTags } from "./edit-vue-component-tags";

const metadatas = new Map();

export function vuePlugin() {
  return {
    json: {
      post: (json: MitosisComponent) => {
        console.log(json);
        json.imports.push({
          imports: {
            Vue: 'Vue'
          },
          path: 'nativescript-vue'
        });

        return json;
      }
    },
    code: {
      pre: (code: string): string => {
        return editVueComponentTags(code);
      }
    }
  }
}
