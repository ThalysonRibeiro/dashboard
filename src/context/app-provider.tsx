'use client';

import type { ProviderProps } from '@/types/app-context-type';
import { AppContext } from './app-context';
import { useApi } from './hooks/use-api';
import { useUserDetails } from './hooks/use-user-details';

function AppProvider({ children, accessToken, userHeaders }: ProviderProps) {
  const { api } = useApi({ accessToken });
  const { userData } = useUserDetails({ userId: userHeaders?.id || null, api });

  return <AppContext chuildren={children} value={{ accessToken, api, userData }} />;
}

export default AppProvider;
