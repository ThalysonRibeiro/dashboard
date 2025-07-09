import { type NextRequest, NextResponse } from 'next/server';
import { getCookieServer } from './lib/cookieServer';
import serverApi from './lib/serverApi';

export const UserType = {
  ADMIN: 'useradmin',
  MODERATOR: 'usermoderator',
  DEFAULT: 'userdefault',
} as const;
type UserType = typeof UserType[keyof typeof UserType];

const ADMIN_ALLOWED_TYPES: UserType[] = [UserType.ADMIN, UserType.MODERATOR];

interface UserValidationResponse {
  user: {
    id: string;
    name: string;
    email: string;
    type: UserType;
    avatar?: string;
    emailVerified?: string | null; // DateTime do Prisma vem como string
  };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Verificar se está na rota raiz e tem sessão válida
  if (pathname === '/') {
    const accessToken = await getCookieServer();

    if (accessToken) {
      const validationResult = await validateAccessToken(accessToken);

      if (validationResult.isValid) {
        // Se tem sessão válida, redireciona para /admin
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

    // Se não tem sessão válida, permite acesso à página inicial
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    return handleAdminRoute(request);
  }

  return NextResponse.next();
}

async function handleAdminRoute(request: NextRequest) {
  const accessToken = await getCookieServer();

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const validationResult = await validateAccessToken(accessToken);

  if (!validationResult.isValid) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Verificar se o email está verificado
  if (!validationResult.user?.emailVerified) {
    return NextResponse.redirect(new URL('/verify-email', request.url));
  }

  // Adicionar headers com informações completas do usuário
  const response = NextResponse.next();
  response.headers.set('x-user-id', validationResult.user?.id || '');
  response.headers.set('x-user-name', validationResult.user?.name || '');
  response.headers.set('x-user-email', validationResult.user?.email || '');
  response.headers.set('x-user-type', validationResult.user?.type || '');
  response.headers.set('x-user-avatar', validationResult.user?.avatar || '');
  response.headers.set(
    'x-user-email-verified',
    validationResult.user?.emailVerified || ''
  );

  return response;
}

async function validateAccessToken(token: string) {
  if (!token) {
    return { isValid: false, user: null };
  }

  try {
    const res = await serverApi.get<UserValidationResponse>(
      '/auth/validate-token',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { user } = res.data;
    const isAllowedType = ADMIN_ALLOWED_TYPES.includes(user.type);
    const hasVerifiedEmail = !!user.emailVerified;

    return {
      isValid: isAllowedType && hasVerifiedEmail,
      user: isAllowedType ? user : null,
    };
  } catch {
    // console.error('Erro na validação do token:', error);
    return { isValid: false, user: null };
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};