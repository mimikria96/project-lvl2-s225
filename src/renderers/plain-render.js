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

const renderPlain = (ast) => {
  const parentName = '';
  console.log(ast)
  const parse = (elem, parentName) => getParserType(elem).parse(elem, parentName, parse);
  const result = ast.map(elem => parse(elem, parentName));
  return result.filter(elem => elem !== ' '). join(`\n`);
};

export default renderPlain;
