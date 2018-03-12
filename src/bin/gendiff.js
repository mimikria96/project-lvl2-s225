#!/usr/bin/env node
import program from 'commander';
import gendiffBody from '..';


gendiffBody();
program.parse(process.argv);
