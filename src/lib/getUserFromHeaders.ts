import { headers } from 'next/headers';
import type { UserHeadersType } from '@/types/user-headers-type';

export async function getUserFromHeaders(): Promise<UserHeadersType | null> {
  const headersList = await headers();

  const userId = headersList.get('x-user-id');
  const userName = headersList.get('x-user-name');
  const userEmail = headersList.get('x-user-email');
  const userType = headersList.get('x-user-type');
  const userAvatar = headersList.get('x-user-avatar');
  const emailVerified = headersList.get('x-user-email-verified');

  if (
    !(
      userId &&
      userName &&
      userEmail &&
      userType &&
      emailVerified &&
      userAvatar
    )
  ) {
    return null;
  }

  return {
    id: userId,
    name: userName,
    email: userEmail,
    type: userType,
    avatar: userAvatar,
    emailVerified,
  };
}
