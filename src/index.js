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

const strValue = (value, offset) => {
  if (_.isObject(value)) {
  const keys = Object.keys(value);
  const str = keys.map(n => `${' '.repeat(offset+4)}${n}: ${value[n]}`).join('\n');
    return `{\n${str}\n${' '.repeat(offset)}}`;
  }
  return `${value}`;
};

const delited = (obj, offset) => {
  const name = obj.key;
  const value = obj.value;
  return `${' '.repeat(2)}- ${name}: ${strValue(value, offset)}`;
};

const added = (obj, offset) => {
  const name = obj.key;
  const value = obj.value;
  return `${' '.repeat(2)}+ ${name}: ${strValue(value, offset)}`;
};

const unchanged = (obj, offset) => {
  const name = obj.key;
  const value = obj.value;
  return `${' '.repeat(4)}${name}: ${strValue(value, offset)}`;
};

const haschildren = (obj, offset, func) => {
  const name = obj.key;
  const children = obj.children;
  return `${' '.repeat(4)}${name}: {\n${children.map(elem => `${' '.repeat(offset)}${func(elem, offset*2)}`).join(`\n`)}
  ${' '.repeat(offset-2)}}`;
};

const changed = (obj, offset) => {
  const name = obj.key;
  const value1 = obj.value1;
  const value2 = obj.value2;
  return [`${' '.repeat(2)}- ${name}: ${strValue(value1, offset)}`,
  `${' '.repeat(offset-2)}+ ${name}: ${strValue(value2, offset)}`].join(`\n`);
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
  const offset = 4;
  const parse = (elem, offset) => getParserType(elem).parser(elem, offset, parse);
  return ast.map(elem => parse(elem, offset)).join(`\n`)
};


const genDiff = (fileBefore, fileAfter) => {
  const dataBefore = fs.readFileSync(fileBefore, 'utf-8');
  const dataAfter = fs.readFileSync(fileAfter, 'utf-8');
  const format = path.extname(fileBefore);
  const objBefore = parseFile(dataBefore, format);
  const objAfter = parseFile(dataAfter, format);
  const ast = buildAst(objBefore, objAfter);
  return `{\n${parseAst(ast)}\n}`;
};

export default genDiff;
