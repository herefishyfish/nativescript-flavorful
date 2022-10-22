import {replaceMitosisImports} from "../shared";
import {fixClassDeclaration} from "./fix-class-declaration";
import {addValueProviderImport} from "./add-value-provider-import";
import {MitosisComponent, MitosisImport} from "@builder.io/mitosis";
import {addSelectorToCva} from "./add-selector-to-cva";
import {addViewEncapsulationImport} from "./add-view-encapsulation-import";
import {removeDefaultImportOfUsedComponents} from "./remove-default-import-of-used-components";
import {renameUsedComponents} from "./rename-used-components";
import {dasherize} from "@nrwl/workspace/src/utils/strings";
import {getEncapsulation} from "./get-encapsulation";

const metadatas = new Map();
const jsons = new Map();

export function angularPlugin() {
  return {
    json: {
      pre: (json) => {
        debugger;
        return replaceMitosisImports(json, 'angular');
      },
      post: (json: MitosisComponent) => {
        const useMetadata = json.meta.useMetadata;
        if (useMetadata) {
          if (useMetadata.controlValueAccessor) {
            json = addValueProviderImport(json)
          }
          if (useMetadata.hasOwnProperty('encapsulation')) {
            json = addViewEncapsulationImport(json);
          }
          if (useMetadata.uses) {
            json = renameUsedComponents(json, useMetadata.uses as unknown as MitosisImport[]);
            json = removeDefaultImportOfUsedComponents(json, useMetadata.uses as unknown as MitosisImport[]);
          }
          if (useMetadata.typings) {
            Object.keys(useMetadata.typings).forEach(propertyName => {
              json.state[propertyName] = {
                type: 'getter',
                code: `${propertyName}: ${useMetadata.typings[propertyName]} = ${json.state[propertyName].code};`
              }
            });
          }
          metadatas.set(json.name, useMetadata);
        }
        const selector = useMetadata?.useAttributeSelector ? `[fd-${dasherize(json.name)}]` : `fd-${dasherize(json.name)}`;
        if (useMetadata?.controlValueAccessor) {
          addSelectorToCva(selector)
        }
        json.meta.angularConfig = {
          // @ts-ignore
          ...(json.meta.angularConfig || {}),
          ...(useMetadata?.controlValueAccessor ? {
            providers: `[
              {
                provide: ValueProvider,
                useExisting: forwardRef(() => ${json.name}),
              }
            ]`
          } : {}),
          ...(useMetadata?.encapsulation ? {
            encapsulation: getEncapsulation(useMetadata.encapsulation as any)
          } : {}),
          ...(useMetadata?.styleUrls ? {
            styleUrls: JSON.stringify(useMetadata.styleUrls)
          } : {}),
          selector: `'${selector}'`
        }
        jsons.set(json.name, json);
        return json;
      }
    },
    code: {
      pre: (fileContents: string): string => {
        return fixClassDeclaration(fileContents);
      }
    }
  }
}
