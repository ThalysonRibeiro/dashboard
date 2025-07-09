'use server';

import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCookieServer } from '@/lib/cookieServer';
import serverApi from '@/lib/serverApi';
import type { FormLoginData } from '../hooks/use-form-login';

export async function login(data: FormLoginData) {
  try {
    const response = await serverApi.post('/auth/login-admin', {
      login: data.login,
      password: data.password,
    });

    if (!response.data.accessToken) {
      return {
        success: false,
        error: 'Credenciais inválidas',
      };
    }

    const cookieStore = await cookies();
    cookieStore.set('session', response.data.accessToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return {
      success: true,
      message: 'Login realizado com sucesso!',
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

export async function logout() {
  const accessToken = await getCookieServer();

  if (!accessToken) {
    deleteCookie('session', { path: '/' });
    redirect('/');
  }

  try {
    await serverApi.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch {
    throw new Error('Erro no logout');
  } finally {
    deleteCookie('session', { path: '/' });
    redirect('/');
  }
}
