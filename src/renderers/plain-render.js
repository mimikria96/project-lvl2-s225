import  _ from 'lodash';

const toStrValue = (value) => {
  if (_.isObject(value)) {
    return `complex value`;
  }
  return `${value}`;
};

const removed = (obj, parentName) => {
  const { name, value } = obj;
  return `Property '${parentName}${name}' was removed with value: '${toStrValue(value)}'`;
};

const added = (obj, parentName) => {
  const { name, value } = obj;
  return `Property '${parentName}${name}' was added with value: '${toStrValue(value)}'`;
};

const unchanged = () => {
  return ` `;
};

const haschildren = (obj, parentName, func) => {
  const { name, children } = obj;
  return children.map(elem => func(elem, `${parentName}${name}.`)).join(`\n`);
};

const changed = (obj, parentName) => {
  const { name, value1, value2 } = obj;
  return `Property '${parentName}${name}' was updated. From '${toStrValue(value1)}' to '${toStrValue(value2)}'`;
};

const parserTypes = {
  removed: removed,
  added: added,
  unchanged: unchanged,
  haschildren: haschildren,
  changed: changed
};

const renderPlain = (ast) => {
  const parentName = '';
  console.log(ast)
  const parse = (elem, parentName) => parserTypes[elem.type](elem, parentName, parse);
  const result = ast.map(elem => parse(elem, parentName));
  return result.filter(elem => elem !== ' '). join(`\n`);
};

export default renderPlain;
