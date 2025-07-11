'use client';

import type { AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import type { ProfileType } from '@/types/user-type';

export function useUserDetails({
  userId,
  api,
}: {
  userId: string | null;
  api: AxiosInstance;
}) {
  const [userData, setUserData] = useState<ProfileType | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get(`/auth/profile/${userId}`);
        if (response.status !== 200) {
          return {
            userData: null,
          };
        }
        setUserData(response.data);
      } catch {
        return {
          userData: null,
        };
      }
    }
    fetchUserData();
  }, [api, userId]);

  return {
    userData,
  };
}
