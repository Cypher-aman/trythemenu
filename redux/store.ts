import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './features/menuSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartSlice from './features/cartSlice';

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
