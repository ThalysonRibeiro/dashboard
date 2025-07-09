'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '../_action/auth';
import { forgotPasswordServerAction } from '../_action/forgot-password';
import { registerServerAction } from '../_action/register';
import type { FormForgotPasswordData } from '../hooks/use-form-forgot-password';
import type { FormLoginData } from '../hooks/use-form-login';
import type { FormRegisterData } from '../hooks/use-form-register';
import { CardLogin } from './card-login';
import { CardRegister } from './card-register';

export function AuthContent() {
  const router = useRouter();
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
    if (isLoading) {
      return
    };

    setIsLoading(true);

    try {
      const result = await login(data);

      if (!result.success) {
        setError(result.error || 'Erro ao fazer login');
        toast.error(result.error || 'Erro ao fazer login');
        return;
      }
      setError(null);

      // toast.success(result.message || 'Login realizado com sucesso!');
      router.push('/admin');
    } catch {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(data: FormForgotPasswordData) {
    if (isLoading) {
      return
    };

    setIsLoading(true);

    try {
      const result = await forgotPasswordServerAction(data);

      if (!result.success) {
        setError(result.error || 'Erro ao enviar link de recuperação');
        toast.error(result.error || 'Erro ao enviar link de recuperação');
        return;
      }
      setError(null);

      toast.success(
        result.message || 'Link de recuperação enviado com sucesso!'
      );
    } catch {
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='container mx-auto flex min-h-[calc(100vh-4rem)] w-full items-center justify-center'>
      {loginOrRegister ? (
        <CardLogin
          error={error}
          isLoading={isLoading}
          onForgotPasswordSubmit={handleForgotPassword}
          onRegisterClick={() => setLoginOrRegister(false)}
          onSubmit={handleLogin}
        />
      ) : (
        <CardRegister
          isLoading={isLoading}
          onRegisterClick={() => setLoginOrRegister(true)}
          onSubmit={(data) => handleRegister(data)}
        />
      )}
    </section>
  );
}
