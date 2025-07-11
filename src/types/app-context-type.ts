import type { AxiosInstance } from 'axios';
import type { ReactNode } from 'react';
import type { UserHeadersType } from './user-headers-type';
import type { ProfileType } from './user-type';

export interface AppContextType {
  is?: boolean;
  accessToken: string | null;
  api: AxiosInstance;
  userData: ProfileType | null;
}

export interface ProviderProps {
  accessToken: string | null;
  userHeaders: UserHeadersType | null;
  children: ReactNode;
}
