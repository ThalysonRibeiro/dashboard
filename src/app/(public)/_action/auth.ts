'use server'

import serverApi from '@/lib/serverApi'
import { cookies } from 'next/headers'
import { FormLoginData } from '../hooks/use-form-login';
import { AxiosError } from 'axios';

export async function loginServerAction(data: FormLoginData) {
  try {
    const response = await serverApi.post("/auth/login-admin", {
      login: data.login,
      password: data.password,
    });

    if (!response.data.accessToken) {
      return {
        success: false,
        error: 'Credenciais inválidas'
      };
    }

    const cookieStore = await cookies();
    cookieStore.set(
      "session",
      response.data.accessToken,
      {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
      }
    );

    return {
      success: true,
      message: 'Login realizado com sucesso!'
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