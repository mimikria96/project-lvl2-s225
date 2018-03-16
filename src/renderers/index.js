import renderTree from './tree-render';
import renderPlain from './plain-render';

const renderAst = (ast, type) => {
  if(type === 'plain') {
    return renderPlain(ast);
  }
    return renderTree(ast);
};
export default renderAst;
