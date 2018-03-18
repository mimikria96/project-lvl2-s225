import  _ from 'lodash';

const toStrValue = (value, offset) => {
  if (_.isObject(value)) {
  const keys = Object.keys(value);
  const str = keys.map(n => `${' '.repeat(offset+6)}${n}: ${value[n]}`).join('\n');
    return `{\n${str}\n${' '.repeat(offset+2)}}`;
  }
  return `${value}`;
};

const removed = (obj, level) => {
  const { name, value } = obj;
  const offset = level*2;
  return `${' '.repeat(offset)}- ${name}: ${toStrValue(value, offset)}`;
};

const added = (obj, level) => {
  const { name, value } = obj;
  const offset = level*2;
  return `${' '.repeat(offset)}+ ${name}: ${toStrValue(value, offset)}`;
};

const unchanged = (obj, level) => {
  const { name, value } = obj;
  const offset = level*2;
  return `${' '.repeat(offset+2)}${name}: ${toStrValue(value, offset)}`;
};

const haschildren = (obj, level, func) => {
  const { name, children } = obj;
  const offset = level*2;
  return `${' '.repeat(offset+2)}${name}: {\n${func(children ,level+2)}
${' '.repeat(offset+2)}}`;
};

const changed = (obj, level) => {
  const { name, value1, value2 } = obj;
  const offset = level*2;
  return [`${' '.repeat(offset)}- ${name}: ${toStrValue(value1, offset)}`,
  `${' '.repeat(offset)}+ ${name}: ${toStrValue(value2, offset)}`];
}
const parserTypes = {
  removed: removed,
  added: added,
  unchanged: unchanged,
  haschildren: haschildren,
  changed: changed
};

const render = (ast, level) => {
  console.log(ast);
  const parse = (elem, offset) => parserTypes[elem.type](elem, offset, render);
  const result = ast.map(elem => parse(elem, level));
  console.log(result);
  return _.flatten(result).join(`\n`);
};
const renderTree = (ast) =>`{\n${renderTree(ast, 1)}\n}`;
export default renderTree; 
