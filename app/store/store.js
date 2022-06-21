import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {reducer as network} from 'react-native-offline';
import thunk from 'redux-thunk';
import {recitationReducer} from './reducers/recitationReducer';
import salahReducer from './reducers/salahReducer';
import settingsReducer from './reducers/settingsReducer';

const rootReducer = combineReducers({
  recitations: recitationReducer,
  salah: salahReducer,
  settings: settingsReducer,
  network,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;
