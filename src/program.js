import program from 'commander';
import genDiff from './';

const programCli = () => {
  return program
    .version('0.1.0')
    .description(`Compares two configuration files and shows a difference.`)
    .option('-f, --format [type]', 'Output format')
    .arguments('[format] <firstConfig> <secondConfig>')
    .action((format, firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig, format)))
    .parse(process.argv);
};
export default programCli;
