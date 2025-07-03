"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLoginData, useFormLogin } from "./use-form-login";
import { InputPassword } from "@/components/ui/input-password";

interface ModalLoginProps {
  initialValues?: Partial<FormLoginData>;
  onSubmit?: (data: FormLoginData) => void | Promise<void>;
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
  isLoading?: boolean;
}

export function ModalLogin({
  initialValues,
  onSubmit: onSubmitProp,
  onRegisterClick,
  onForgotPasswordClick,
  isLoading = false
}: ModalLoginProps) {
  const form = useFormLogin({ initialValues });

  async function onSubmit(formData: FormLoginData) {
    if (onSubmitProp) {
      await onSubmitProp(formData);
    } else {
      console.log(formData);
    }
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>
          Digite suas credenciais para acessar sua conta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Campo de Login */}
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Digite seu e-mail"
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo de Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <span>Senha</span>
                    {onForgotPasswordClick && (
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                        onClick={onForgotPasswordClick}
                        disabled={isLoading}
                      >
                        Esqueceu a senha?
                      </Button>
                    )}
                  </FormLabel>
                  <FormControl>
                    <InputPassword
                      {...field}
                      placeholder="Digite sua senha"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botão de Login */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* Footer com link para cadastro */}
      {onRegisterClick && (
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
            <span>Não tem uma conta?</span>
            <Button
              type="button"
              variant="link"
              className="cursor-pointer h-auto p-0"
              onClick={onRegisterClick}
              disabled={isLoading}
            >
              Cadastre-se
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}