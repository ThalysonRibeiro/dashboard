import { ModeToggleTheme } from "@/components/ModeToggleTheme";
import { ModalRegister } from "./_components/modal-register";

export default function Home() {
  return (
    <main className="p-6">
      <ModeToggleTheme />
      <section className="container mx-auto flex w-full items-center justify-center">
        {/* <ModalLogin /> */}
        <ModalRegister />
      </section>
    </main>
  );
}
