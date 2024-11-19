import AddProjectModal from '@/modals/elements/add-project';

type modalDataType = {
  name: string;
  element: any;
};

export const modalData: modalDataType[] = [
  {
    name: 'add-project',
    element: AddProjectModal,
  },
];
