import genDiff from '../src/';
import expjson from './__fixtures__/expectedjson';
import exptree from './__fixtures__/exptree';

const expectedPlain =
`Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed with value: '123.234.53.22'
Property 'verbose' was added with value: 'true'`;

const expected =
`{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  + verbose: true
}`;


test('tostring files diff', () => {
  expect(genDiff('./__test__/__fixtures__/before.json', './__test__/__fixtures__/after.json')).toBe(expected);
});
test('tostring files diff ini', () => {
  expect(genDiff('./__test__/__fixtures__/before.ini', './__test__/__fixtures__/after.ini')).toBe(expected);
});

test('step 5 ast', () => {
  expect(genDiff('./__test__/__fixtures__/before1.json', './__test__/__fixtures__/after1.json'))
  .toBe(exptree());
});

test('tostring files diff plain format', () => {
  expect(genDiff('./__test__/__fixtures__/before.json', './__test__/__fixtures__/after.json', 'plain')).toBe(expectedPlain);
});

test('tostring files diff json format', () => {
  expect(genDiff('./__test__/__fixtures__/before1.json', './__test__/__fixtures__/after1.json', 'json')).toBe(expjson());
});
