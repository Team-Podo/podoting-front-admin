import { combineReducers } from 'redux';
import alarm from "./alarm";
import confirm from "./confirm";

const rootReducer = combineReducers({
    alarm,
    confirm
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;