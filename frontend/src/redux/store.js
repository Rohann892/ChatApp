import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice.js'
import messageReducer from './messageSlice.js'
import socketReducer from './socketSlice.js'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // Only persist user slice
};

const persistedReducer = persistReducer(persistConfig, (state, action) => ({
    user: userReducer(state?.user, action),
    message: messageReducer(state?.message, action),
    socket: socketReducer(state?.socket, action),
}));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['socket/setSocket', 'persist/PERSIST'],
                ignoredPaths: ['socket.socket'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;