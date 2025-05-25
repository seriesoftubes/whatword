import { expect, test } from 'vitest';
import { LetterPresenceValues } from './types';
import { comparePresence, replaceLetter } from './utils';


test('replaceLetter appends to the end of a word', () => {
  const word = 'foun';
  const got = replaceLetter(word, 'd', 4);
  expect(got).toBe('found');
});

test('replaceLetter appends to the end of a word - high index', () => {
  const word = 'foun';
  const got = replaceLetter(word, 'd', 40);
  expect(got).toBe('found');
});

test('replaceLetter replaces the first letter of a word', () => {
  const word = 'foun';
  const got = replaceLetter(word, 'd', 0);
  expect(got).toBe('doun');
});

test('replaceLetter replaces the second letter of a word', () => {
  const word = 'foun';
  const got = replaceLetter(word, 'd', 1);
  expect(got).toBe('fdun');
});

test('replaceLetter replaces the third letter of a word', () => {
  const word = 'foun';
  const got = replaceLetter(word, 'd', 2);
  expect(got).toBe('fodn');
});

test('replaceLetter replaces the last letter of a word', () => {
  const word = 'foun';
  const got = replaceLetter(word, 'd', 3);
  expect(got).toBe('foud');
});

test('there are only 3 values in LetterPresence', () => {
  expect(LetterPresenceValues.length).toBe(3);
});

test('all comparisons return a value', () => {
  LetterPresenceValues.forEach((i) => {
    LetterPresenceValues.forEach((j) => {
      const got = comparePresence(i, j);
      expect(got).toBeGreaterThanOrEqual(-1);
      expect(got).toBeLessThanOrEqual(1);
    });
  });
});

test('present vs present is 0', () => {
  const got = comparePresence('present', 'present');
  expect(got).toBe(0);
});

test('present vs correct is 1', () => {
  const got = comparePresence('present', 'correct');
  expect(got).toBe(1);
});

test('present vs absent is -1', () => {
  const got = comparePresence('present', 'absent');
  expect(got).toBe(-1);
});

test('absent vs absent is 0', () => {
  const got = comparePresence('absent', 'absent');
  expect(got).toBe(0);
});

test('absent vs present is 1', () => {
  const got = comparePresence('absent', 'present');
  expect(got).toBe(1);
});

test('absent vs correct is 1', () => {
  const got = comparePresence('absent', 'correct');
  expect(got).toBe(1);
});

test('correct vs correct is 0', () => {
  const got = comparePresence('correct', 'correct');
  expect(got).toBe(0);
});

test('correct vs absent is -1', () => {
  const got = comparePresence('correct', 'absent');
  expect(got).toBe(-1);
});

test('correct vs present is -1', () => {
  const got = comparePresence('correct', 'present');
  expect(got).toBe(-1);
});
