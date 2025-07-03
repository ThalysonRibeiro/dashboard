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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLoginData, useFormLogin } from "./use-form-login";
import { InputPassword } from "@/components/ui/input-password";

interface ModalLoginProps {
  initalValues?: {
    login: string;
    password: string;
  }
}

export function ModalLogin({ initalValues }: ModalLoginProps) {

  const form = useFormLogin({ initalValues });

  async function onSubmit(formData: FormLoginData) {
    console.log(formData);

  }



  return (
    <Card className="max-w-125 w-full">
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>Digite seu e-mail abaixo para acessar sua conta</CardDescription>
      </CardHeader>
      <CardContent>
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
                      placeholder="Digite seu e-mail"
                      aria-describedby="group-name-error"
                      aria-required="true"
                    />
                  </FormControl>
                  <FormDescription>Seu e-mail é necessário para acessar sua conta</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      aria-describedby="group-name-error"
                      aria-required="true"
                    />
                  </FormControl>
                  <FormDescription>Seu senha é necessário para acessar sua conta</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        Não tem uma conta?
        <Button variant={"link"} className="underline cursor-pointer">Cadastre-se</Button>
      </CardFooter>
    </Card>
  )
}