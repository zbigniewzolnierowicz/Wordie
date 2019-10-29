import { Word } from 'src/app/interfaces/word';
import { Action } from '@ngrx/store';

export const ADD_CARD = '[Cards] Add';
export const REMOVE_CARD = '[Cards] Remove';
export const MODIFY_CARD = '[Cards] Modify';

export class AddCard implements Action {
    readonly type = ADD_CARD;
    constructor(public payload: Word) {}
}

export class RemoveCard implements Action {
    readonly type = REMOVE_CARD;
    constructor(public payload: number) {}
}

export class ModifyCard implements Action {
    readonly type = MODIFY_CARD;
    constructor(public id: number, public payload: Partial<Word>) {}
}

export type CardActions = AddCard | RemoveCard | ModifyCard;
