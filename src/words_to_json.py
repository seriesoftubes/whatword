"""Converts a text words file to a TypeScript Set.

Meant for use on a file from: https://github.com/dwyl/english-words

Usage example:
python3 words_to_json.py ~/Downloads/words.txt > words.ts
"""

import json
import string
import sys


def main(argv):
    input_file = sys.argv[1]
    words = []
    letters = frozenset(string.ascii_letters)
    with open(input_file, 'r') as f:
        for line in f:
            line = line.strip()
            if len(line) == 5 and line.isalpha() and not (set(line) - letters):
                words.append(line.upper())
    print('export const WORDS = new Set(', json.dumps(words, indent=2), ');')

if __name__ == "__main__":
    main(sys.argv)
