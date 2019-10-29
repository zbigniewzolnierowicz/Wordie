import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { cardReducer } from '../modules/cards/reducers/card.reducer';

export const reducers: ActionReducerMap<any> = {
  cards: cardReducer
};


export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
