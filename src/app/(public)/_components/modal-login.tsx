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
import { FormLoginData, useFormLogin } from "../hooks/use-form-login";
import { InputPassword } from "@/components/ui/input-password";
import { useState } from "react";
import { FormForgotPasswordData, useFormForgotPassword } from "../hooks/use-form-forgot-password";

interface ModalLoginProps {
  initialValues?: Partial<FormLoginData>;
  onSubmit?: (data: FormLoginData) => void | Promise<void>;
  onForgotPasswordSubmit?: (data: FormForgotPasswordData) => void | Promise<void>;
  onRegisterClick?: () => void;
  isLoading?: boolean;
  error: string | null;
}

export function ModalLogin({
  initialValues,
  onSubmit: onSubmitProp,
  onForgotPasswordSubmit: onForgotPasswordSubmitProp,
  onRegisterClick,
  isLoading = false,
  error = null,
}: ModalLoginProps) {

  const [onForgotPasswordClick, setOnForgotPasswordClick] = useState<boolean>(false);
  const form = useFormLogin({ initialValues });
  const formForgotPassword = useFormForgotPassword();

  async function onSubmit(formData: FormLoginData) {
    if (onSubmitProp) {
      await onSubmitProp(formData);
    }
  }

  async function onForgotPasswordSubmit(formData: FormForgotPasswordData) {
    if (onForgotPasswordSubmitProp) {
      await onForgotPasswordSubmitProp(formData);
    }
  }


  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle>
          {onForgotPasswordClick ? (
            "Esqueceu a senha?"
          ) : (
            "Entre na sua conta"
          )}

        </CardTitle>
        <CardDescription>
          {onForgotPasswordClick ? (
            "Digite seu e-mail para receber um link de recuperação"
          ) : (
            "Digite suas credenciais para acessar sua conta"
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>

        {onForgotPasswordClick ? (
          <div>
            <Form {...formForgotPassword}>
              <form
                className="space-y-4"
                onSubmit={formForgotPassword.handleSubmit(onForgotPasswordSubmit)}
              >
                <FormField
                  control={formForgotPassword.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Digite seu e-mail"
                          disabled={isLoading}
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <span>Senha</span>
                      <Button
                        type="button"
                        variant="link"
                        className="h-auto p-0 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setOnForgotPasswordClick(true)}
                        disabled={isLoading}
                      >
                        Esqueceu a senha?
                      </Button>
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
              {error && (
                <div className="text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </Form>
        )}

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