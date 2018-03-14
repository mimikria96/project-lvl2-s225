import  _ from 'lodash';
import parseFile from './parser';

const genDiff = (fileBefore, fileAfter) => {
  const objBefore = parseFile(fileBefore);
  const objAfter = parseFile(fileAfter);
  const keys = _.union(Object.keys(objBefore), Object.keys(objAfter));
  const result = keys.reduce((acc, key) => {
    if (!objAfter[key]) {
      return [...acc, ` - ${key}: ${objBefore[key]}`];
    }
    if (!objBefore[key]) {
      return [...acc, ` + ${key}: ${objAfter[key]}`]
    }
    if (objBefore[key] === objAfter[key]) {
      return [...acc,`${key}: ${objBefore[key]}`];
    }
    return [...acc,` + ${key}: ${objAfter[key]}\n - ${key}: ${objBefore[key]}`];
  }, []).join('\n');
  return result;
};

export default genDiff;
