import { ResetPasswordContent } from './_components/reset-password-content';

export default function ResetPassword() {
  return (
    <main className='container mx-auto flex h-screen w-full flex-col items-center justify-center space-y-6 p-6'>
      <h1>Redefinir Senha</h1>

      {/* Renderiza o componente de redefinição de senha */}
      <ResetPasswordContent />
    </main>
  );
}
