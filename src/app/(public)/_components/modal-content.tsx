"use client"

import { useState } from "react"
import { ModalLogin } from "./modal-login"
import { ModalRegister } from "./modal-register"
import { FormRegisterData } from "../hooks/use-form-register";
import { FormLoginData } from "../hooks/use-form-login";
import { loginServerAction } from "../_action/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerServerAction } from "../_action/register";
import { FormForgotPasswordData } from "../hooks/use-form-forgot-password";
import { forgotPasswordServerAction } from "../_action/forgot-password";


export function ModalContent() {
  const router = useRouter()
  const [loginOrRegister, setLoginOrRegister] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(data: FormRegisterData) {
    setIsLoading(true);

    try {
      const response = await registerServerAction(data);
      if (!response.success) {
        toast.error(response.error || 'Erro ao registrar');
        setLoginOrRegister(false);
        return;
      }
      toast.success(response.message || 'Registro realizado com sucesso!');
      setLoginOrRegister(!loginOrRegister);
    } catch {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }

  }

  async function handleLogin(data: FormLoginData) {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await loginServerAction(data);

      if (!result.success) {
        setError(result.error || 'Erro ao fazer login');
        toast.error(result.error || 'Erro ao fazer login');
        return;
      }
      setError(null);


      toast.success(result.message || 'Login realizado com sucesso!');
      router.push("/admin");

    } catch {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(data: FormForgotPasswordData) {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const result = await forgotPasswordServerAction(data);

      if (!result.success) {
        setError(result.error || 'Erro ao enviar link de recuperação');
        toast.error(result.error || 'Erro ao enviar link de recuperação');
        return;
      }
      setError(null);

      toast.success(result.message || 'Link de recuperação enviado com sucesso!');
    } catch {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <section className="container mx-auto min-h-[calc(100vh-4rem)] flex w-full items-center justify-center">
      {loginOrRegister ? (
        <ModalLogin
          onRegisterClick={() => setLoginOrRegister(false)}
          onSubmit={handleLogin}
          onForgotPasswordSubmit={handleForgotPassword}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <ModalRegister
          onRegisterClick={() => setLoginOrRegister(true)}
          onSubmit={(data) => handleRegister(data)}
          isLoading={isLoading}
        />
      )}
    </section>
  )
}