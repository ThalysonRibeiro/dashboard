'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { InputPassword } from '@/components/ui/input-password';
import {
  type FormResetPasswordData,
  useFormResetPassword,
} from '../hooks/use-form-reset-password';

interface FormResetPasswordProps {
  onSubmit?: (data: FormResetPasswordData) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function FormResetPassword({
  onSubmit: onSubmitProp,
  isLoading = false,
  error = null,
}: FormResetPasswordProps) {
  const form = useFormResetPassword();


  async function handleSubmit(formData: FormResetPasswordData) {
    if (onSubmitProp) {
      await onSubmitProp(formData);
    }
    form.reset();
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Redefinir Senha</CardTitle>
        <CardDescription>
          Sua senha deve conter pelo menos 8 caracteres, uma letra maiúscula,
          uma letra minúscula, um número e um caractere especial
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
                      disabled={isLoading}
                      placeholder="Nova senha"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className='text-center text-red-400'>{error}</p>}
            <Button className="w-full cursor-pointer" type="submit">
              {isLoading ? 'Carregando...' : 'Redefinir senha'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
