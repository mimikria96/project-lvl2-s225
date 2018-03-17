import program from 'commander';
import genDiff from './';

const programCli = () => {
  return program
    .version('0.1.0')
    .description(`Compares two configuration files and shows a difference.`)
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .action((firstConfig, secondConfig, type) => console.log(genDiff(firstConfig, secondConfig, type.format)))
    .parse(process.argv);
};
export default programCli;
