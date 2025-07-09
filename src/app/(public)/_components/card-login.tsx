'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import {
  type FormForgotPasswordData,
  useFormForgotPassword,
} from '../hooks/use-form-forgot-password';
import { type FormLoginData, useFormLogin } from '../hooks/use-form-login';

interface ModalLoginProps {
  initialValues?: Partial<FormLoginData>;
  onSubmit?: (data: FormLoginData) => void | Promise<void>;
  onForgotPasswordSubmit?: (
    data: FormForgotPasswordData
  ) => void | Promise<void>;
  onRegisterClick?: () => void;
  isLoading?: boolean;
  error: string | null;
}

export function CardLogin({
  initialValues,
  onSubmit: onSubmitProp,
  onForgotPasswordSubmit: onForgotPasswordSubmitProp,
  onRegisterClick,
  isLoading = false,
  error = null,
}: ModalLoginProps) {
  const [onForgotPasswordClick, setOnForgotPasswordClick] =
    useState<boolean>(false);
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
    <Card className='w-full max-w-md'>
      <CardHeader className="text-center">
        <CardTitle>
          {onForgotPasswordClick ? 'Esqueceu a senha?' : 'Entre na sua conta'}
        </CardTitle>
        <CardDescription>
          {onForgotPasswordClick
            ? 'Digite seu e-mail para receber um link de recuperação'
            : 'Digite suas credenciais para acessar sua conta'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {onForgotPasswordClick ? (
          <div>
            <Form {...formForgotPassword}>
              <form
                className="space-y-4"
                onSubmit={formForgotPassword.handleSubmit(
                  onForgotPasswordSubmit
                )}
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
                          autoComplete="email"
                          disabled={isLoading}
                          placeholder="Digite seu e-mail"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>
              </form>
            </Form>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="username"
                        disabled={isLoading}
                        placeholder="Digite seu e-mail"
                        type="email"
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
                        className='h-auto p-0 text-muted-foreground text-sm hover:text-primary'
                        disabled={isLoading}
                        onClick={() => setOnForgotPasswordClick(true)}
                        type="button"
                        variant="link"
                      >
                        Esqueceu a senha?
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        autoComplete="current-password"
                        disabled={isLoading}
                        placeholder="Digite sua senha"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <div className='text-center text-red-400 text-sm'>{error}</div>
              )}
              <Button
                className="w-full cursor-pointer"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>

      {/* Footer com link para cadastro */}
      {onRegisterClick && (
        <CardFooter className="flex flex-col space-y-2">
          <div className='flex items-center justify-center space-x-1 text-muted-foreground text-sm'>
            <span>Não tem uma conta?</span>
            <Button
              className='h-auto cursor-pointer p-0'
              disabled={isLoading}
              onClick={onRegisterClick}
              type="button"
              variant="link"
            >
              Cadastre-se
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
