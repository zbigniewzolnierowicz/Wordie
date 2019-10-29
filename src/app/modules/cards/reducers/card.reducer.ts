import { ActionReducer, createReducer, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Word } from 'src/app/interfaces/word';
import { ADD_CARD, MODIFY_CARD, REMOVE_CARD, CardActions } from '../actions/card.actions';

export const cardAdapter = createEntityAdapter<Word>();

export interface State extends EntityState<Word> { }

export const initialState: State = cardAdapter.getInitialState({
  ids: [],
  entities: {}
});

export function cardReducer(state: State = initialState, action: CardActions) {
    switch (action.type) {
        case ADD_CARD:
            return cardAdapter.addOne(action.payload, state);
        case REMOVE_CARD:
            return cardAdapter.removeOne(action.payload, state);
        case MODIFY_CARD:
            return cardAdapter.updateOne({id: action.id, changes: action.payload }, state);
        default:
            return state;
    }
}

export const getCardState = createFeatureSelector<State>('cards');
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = cardAdapter.getSelectors(getCardState);
