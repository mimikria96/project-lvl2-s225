import {genDiff} from '../src/';

const expected =
  `host: hexlet.io
 + timeout: 20
 - timeout: 50
 - proxy: 123.234.53.22
 + verbose: true`;

test('tostring files diff', () => {
  expect(genDiff('./__test__/__fixtures__/before.ini', './__test__/__fixtures__/after.ini')).toBe(expected);
});
