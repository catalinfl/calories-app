import storage from "redux-persist/lib/storage"
import  { configureStore, combineReducers} from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import authSlice from "./slices/authSlice"
import listSlice from "./slices/listSlice"

const persistConfig = {
    key: 'root',
    storage: storage
}

const rootReducer = combineReducers({
    authSlice, listSlice
})

const persistReducerAll = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistReducerAll,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

