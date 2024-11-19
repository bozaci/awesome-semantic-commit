'use client';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ReduxToolkitProvidersProps } from './redux-toolkit-provider.type';

const ReduxToolkitProvider: FC<ReduxToolkitProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxToolkitProvider;
