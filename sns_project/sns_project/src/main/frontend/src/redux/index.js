import { configureStore } from '@reduxjs/toolkit';
import openModal from './reducers/openModal';

export const store = configureStore({
  reducer: { openmodal: openModal },
});
