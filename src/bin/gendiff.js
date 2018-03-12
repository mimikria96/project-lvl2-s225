#!/usr/bin/env node
import program from 'commander';
import gendiffBody from '..';


gendiffBody().parse(process.argv);
