import { combineReducers } from 'redux';

import user, * as userSelectors from './user/user.reducer'

const reducer = combineReducers({
    user
    //pending to define more reducers
})

export default reducer;

