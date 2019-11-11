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
  @Output() deleteWord = new EventEmitter<{ id: number }>();
  translation: string;
  originalWord: string;
  editing = false;

  constructor() { }

  ngOnInit() {
    this.translation = this.word.translation;
    this.originalWord = this.word.originalWord;
    console.log(this.word);
  }

  submit() {
    this.updateWord.emit({
      id: this.word.id,
      payload: {
        translation: this.translation,
        originalWord: this.originalWord
      }
    });
  }

  formReset() {
    this.translation = this.word.translation;
    this.originalWord = this.word.originalWord;
    this.toggleEdit();
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  delete() {
    this.deleteWord.emit({ id: this.word.id });
  }

}
