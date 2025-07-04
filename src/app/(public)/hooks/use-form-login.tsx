import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema de validação para login (mais flexível que registro)
const formSchema = z.object({
  login: z.string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido")
    .max(255, "O e-mail deve ter no máximo 255 caracteres"),

  password: z.string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres"),
});

// Tipo inferido do schema
export type FormLoginData = z.infer<typeof formSchema>;

// Props do hook (mais flexível)
export interface UseFormLoginProps {
  initialValues?: Partial<FormLoginData>;
}

// Hook personalizado para formulário de login
export function useFormLogin({ initialValues }: UseFormLoginProps = {}) {
  return useForm<FormLoginData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
      ...initialValues, // Sobrescreve valores padrão
    },
  });
}

// Função utilitária para sanitizar dados do formulário
export function sanitizeLoginData(data: FormLoginData): FormLoginData {
  return {
    login: data.login.trim().toLowerCase(),
    password: data.password, // Não modificar senha
  };
}

// Constantes para validação (caso precise usar em outros lugares)
export const LOGIN_VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
} as const;

// Schema mais rigoroso para casos específicos (opcional)
export const strictPasswordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .max(100, "A senha deve ter no máximo 100 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial");

// Hook alternativo com validação rigorosa de senha
export function useFormLoginStrict({ initialValues }: UseFormLoginProps = {}) {
  const strictSchema = z.object({
    login: formSchema.shape.login,
    password: strictPasswordSchema,
  });

  return useForm<z.infer<typeof strictSchema>>({
    resolver: zodResolver(strictSchema),
    defaultValues: {
      login: "",
      password: "",
      ...initialValues,
    },
  });
}