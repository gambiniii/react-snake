import { combineReducers } from "redux";

import scoreReducer from './score/reducer'

export default combineReducers({
    score: scoreReducer
})