import { combineReducers } from 'redux';
import { createReducer } from '../common/redux.helpers';

const movieModalReducers = createReducer({ isOpen: false }, {

});

const movieBrowserReducer = combineReducers({
    movieModal: movieModalReducers
});

export default movieBrowserReducer;