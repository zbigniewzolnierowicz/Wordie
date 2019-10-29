import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../cards/actions/card.actions';
import * as fromCards from '../cards/reducers/card.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  words: Observable<any>

  constructor(private store: Store<fromCards.State>) {}

  ngOnInit() {
    this.words = this.store.select(fromCards.selectAll);
  }

  addCard() {
    this.store.dispatch(new actions.AddCard({
      id: 999,
      originalWord: 'test1',
      translation: 'test2'
    }));
  }

  removeCard() {
    this.store.dispatch(new actions.RemoveCard(999));
  }

}
