import  _ from 'lodash';

const toStrValue = (value, offset) => {
  if (_.isObject(value)) {
  const keys = Object.keys(value);
  const str = keys.map(n => `${' '.repeat(offset*2+4)}${n}: ${value[n]}`).join('\n');
    return `{\n${str}\n${' '.repeat(offset*2)}}`;
  }
  return `${value}`;
};

const removed = (obj, level) => {
  const { name, value } = obj;
  const offset = level*2;
  return `${' '.repeat(2)}- ${name}: ${toStrValue(value, offset)}`;
};

const added = (obj, level) => {
  const { name, value } = obj;
  const offset = level*2;
  return `${' '.repeat(2)}+ ${name}: ${toStrValue(value, offset)}`;
};

const unchanged = (obj, level) => {
  const { name, value } = obj;
  const offset = level*2;
  return `${' '.repeat(4)}${name}: ${toStrValue(value, offset)}`;
};

const haschildren = (obj, level, func) => {
  const { name, children } = obj;
  const offset = level*2;
  return `${' '.repeat(4)}${name}: {\n${children.map(elem => `${' '.repeat(offset*2)}${func(elem, level+1)}`).join(`\n`)}
  ${' '.repeat(offset*2-2)}}`;
};

const changed = (obj, level) => {
  const { name, value1, value2 } = obj;
  const offset = level*2;
  return [`${' '.repeat(2)}- ${name}: ${toStrValue(value1, offset)}`,
  `${' '.repeat(offset*2-2)}+ ${name}: ${toStrValue(value2, offset)}`].join(`\n`);
}
const parserTypes = [
  {
    check: obj => obj.type === 'removed',
    parse: removed
  },
  {
    check: obj => obj.type === 'added',
    parse: added
  },
  {
    check: obj => obj.type === 'unchanged',
    parse: unchanged
  },
  {
    check: obj => obj.type === 'haschildren',
    parse: haschildren
  },
  {
    check: obj => obj.type === 'changed',
    parse: changed
  }
]

const getParserType = arg => _.find(parserTypes, ({ check }) => check(arg));

const renderTree = (ast) => {
  const level = 1;
  console.log(ast)
  const parse = (elem, offset) => getParserType(elem).parse(elem, offset, parse);
  return `{\n${ast.map(elem => parse(elem, level)).join(`\n`)}\n}`;
};

export default renderTree;
