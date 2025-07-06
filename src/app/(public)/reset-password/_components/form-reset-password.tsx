"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormResetPasswordData, useFormResetPassword } from "../hooks/use-form-reset-password";
import { InputPassword } from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";

interface FormResetPasswordProps {
  onSubmit?: (data: FormResetPasswordData) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function FormResetPassword({
  onSubmit: onSubmitProp,
  isLoading = false,
  error = null,
}: FormResetPasswordProps
) {
  const form = useFormResetPassword();

  async function handleSubmit(formData: FormResetPasswordData) {
    if (onSubmitProp) {
      onSubmitProp(formData);
    }
    form.reset();
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Redefinir Senha</CardTitle>
        <CardDescription>
          Sua senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
        </CardDescription>
      </CardHeader>
      <CardContent>

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      placeholder="Nova senha"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-red-400 text-center">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full cursor-pointer"
            >
              {isLoading ? "Carregando..." : "Redefinir senha"}
            </Button>
          </form>
        </Form>

      </CardContent>
    </Card>
  )
}