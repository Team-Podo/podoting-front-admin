import { combineReducers } from 'redux';
import alarm from "./alarm";

const rootReducer = combineReducers({
    alarm
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;