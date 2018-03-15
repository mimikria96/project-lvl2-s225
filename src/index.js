import  _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parser';

const buildAst = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const build = (key, objBefore, objAfter) => {
    if (!objAfter[key]) {
      return { type: 'delited', key, value: objBefore[key]};
    }
    if (!objBefore[key]) {
      return { type: 'added', key, value: objAfter[key]};
    }
    if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
      return { type: 'haschildren', key, children: buildAst(objBefore[key], objAfter[key])};
    }
    if (objBefore[key] === objAfter[key]) {
      return { type: 'unchanged', key, value: objBefore[key]};
    }
    return {type: 'changed', key, value2: objAfter[key], value1: objBefore[key]};
  };
  return keys.map(key => build(key, obj1, obj2));
};

const strValue = (value) => {
  if (_.isObject(value)) {
  const keys = Object.keys(value);
  const str = keys.map(n => `${' '.repeat(8)}${n}: ${value[n]}`).join('\n');
    return `{\n${str}\n${' '.repeat(4)}}`;
  }
  return `${value}`;
};

const delited = (obj) => {
  const name = obj.key;
  const value = obj.value;
  return `${' '.repeat(2)}- ${name}: ${strValue(value)}`;
};

const added = (obj) => {
  const name = obj.key;
  const value = obj.value;
  return `${' '.repeat(2)}+ ${name}: ${strValue(value)}`;
};

const unchanged = (obj) => {
  const name = obj.key;
  const value = obj.value;
  return `${' '.repeat(4)}${name}: ${strValue(value)}`;
};

const haschildren = (obj, func) => {
  const name = obj.key;
  const children = obj.children;
  return `${' '.repeat(4)}${name}: {\n${children.map(elem => `${' '.repeat(4)}${func(elem)}`).join(`\n`)}
  ${' '.repeat(4)}}`;
};

const changed = (obj) => {
  const name = obj.key;
  const value1 = obj.value1;
  const value2 = obj.value2;
  return [`${' '.repeat(2)}- ${name}: ${strValue(value1)}`,
  `${' '.repeat(2)}+ ${name}: ${strValue(value2)}`].join(`\n`);
}
const parserTypes = [
  {
    check: obj => obj.type === 'delited',
    parser: delited
  },
  {
    check: obj => obj.type === 'added',
    parser: added
  },
  {
    check: obj => obj.type === 'unchanged',
    parser: unchanged
  },
  {
    check: obj => obj.type === 'haschildren',
    parser: haschildren
  },
  {
    check: obj => obj.type === 'changed',
    parser: changed
  }
]

const getParserType = arg => _.find(parserTypes, ({ check }) => check(arg));

const parseAst = (ast) => {
  const parse = (elem) => getParserType(elem).parser(elem, parse);
  return ast.map(parse).join(`\n`)
};


const genDiff = (fileBefore, fileAfter) => {
  const dataBefore = fs.readFileSync(fileBefore, 'utf-8');
  const dataAfter = fs.readFileSync(fileAfter, 'utf-8');
  const format = path.extname(fileBefore);
  const objBefore = parseFile(dataBefore, format);
  const objAfter = parseFile(dataAfter, format);
  const ast = buildAst(objBefore, objAfter);
  console.log(ast);
  return `{\n${parseAst(ast)}\n}`;
};

export default genDiff;
