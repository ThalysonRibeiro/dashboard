'use client';
import {
  Bell,
  Building,
  CreditCard,
  Mail,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Account } from './account';
import { Billing } from './billing';
import { Business } from './business';
import { EMails } from './e-mails';
import { Notification } from './notification';
import { Security } from './security';
import { Team } from './team';

export function SettingsContent() {
  return (
    <section aria-labelledby="settings-heading" className="w-full">
      <h2 className="sr-only" id="settings-heading">
        Configurações da Conta
      </h2>

      <Tabs
        aria-label="Navegação das configurações"
        className="w-full"
        defaultValue="account"
      >
        <TabsList
          aria-label="Seções de configuração"
          className="w-full"
          role="tablist"
        >
          <TabsTrigger
            aria-controls="account-panel"
            aria-label="Configurações da conta pessoal"
            role="tab"
            value="account"
          >
            Conta <User />
          </TabsTrigger>

          <TabsTrigger
            aria-controls="business-panel"
            aria-label="Configurações de negócios e empresa"
            role="tab"
            value="business"
          >
            Negócios <Building />
          </TabsTrigger>

          <TabsTrigger
            aria-controls="billing-panel"
            aria-label="Configurações de cobrança e pagamento"
            role="tab"
            value="billing"
          >
            Cobrança <CreditCard />
          </TabsTrigger>

          <TabsTrigger
            aria-controls="notification-panel"
            aria-label="Configurações de notificações e alertas"
            role="tab"
            value="notification"
          >
            Notificações <Bell />
          </TabsTrigger>

          <TabsTrigger
            aria-controls="security-panel"
            aria-label="Configurações de segurança e privacidade"
            role="tab"
            value="security"
          >
            Segurança <ShieldCheck />
          </TabsTrigger>

          <TabsTrigger
            aria-controls="team-panel"
            aria-label="Configurações da equipe e colaboradores"
            role="tab"
            value="team"
          >
            Equipe <Users />
          </TabsTrigger>

          <TabsTrigger
            aria-controls="emails-panel"
            aria-label="Configurações de e-mails e comunicação"
            role="tab"
            value="e-mails"
          >
            E-mails <Mail />
          </TabsTrigger>
        </TabsList>

        <TabsContent
          aria-labelledby="account-tab"
          id="account-panel"
          role="tabpanel"
          tabIndex={0}
          value="account"
        >
          <Account />
        </TabsContent>

        <TabsContent
          aria-labelledby="business-tab"
          id="business-panel"
          role="tabpanel"
          tabIndex={0}
          value="business"
        >
          <Business />
        </TabsContent>

        <TabsContent
          aria-labelledby="billing-tab"
          id="billing-panel"
          role="tabpanel"
          tabIndex={0}
          value="billing"
        >
          <Billing />
        </TabsContent>

        <TabsContent
          aria-labelledby="notification-tab"
          id="notification-panel"
          role="tabpanel"
          tabIndex={0}
          value="notification"
        >
          <Notification />
        </TabsContent>

        <TabsContent
          aria-labelledby="security-tab"
          id="security-panel"
          role="tabpanel"
          tabIndex={0}
          value="security"
        >
          <Security />
        </TabsContent>

        <TabsContent
          aria-labelledby="team-tab"
          id="team-panel"
          role="tabpanel"
          tabIndex={0}
          value="team"
        >
          <Team />
        </TabsContent>

        <TabsContent
          aria-labelledby="emails-tab"
          id="emails-panel"
          role="tabpanel"
          tabIndex={0}
          value="e-mails"
        >
          <EMails />
        </TabsContent>
      </Tabs>
    </section>
  );
}
