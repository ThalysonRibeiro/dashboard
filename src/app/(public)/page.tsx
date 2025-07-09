import { ModeToggleTheme } from "@/components/ModeToggleTheme";
import { AuthContent } from "./_components/auth-content";

export default function Home() {
  return (
    <main className="p-6">
      <ModeToggleTheme />
      <AuthContent />

    </main>
  );
}
