import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Word } from 'src/app/interfaces/word';
import { LearningStatus } from 'src/app/enums/learning-status.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() word: Word;
  @Output() cardStatus = new EventEmitter<{ id: number, payload: Partial<Word> }>();
  constructor() { }

  ngOnInit() {
  }

  setCardStatus(payload: string) {
    let status: LearningStatus;
    switch (payload) {
      case 'unknown':
        status = LearningStatus.UNKNOWN;
        break;
      case 'learned':
        status = LearningStatus.LEARNED;
        break;
      case 'mastered':
        status = LearningStatus.MASTERED;
        break;
      default:
        status = LearningStatus.UNKNOWN;
        break;
    }
    this.cardStatus.emit({
      id: this.word.id,
      payload: {
        isLearned: status
      }
    });
  }
}
