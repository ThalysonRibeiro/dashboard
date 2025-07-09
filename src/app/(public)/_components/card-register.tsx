'use client';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCNPJ } from '@/utils/formatCNPJ';
import { formatPhone } from '@/utils/formatPhone';
import {
  ACCOUNT_TYPE_OPTIONS,
  type FormRegisterData,
  GENDER_OPTIONS,
  useFormRegister,
} from '../hooks/use-form-register';

interface ModalRegisterProps {
  initialValues?: Partial<FormRegisterData>;
  onSubmit?: (data: FormRegisterData) => void | Promise<void>;
  isLoading?: boolean;
  onRegisterClick?: () => void;
}

export function CardRegister({
  initialValues,
  onSubmit: onSubmitProp,
  isLoading = false,
  onRegisterClick,
}: ModalRegisterProps) {
  const form = useFormRegister({ initialValues });

  async function onSubmit(formData: FormRegisterData) {
    if (onSubmitProp) {
      await onSubmitProp(formData);
    } else {
      form.reset();
    }
  }

  return (
    <Card className="w-full min-w-lg max-w-5xl">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Digite seu nome completo"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Digite seu e-mail"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CNPJ */}
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        maxLength={18}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, '');
                          if (rawValue.length <= 14) {
                            const formattedValue = formatCNPJ(rawValue);
                            field.onChange(formattedValue);
                          }
                        }}
                        placeholder="00.000.000/0000-00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gênero */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione seu gênero" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDER_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Data de nascimento */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de nascimento</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        max={new Date().toISOString().split('T')[0]}
                        type="date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Telefone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        maxLength={15}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, '');
                          if (rawValue.length <= 11) {
                            const formattedValue = formatPhone(rawValue);
                            field.onChange(formattedValue);
                          }
                        }}
                        placeholder="(00) 00000-0000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        disabled={isLoading}
                        placeholder="Digite sua senha"
                      />
                    </FormControl>
                    <FormDescription>
                      Mínimo 8 caracteres com maiúscula, minúscula, número e
                      símbolo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirmar senha */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <InputPassword
                        {...field}
                        disabled={isLoading}
                        placeholder="Confirme sua senha"
                      />
                    </FormControl>
                    <FormDescription>
                      Mínimo 8 caracteres com maiúscula, minúscula, número e
                      símbolo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Senha de administrador - span full width */}
              <div className='col-span-full grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name="adminPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha de administrador</FormLabel>
                      <FormControl>
                        <InputPassword
                          {...field}
                          disabled={isLoading}
                          placeholder="Digite a senha de administrador"
                        />
                      </FormControl>
                      <FormDescription>
                        Senha necessária para criar contas de administrador
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Account Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de conta</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione seu gênero" />
                          </SelectTrigger>
                          <SelectContent>
                            {ACCOUNT_TYPE_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Selecione o tipo de conta que deseja criar
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              className="w-full cursor-pointer"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {onRegisterClick && (
        <CardFooter className="flex flex-col space-y-2">
          <div className='flex items-center justify-center space-x-1 text-muted-foreground text-sm'>
            <span>Já tem uma conta?</span>
            <Button
              className='h-auto cursor-pointer p-0'
              disabled={isLoading}
              onClick={onRegisterClick}
              type="button"
              variant="link"
            >
              Conecte-se
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
