"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Account } from "./account"
import { Business } from "./business"
import { Billing } from "./billing"
import { Notification } from "./notification"
import { Security } from "./security"
import { Team } from "./team"
import { EMails } from "./e-mails"



export function SettingsContent() {
  return (
    <section className="w-full">
      <Tabs defaultValue="account">
        <TabsList className="w-full">
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="business">Negócios</TabsTrigger>
          <TabsTrigger value="billing">Cobrança</TabsTrigger>
          <TabsTrigger value="notification">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="team">Equipe</TabsTrigger>
          <TabsTrigger value="e-mails">E-mails</TabsTrigger>
        </TabsList>
        <TabsContent value="account"><Account /></TabsContent>
        <TabsContent value="business"><Business /></TabsContent>
        <TabsContent value="billing"><Billing /></TabsContent>
        <TabsContent value="notification"><Notification /></TabsContent>
        <TabsContent value="security"><Security /></TabsContent>
        <TabsContent value="team"><Team /></TabsContent>
        <TabsContent value="e-mails"><EMails /></TabsContent>
      </Tabs>
    </section>
  )
}