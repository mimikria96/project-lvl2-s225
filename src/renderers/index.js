import renderTree from './tree-render';
import renderPlain from './plain-render';
import renderJson from './tojson';

const renderers = {
  plain: renderPlain,
  tree: renderTree,
  json: renderJson
};

const renderAst = (ast, type) => {
  return renderers[type](ast);
};
export default renderAst;
