import {MitosisComponent, MitosisImport, MitosisNode} from "@builder.io/mitosis";
import {dasherize} from "@nrwl/workspace/src/utils/strings";

function onEveryChild(child: MitosisNode, callback: (node: MitosisNode) => void) {
  callback(child);
  if (child.children) {
    child.children.forEach(child => onEveryChild(child, callback));
  }
}

export function renameUsedComponents(json: MitosisComponent, uses: MitosisImport[]) {
  json.children.forEach(child => {
    onEveryChild(child, node => {
      const isUsed = uses.find(usedImport => usedImport.imports[node.name]);
      if (isUsed) {
        node.name = `fd-${dasherize(node.name)}`;
      }
      const slots = Object.keys(node.bindings).filter(key => key.startsWith('slot')).map(key => node.bindings[key]);
      if (slots.length > 0) {
        uses.forEach(usedImport => {
          Object.keys(usedImport.imports).sort((a, b) => {
            return b.length - a.length;
          }).forEach(componentName => {
            slots.forEach(slot => {
              slot.code = slot.code.replace(new RegExp(`${componentName}`, 'g'), `fd-${dasherize(componentName)}`);
            })
          })
        });
      }
    })
  });
  return json;
}
