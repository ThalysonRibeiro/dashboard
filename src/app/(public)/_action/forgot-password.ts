'use server';

import { AxiosError } from 'axios';
import serverApi from '@/lib/serverApi';
import type { FormForgotPasswordData } from '../hooks/use-form-forgot-password';

export async function forgotPasswordServerAction(data: FormForgotPasswordData) {
  try {
    const response = await serverApi.post('/auth/forgot-password/dashboard', {
      email: data.email,
    });

    if (!response.data) {
      return {
        success: false,
        error: response.data.error || 'Erro ao enviar link de recuperação',
      };
    }

    return {
      success: true,
      message: 'Link de recuperação enviado com sucesso!',
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido';

      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: false,
      error: 'Erro interno do servidor',
    };
  }
}
