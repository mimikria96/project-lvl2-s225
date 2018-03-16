import program from 'commander';
import genDiff from './';

const programCli = () => {
  return program
    .version('0.1.0')
    .description(`Compares two configuration files and shows a difference.`)
    .arguments('[format] <firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((type, firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig, type)))
    .parse(process.argv);
};
export default programCli;
