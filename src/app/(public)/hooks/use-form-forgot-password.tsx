import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido")
    .max(255, "O e-mail deve ter no máximo 255 caracteres"),
});

export type FormForgotPasswordData = z.infer<typeof formSchema>;


export function useFormForgotPassword() {
  return useForm<FormForgotPasswordData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
}

export const FORGOT_PASSWORD_VALIDATION = {
  MAX_EMAIL_LENGTH: 255,
} as const;