import { expect, test } from 'vitest';
import {WORDS} from './words';


test('every word is 5 characters', () => {
  for (const word of WORDS) {
    expect(word.length).toBe(5);
  }
});

test('every word is all caps', () => {
  for (const word of WORDS) {
    for (const c of word) {
      expect(c).toBe(c.toUpperCase().trim());
    }
  }
});

