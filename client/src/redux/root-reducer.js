import { combineReducers } from 'redux';

import user from './user/user.reducer'

const reducer = combineReducers({
    user
    //pending to define more reducers
})

export default reducer;

