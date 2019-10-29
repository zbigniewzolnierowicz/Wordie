import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/interfaces/word';

@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrls: ['./card-admin.component.scss']
})
export class CardAdminComponent implements OnInit {
  @Input() word: Word;
  @Output() updateWord = new EventEmitter<{ id: number, payload: Partial<Word> }>();
  translation: string;
  originalWord: string;

  constructor() { }

  ngOnInit() {
    this.translation = this.word.translation;
    this.originalWord = this.word.originalWord;
  }
  onSubmit() {
    this.updateWord.emit({
      id: this.word.id,
      payload: {
        translation: this.translation,
        originalWord: this.originalWord
      }
    });
  }

}
