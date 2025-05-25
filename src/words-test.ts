import { expect, test } from 'vitest';
import { OTHER_WORDS, WORDS } from './words';


const ALL_WORDS = WORDS.union(OTHER_WORDS);

function isSet<T>(variable: unknown): variable is Set<T> {
  return variable instanceof Set;
}

test('sets are used', () => {
  expect(isSet(WORDS)).toBe(true);
  expect(isSet(OTHER_WORDS)).toBe(true);
});

test('every word is 5 characters', () => {
  for (const word of ALL_WORDS) {
    expect(word.length).toBe(5);
  }
});

test('every word is all caps', () => {
  for (const word of ALL_WORDS) {
    for (const c of word) {
      expect(c).toBe(c.toUpperCase().trim());
    }
  }
});

test('every word only contains a-z', () => {
  const re = /[A-Z]{5}/;
  for (const word of ALL_WORDS) {
    expect(re.test(word), `expected word "${word}" to have A-Z`).toBe(true);
  }
});
