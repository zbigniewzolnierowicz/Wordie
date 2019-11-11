import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as actions from './actions/card.actions';
import * as fromCards from './reducers/card.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LearningStatus } from 'src/app/enums/learning-status.enum';
import { Word } from 'src/app/interfaces/word';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  words: Observable<any>;

  constructor(private store: Store<fromCards.State>) { }

  ngOnInit() {
    this.words = this.store.select(fromCards.selectAll);
  }

  handleCardChangeStatus(event: { id: number, payload: Partial<Word> }) {
    this.store.dispatch(new actions.ModifyCard(event.id, event.payload));
  }

}
