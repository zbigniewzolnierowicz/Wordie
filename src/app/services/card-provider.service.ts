import { Injectable } from '@angular/core';
import { Word } from '../interfaces/word';

@Injectable({
  providedIn: 'root'
})
export class CardProviderService {
  private listOfWords: Word[] = [
    {
      id: 0,
      originalWord: 'compiler',
      translation: 'kompilator'
    },
    {
      id: 1,
      originalWord: 'graphics card',
      translation: 'karta graficzna'
    },
    {
      id: 2,
      originalWord: 'graphics card',
      translation: 'karta graficzna'
    },
    {
      id: 3,
      originalWord: 'graphics card',
      translation: 'karta graficzna'
    },
    {
      id: 4,
      originalWord: 'graphics card',
      translation: 'karta graficzna'
    }
  ];
  constructor() { }
  get availableWords() {
    return this.listOfWords;
  }
}
