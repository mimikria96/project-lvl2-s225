const removed = (obj, acc) => {
  const { name, value } = obj;
  const strname = `- ${name}`;
  return {...acc, [strname]: value};
};

const added = (obj, acc) => {
  const { name, value } = obj;
  const strname = `+ ${name}`;
  return {...acc, [strname]: value};
};

const unchanged = (obj, acc) => {
  const { name, value } = obj;
  const strname = `  ${name}`;
  return {...acc, [strname]: value};
};

const haschildren = (obj, acc, func) => {
  const { name, children } = obj;
  const strname = `  ${name}`;
  return {...acc, [strname]: func(children)};
};

const changed = (obj, acc) => {
  const { name, value1, value2 } = obj;
  const strname1 = `- ${name}`;
  const strname2 = `+ ${name}`;
  return {...acc, [strname1]: value1 }, { [strname2]: value2};
}
const parserTypes = {
  removed: removed,
  added: added,
  unchanged: unchanged,
  haschildren: haschildren,
  changed: changed
};
const renderJson = (ast) => {
const parse = (ast) => {
  return ast.reduce((acc, elem) => parserTypes[elem.type](elem, acc, parse), {} );
};
return JSON.stringify(parse(ast));
}

export default renderJson;
