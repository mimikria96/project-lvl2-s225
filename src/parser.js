import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';


const typeParsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parseFile = (file) => {
  const format = path.extname(file);
  const data = fs.readFileSync(file, 'utf-8');
  return typeParsers[format](data);
};
export default parseFile;
