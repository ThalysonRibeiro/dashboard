import { Sidebar } from "./_components/sidebar";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {

  return (
    <Sidebar>
      {children}
    </Sidebar>
  )
}