import template from "@babel/template";
import * as ttp from "typescript-to-proptypes";

/**
 * Create `Component.propTypes = {...}` source and inject it into the
 * AST of the current file
 * @param t Babel types object
 * @param options path, AST of props, and name of node to inject proptypes for
 */

function injectPropTypes(t, options) {
  const { path: nodePath, props, nodeName } = options;
  const propTypesSource = ttp.generate(props, {
    importedName: "PropTypes",
  });

  if (propTypesSource.length === 0) {
    return;
  }

  // Check if there's already "Node.propTypes = ..." for this node
  let existingProptypes = false;
  const programNode = nodePath.findParent((path) => path.isProgram());
  const propTypesVisitor = {
    MemberExpression(path) {
      if (
        t.isIdentifier(path.node.object, { name: nodeName }) &&
        t.isIdentifier(path.node.property, { name: "propTypes" })
      ) {
        existingProptypes = true;
        path.stop();
      }
    },
  };
  programNode.traverse(propTypesVisitor);

  if (!existingProptypes) {
    if (t.isExportNamedDeclaration(nodePath.parent)) {
      nodePath.insertAfter(template.smart.ast(`export { ${nodeName} };`));
      nodePath.insertAfter(template.smart.ast(propTypesSource));
      nodePath.parentPath.replaceWith(nodePath.node);
    } else if (t.isExportDefaultDeclaration(nodePath.parent)) {
      nodePath.insertAfter(template.smart.ast(`export default ${nodeName};`));
      nodePath.insertAfter(template.smart.ast(propTypesSource));
      nodePath.parentPath.replaceWith(nodePath.node);
    } else {
      nodePath.insertAfter(template.smart.ast(propTypesSource));
    }
  }
}

export default injectPropTypes;
