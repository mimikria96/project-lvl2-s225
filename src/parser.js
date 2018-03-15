
import yaml from 'js-yaml';
import ini from 'ini';


const typeParsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parseFile = (file, format) => {
  return typeParsers[format](file);
};
export default parseFile;
