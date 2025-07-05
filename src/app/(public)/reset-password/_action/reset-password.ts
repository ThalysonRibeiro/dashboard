'use server'

import serverApi from '@/lib/serverApi'
import { AxiosError } from 'axios';

export async function resetPasswordServerAction({ token, newPassword }: { newPassword: string, token: string }) {
  try {
    const response = await serverApi.post('/auth/reset-password', { token, newPassword });

    return {
      success: true,
      message: response.data.message || 'Senha redefinida com sucesso'
    };

  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido';

      return {
        success: false,
        error: errorMessage
      };
    }

    return {
      success: false,
      error: 'Erro interno do servidor'
    };
  }
}