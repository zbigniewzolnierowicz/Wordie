import { Component, OnInit } from '@angular/core';
import * as actions from 'src/app/modules/cards/actions/card.actions';
import * as fromCards from 'src/app/modules/cards/reducers/card.reducer';
import { Store } from '@ngrx/store';
import { Word } from 'src/app/interfaces/word';
import { Observable } from 'rxjs';
import { LearningStatus } from 'src/app/enums/learning-status.enum';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  words$: Observable<Word[]>;
  stats: { unknown: number, learned: number, mastered: number };
  constructor(
    private store: Store<fromCards.State>
  ) { }

  ngOnInit() {
    this.words$ = this.store.select(fromCards.selectAll);
    this.words$.subscribe(words => {
      const learnedWords = words.filter(word => word.isLearned === LearningStatus.LEARNED);
      const unknownWords = words.filter(word => word.isLearned === LearningStatus.UNKNOWN);
      const masteredWords = words.filter(word => word.isLearned === LearningStatus.MASTERED);
      this.stats = {
        learned: learnedWords.length,
        unknown: unknownWords.length,
        mastered: masteredWords.length
      };
    });
  }

  setAllAs(payload: string) {
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
    this.words$.pipe(take(1)).toPromise().then(words => {
      words.forEach(word => {
        this.store.dispatch(new actions.ModifyCard(word.id, { isLearned: status }));
      });
    });
  }

}
