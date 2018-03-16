import genDiff from '../src/';

const expected =
`{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  + verbose: true
}`;
const expectedTreeJson =
`{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
test('tostring files diff', () => {
  expect(genDiff('./__test__/__fixtures__/before.json', './__test__/__fixtures__/after.json')).toBe(expected);
});
test('tostring files diff ini', () => {
  expect(genDiff('./__test__/__fixtures__/before.ini', './__test__/__fixtures__/after.ini')).toBe(expected);
});

test('step 5 ast', () => {
  expect(genDiff('./__test__/__fixtures__/before1.json', './__test__/__fixtures__/after1.json'))
  .toBe(expectedTreeJson);
});
