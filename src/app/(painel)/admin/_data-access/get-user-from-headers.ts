import { headers } from 'next/headers';

interface UserProps {
  id: string;
  name: string;
  email: string;
  type: string;
  avatar?: string;
}

export async function getUserFromHeaders(): Promise<UserProps | null> {
  const headersList = await headers();

  const id = headersList.get('x-user-id');
  const name = headersList.get('x-user-name');
  const email = headersList.get('x-user-email');
  const type = headersList.get('x-user-type');
  const avatar = headersList.get('x-user-avatar');

  if (!(id && name && email && type)) {
    return null;
  }

  return {
    id,
    name,
    email,
    type,
    avatar: avatar || undefined,
  };
}
