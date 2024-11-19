import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type modalType = {
  name: string;
};

interface ModalState {
  modal: modalType[];
}

const initialState: ModalState = {
  modal: [],
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    append: (state, action: PayloadAction<modalType>) => {
      state.modal.push(action.payload);
    },
    destory: (state, action: PayloadAction<string>) => {
      const data = [...state.modal];
      const index = state.modal.findIndex((m) => m.name === action.payload);

      data.splice(index, 1);
      state.modal = data;
    },
  },
});

export const { append, destory } = modalSlice.actions;

export default modalSlice.reducer;
