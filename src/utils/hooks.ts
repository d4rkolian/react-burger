// hooks.ts
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from 'react-redux';
import type { TRootState } from '../index';
import { AppDispatch, AppThunk } from '../types/data';

// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook; 
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 