import { createAction } from 'redux-actions';

export const SELECT_SIGNALS = 'SELECT_SIGNALS';
export const selectSignals = createAction(SELECT_SIGNALS);

//TO-DO add reducers to handle the create trait actions based on payload
export const CREATE_TRAIT_FROM_MULTI_SIGNALS = 'CREATE_TRAIT_FROM_MULTI_SIGNALS';
export const createTraitFromMultiSignals = createAction(CREATE_TRAIT_FROM_MULTI_SIGNALS);
