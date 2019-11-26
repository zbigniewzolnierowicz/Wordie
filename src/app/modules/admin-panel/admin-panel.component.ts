import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../cards/actions/card.actions';
import * as fromCards from '../cards/reducers/card.reducer';
import { Observable } from 'rxjs';
import { Word } from 'src/app/interfaces/word';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  words$: Observable<Word[]>;
  originalWord: string;
  translation: string;
  newId: number;

  newWord = new FormGroup({
    originalWord: new FormControl(''),
    translation: new FormControl('')
  });

  constructor(private store: Store<fromCards.State>) {}

  ngOnInit() {
    this.words$ = this.store.select(fromCards.selectAll);
    this.words$.subscribe(words => {
      this.newId = words.length;
    });
  }

  addCard() {
    this.store.dispatch(new actions.AddCard({
      id: this.newId,
      originalWord: this.newWord.get('originalWord').value,
      translation: this.newWord.get('translation').value
    }));
  }

  removeCard(payload: { id: number }) {
    this.store.dispatch(new actions.RemoveCard(payload.id));
  }

  updateCard(payload: {id: number, payload: Partial<Word>}) {
    this.store.dispatch(new actions.ModifyCard(payload.id, payload.payload));
  }

}
