import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountFrequentlyWordsService {

  topTenWords$!: [string, number][];

  constructor() { }

  topTenWords(object: any) {
    this.topTenWords$ = this.calculateMostUsedWords(this.getLongestWord(object));
  }

  calculateMostUsedWords(words: string[]): [string, number][] {
    const freq: Map<string, number> = new Map();
    words.forEach((word) => freq.set(word, (freq.get(word) || 0) + 1));
    const sorted = [...freq].sort((prev, next) =>
      next[1] === prev[1] ? prev[0].localeCompare(next[0]) : next[1] - prev[1]
    );

    return sorted.slice(0, 10);
  }

  getLongestWord(input: any): string[] {
    if (!input) {
      return [];
    }
    let result = '';
    for (let i in input) {
      if (typeof input[i] === 'string') {
        result = result ? input[i].length > result.length ? input[i] : result : input[i];
      }
    }
    return result ? result.split(' ') : [];
  }
}
