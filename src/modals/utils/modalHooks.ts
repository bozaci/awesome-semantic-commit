import { store, RootState } from '@/store';
import { append, destory } from '@/slices/modalSlice';
import { modalType } from '@/slices/modalSlice';
import { modalData } from './modalData';
import { useSelector } from 'react-redux';

const dispatch = store.dispatch;

export const useModals = () => useSelector((state: RootState) => state.modal.modal);
export const openModal = ({ name }: modalType) => {
  const isExistsModal = modalData.find((m) => m.name === name)?.element;

  if (!isExistsModal) throw new Error(`"${name}" modal is not defined.`);

  dispatch(
    append({
      name,
    }),
  );
};
export const closeModal = (name: string) => {
  const isExistsModal = modalData.find((m) => m.name === name)?.element;

  if (!isExistsModal) throw new Error(`"${name}" modal is not defined.`);

  dispatch(destory(name));
};
