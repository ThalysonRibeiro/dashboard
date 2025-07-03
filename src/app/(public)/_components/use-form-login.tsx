import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial");

const formSchema = z.object({
  login: z.string().min(1, "O emal é obrigatório"),
  password: passwordSchema,
});

export interface UseFormLoginProps {
  initalValues?: {
    login: string;
    password: string;
  }
}

export type FormLoginData = z.infer<typeof formSchema>;

export function useFormLogin({ initalValues }: UseFormLoginProps) {
  return useForm<FormLoginData>({
    resolver: zodResolver(formSchema),
    defaultValues: initalValues || {
      login: "",
      password: "",
    },
  });
}