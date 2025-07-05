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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input-password";
import { FormRegisterData, useFormRegister, GENDER_OPTIONS, ACCOUNT_TYPE_OPTIONS } from "../hooks/use-form-register";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { formatPhone } from "@/utils/formatPhone";

interface ModalRegisterProps {
  initialValues?: Partial<FormRegisterData>;
  onSubmit?: (data: FormRegisterData) => void | Promise<void>;
  isLoading?: boolean;
  onRegisterClick?: () => void;
}

export function ModalRegister({
  initialValues,
  onSubmit: onSubmitProp,
  isLoading = false,
  onRegisterClick
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="Digite seu nome completo"
                        disabled={isLoading}
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
                        type="email"
                        placeholder="Digite seu e-mail"
                        disabled={isLoading}
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
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, '');
                          if (rawValue.length <= 14) {
                            const formattedValue = formatCNPJ(rawValue);
                            field.onChange(formattedValue);
                          }
                        }}
                        placeholder="00.000.000/0000-00"
                        maxLength={18}
                        disabled={isLoading}
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
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading}
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
                        type="date"
                        disabled={isLoading}
                        max={new Date().toISOString().split('T')[0]}
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
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, '');
                          if (rawValue.length <= 11) {
                            const formattedValue = formatPhone(rawValue);
                            field.onChange(formattedValue);
                          }
                        }}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        disabled={isLoading}
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
                        placeholder="Digite sua senha"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Mínimo 8 caracteres com maiúscula, minúscula, número e símbolo
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
                        placeholder="Confirme sua senha"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Mínimo 8 caracteres com maiúscula, minúscula, número e símbolo
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Senha de administrador - span full width */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full">
                <FormField
                  control={form.control}
                  name="adminPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha de administrador</FormLabel>
                      <FormControl>
                        <InputPassword
                          {...field}
                          placeholder="Digite a senha de administrador"
                          disabled={isLoading}
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
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione seu gênero" />
                          </SelectTrigger>
                          <SelectContent>
                            {ACCOUNT_TYPE_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>))}
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
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {onRegisterClick && (
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
            <span>Já tem uma conta?</span>
            <Button
              onClick={onRegisterClick}
              disabled={isLoading}
              type="button"
              variant="link"
              className="cursor-pointer h-auto p-0"
            >
              Conecte-se
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}