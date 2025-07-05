import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .max(100, "A senha deve ter no máximo 100 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial");

const formSchema = z.object({
  newPassword: passwordSchema
});

export type FormResetPasswordData = z.infer<typeof formSchema>;

export function useFormResetPassword() {
  return useForm<FormResetPasswordData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
    },
  });
}