import  _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parser';
import renderAst from './renderers';

const buildAst = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const build = (key, objBefore, objAfter) => {
    if (!_.has(objAfter, key)) {
      return { type: 'removed', name : key, value: objBefore[key]};
    }
    if (!_.has(objBefore, key)) {
      return { type: 'added', name : key, value: objAfter[key]};
    }
    if (_.isObject(objBefore[key]) && _.isObject(objAfter[key])) {
      return { type: 'haschildren', name : key, children: buildAst(objBefore[key], objAfter[key])};
    }
    if (objBefore[key] === objAfter[key]) {
      return { type: 'unchanged', name : key, value: objBefore[key]};
    }
    return {type: 'changed', name : key, value2: objAfter[key], value1: objBefore[key]};
  };
  return keys.map(key => build(key, obj1, obj2));
};



const genDiff = (fileBefore, fileAfter, renderType = 'tree') => {
  const dataBefore = fs.readFileSync(fileBefore, 'utf-8');
  const dataAfter = fs.readFileSync(fileAfter, 'utf-8');
  const format = path.extname(fileBefore);
  const objBefore = parseFile(dataBefore, format);
  const objAfter = parseFile(dataAfter, format);
  const ast = buildAst(objBefore, objAfter);
  return renderAst(ast, renderType);
};

export default genDiff;
