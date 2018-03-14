import program from 'commander';
import * as _ from 'lodash';
import parseFile from './parser';

export const genDiff = (fileBefore, fileAfter) => {
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
}

export const programCli = () => {
  return program
    .version('0.1.0')
    .description(`Compares two configuration files and shows a difference.`)
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)))
    .parse(process.argv);
};
