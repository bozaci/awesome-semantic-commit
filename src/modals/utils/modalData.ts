import AddProjectModal from '@/modals/elements/add-project';
import ResourcesUtilisedModal from '@/modals/elements/resources-utilised';
import DisclaimerModal from '@/modals/elements/disclaimer';

type modalDataType = {
  name: string;
  element: any;
};

export const modalData: modalDataType[] = [
  {
    name: 'add-project',
    element: AddProjectModal,
  },
  {
    name: 'resources-utilised',
    element: ResourcesUtilisedModal,
  },
  {
    name: 'disclaimer',
    element: DisclaimerModal,
  },
];
