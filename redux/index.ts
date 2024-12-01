import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { cartSlice } from './cartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { balanceSlice } from './balanceSlice';

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  balance: balanceSlice.reducer
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);  

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;