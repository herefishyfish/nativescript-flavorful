import {MitosisComponent} from "@builder.io/mitosis";
import {replaceMitosisImports} from "../shared";

const metadatas = new Map();

export function reactPlugin() {
  return {
    json: {
      post: (json: MitosisComponent) => {
        if (json.meta.useMetadata?.styleUrls) {
          (json.meta.useMetadata.styleUrls as string[]).forEach((url: string) => {
            json.imports.push({
              imports: {},
              path: url
            })
          });
        }
        json.imports.push({
          imports: {
            DOMAttributes: 'DOMAttributes'
          },
          path: 'react'
        })
        json.propsTypeRef = `DOMAttributes<any> & ${json.propsTypeRef}`;
        metadatas.set(json.name, json.meta.useMetadata);
        return replaceMitosisImports(json, 'react');
      }
    },
    code: {
      pre: (code: string): string => {
        const name = code.match(/export default function (.*)\((.*) \{/)[1];
        const metadata = metadatas.get(name) || {};
        if (metadata?.typings) {
          Object.keys(metadata.typings).forEach(propertyName => {
            code = code.replace(new RegExp(`const \\[${propertyName}(.*)\\] = useState(.*)`), `const [${propertyName}$1] = useState<${metadata.typings[propertyName]}>$2`);
          })
        }
        return code;
      }
    }
  }
}
