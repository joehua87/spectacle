import { createAction } from "redux-actions";

export const addFragment = createAction("ADD_FRAGMENT");
export const updateFragment = createAction("UPDATE_FRAGMENT");
export const nextFragment = createAction('NEXT_FRAGMENT')
export const nextFragmentStarted = createAction('NEXT_FRAGMENT_STARTED')

export const updateRoute = createAction("UPDATE_ROUTE");
