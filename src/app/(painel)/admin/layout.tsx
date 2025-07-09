import { Sidebar } from "./_components/sidebar";
import { getUserFromHeaders } from "./_data-access/get-user-from-headers";


export default async function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const user = await getUserFromHeaders();
  if (!user) {
    return null
  };

  return (
    <Sidebar user={user}>
      {children}
    </Sidebar>
  )
}