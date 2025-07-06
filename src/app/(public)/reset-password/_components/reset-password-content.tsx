"use client"

import { useState } from "react";
import { FormResetPassword } from "./form-reset-password";
import { FormResetPasswordData } from "../hooks/use-form-reset-password";
import { resetPasswordServerAction } from "../_action/reset-password";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";



export function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = searchParams.get('token');

  async function handleSubmit(data: FormResetPasswordData) {
    setIsLoading(true);
    if (!token) {
      toast.error('Token não encontrado');
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPasswordServerAction({
        token,
        newPassword: data.newPassword
      });

      if (!response.success) {
        toast.error(response.error || 'Erro ao redefinir senha');
        return;
      }

      toast.success(response.message || 'Senha redefinida com sucesso!');

      // Opcional: redirecionar para login após sucesso
      // router.push('/login');

    } catch {
      toast.error('Erro inesperado ao redefinir senha');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <FormResetPassword
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </section>
  );
}