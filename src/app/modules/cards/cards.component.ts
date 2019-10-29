import { Component, OnInit } from '@angular/core';
import * as actions from './actions/card.actions';
import * as fromCards from './reducers/card.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
    this.store.dispatch(new actions.AddCard({
      id: 0,
      originalWord: 'test1',
      translation: 'test2'
    }));
  }

}
