import { validateCNPJ } from "@/utils/validateCNPJ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema para senha com validações mais robustas
const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .max(100, "A senha deve ter no máximo 100 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial");

// Enum para gênero (mais type-safe)
const genderEnum = z.enum(['masculino', 'feminino', 'outro', 'prefiro_nao_dizer']);

// Schema do formulário
const formSchema = z.object({
  email: z.string()
    .min(1, "O e-mail é obrigatório")
    .email("O e-mail deve ser válido")
    .max(255, "O e-mail deve ter no máximo 255 caracteres"),

  name: z.string()
    .min(1, "O nome é obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras e espaços"),

  cnpj: z.string()
    .min(1, "O CNPJ é obrigatório")
    .refine((value) => {
      const cleanValue = value.replace(/\D/g, "");
      if (cleanValue.length === 0) return false;
      return validateCNPJ(cleanValue);
    }, "CNPJ inválido"),

  gender: genderEnum.optional(),

  dateOfBirth: z.string()
    .min(1, "A data de nascimento é obrigatória")
    .refine((value) => {
      const date = new Date(value);
      const now = new Date();
      const minAge = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
      return date <= minAge;
    }, "Você deve ter pelo menos 18 anos")
    .refine((value) => {
      const date = new Date(value);
      const minDate = new Date(1900, 0, 1);
      return date >= minDate;
    }, "Data de nascimento inválida"),

  phone: z.string()
    .min(1, "O telefone é obrigatório")
    .refine((value) => {
      const cleanValue = value.replace(/\D/g, "");
      return cleanValue.length >= 10 && cleanValue.length <= 11;
    }, "Telefone deve ter entre 10 e 11 dígitos"),

  adminPassword: z.string()
    .min(1, "A senha de administrador é obrigatória")
    .min(6, "A senha de administrador deve ter pelo menos 6 caracteres"),

  password: passwordSchema,

  confirmPassword: z.string()
    .min(1, 'Confirmação de senha é obrigatória'),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

// Tipo inferido do schema
export type FormRegisterData = z.infer<typeof formSchema>;

// Tipo para valores iniciais (parcial e opcional)
export interface UseFormRegisterProps {
  initialValues?: Partial<FormRegisterData>;
}

// Hook personalizado para o formulário
export function useFormRegister({ initialValues }: UseFormRegisterProps = {}) {
  return useForm<FormRegisterData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      cnpj: "",
      gender: "prefiro_nao_dizer",
      dateOfBirth: "",
      phone: "",
      password: "",
      confirmPassword: "",
      adminPassword: "",
      ...initialValues, // Sobrescreve os valores padrão com os iniciais fornecidos
    },
  });
}

// Função utilitária para limpar dados do formulário antes do envio
export function sanitizeFormData(data: FormRegisterData) {
  return {
    ...data,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    cnpj: data.cnpj.replace(/\D/g, ""),
    phone: data.phone.replace(/\D/g, ""),
  };
}

// Constantes para reutilização
export const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
  { value: 'prefiro_nao_dizer', label: 'Prefiro não dizer' },
] as const;