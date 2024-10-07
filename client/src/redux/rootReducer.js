import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from './slices/app';
import authReducer from './slices/auth';
import settingsReducer from './slices/settings';

// slices

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    // whitelist: [],
    // blacklist: [],
}

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
});

export { rootPersistConfig, rootReducer };