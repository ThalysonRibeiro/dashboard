import { ResetPasswordContent } from "./_components/reset-password-content";

export default function ResetPassword() {
  return (
    <main className="container mx-auto space-y-6 p-6 h-screen w-full flex flex-col items-center justify-center">
      <h1>Redefinir Senha</h1>

      {/* Renderiza o componente de redefinição de senha */}
      <ResetPasswordContent />

    </main>
  );
}