import { ModeToggleTheme } from "@/components/ModeToggleTheme";
import { ModalContent } from "./_components/modal-content";

export default function Home() {
  return (
    <main className="p-6">
      <ModeToggleTheme />
      <ModalContent />

    </main>
  );
}
