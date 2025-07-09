import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";
import serverApi from "./lib/serverApi";

enum UserType {
  ADMIN = "useradmin",
  MODERATOR = "usermoderator",
  DEFAULT = "userdefault"
}

const ADMIN_ALLOWED_TYPES = [UserType.ADMIN, UserType.MODERATOR];

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

  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const accessToken = await getCookieServer();

    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const validationResult = await validateAccessToken(accessToken);

    if (!validationResult.isValid) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Verificar se o email está verificado
    if (!validationResult.user?.emailVerified) {
      return NextResponse.redirect(new URL("/verify-email", request.url));
    }

    // Adicionar headers com informações completas do usuário
    const response = NextResponse.next();
    response.headers.set("x-user-id", validationResult.user?.id || "");
    response.headers.set("x-user-name", validationResult.user?.name || "");
    response.headers.set("x-user-email", validationResult.user?.email || "");
    response.headers.set("x-user-type", validationResult.user?.type || "");
    response.headers.set("x-user-avatar", validationResult.user?.avatar || "");
    response.headers.set("x-user-email-verified", validationResult.user?.emailVerified || "");

    return response;
  }

  return NextResponse.next();
}

async function validateAccessToken(token: string) {
  if (!token) {
    return { isValid: false, user: null };
  }

  try {
    const res = await serverApi.get<UserValidationResponse>("/auth/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user } = res.data;
    const isAllowedType = ADMIN_ALLOWED_TYPES.includes(user.type);
    const hasVerifiedEmail = !!user.emailVerified;

    return {
      isValid: isAllowedType && hasVerifiedEmail,
      user: isAllowedType ? user : null,
    };

  } catch (error) {
    console.error("Erro na validação do token:", error);
    return { isValid: false, user: null };
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",],
};

// // Exemplo para diferentes níveis de acesso
// if (pathname.startsWith("/admin")) {
//   // Apenas admin e moderador
// } else if (pathname.startsWith("/moderator")) {
//   // Apenas moderador e admin
// } else if (pathname.startsWith("/user")) {
//   // Qualquer usuário logado
// }