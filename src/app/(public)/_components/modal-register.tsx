"use client"
import {
  Card,
  CardContent,
  CardDescription,
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
import { FormRegisterData, useFormRegister, GENDER_OPTIONS } from "./use-form-register";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { formatPhone } from "@/utils/formatPhone";

interface ModalRegisterProps {
  initialValues?: Partial<FormRegisterData>;
  onSubmit?: (data: FormRegisterData) => void | Promise<void>;
  isLoading?: boolean;
}

export function ModalRegister({
  initialValues,
  onSubmit: onSubmitProp,
  isLoading = false
}: ModalRegisterProps) {
  const form = useFormRegister({ initialValues });

  async function onSubmit(formData: FormRegisterData) {
    if (onSubmitProp) {
      await onSubmitProp(formData);
    } else {
      console.log(formData);
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
              <div className="md:col-span-2">
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
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}