'use client';

import { Bell, List } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ModeToggleTheme } from '@/components/ModeToggleTheme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { ProfileType } from '@/types/user-type';
import { NavigationItemsMap, SidebarFooter } from './sidebar';

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  pathname: string;
  user: ProfileType | null;
}

export function Header({
  setIsCollapsed,
  pathname,
  user,
  isCollapsed,
}: HeaderProps) {
  const pathnameUrl = usePathname();

  const TYPE_TITLE_URL = {
    undefined: 'Dashboard',
    orders: 'Pedidos',
    products: 'Produtos',
    customers: 'Usuários',
    analytics: 'Relatórios',
    categories: 'Categorias',
    inventory: 'Inventário',
    shipping: 'Entregas',
    transactions: 'Transações',
    settings: 'Configurações',
  } as const;

  type TypeTitleUrlKey = keyof typeof TYPE_TITLE_URL;

  const key = pathnameUrl.split('/')[2] as TypeTitleUrlKey;

  return (
    <header className="flex h-16 w-full items-center justify-between gap-4 border-b px-4">
      <div className="md:hidden">
        <Sheet>
          <div className="flex items-center gap-2">
            <SheetTrigger asChild>
              <Button
                aria-label="Abrir menu de navegação"
                className="border bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 md:hidden"
                onClick={() => setIsCollapsed(false)}
                size={'icon'}
                variant={'outline'}
              >
                <List aria-hidden="true" className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent
            aria-describedby="mobile-menu-description"
            className="border-l pt-4 sm:max-w-xs"
            side="right"
          >
            <SheetTitle>
              <div className="mb-2 flex items-center rounded-lg px-5">
                <p className="font-montserrat uppercase">Menu de Navegação</p>
              </div>
            </SheetTitle>

            <Separator />

            <SheetDescription className="sr-only" id="mobile-menu-description">
              Menu principal com links para agendamentos, serviços, clientes e
              configurações
            </SheetDescription>

            <nav
              aria-label="Menu de navegação mobile"
              className="flex h-full flex-col"
            >
              <NavigationItemsMap isCollapsed={false} pathname={pathname} />

              <SheetFooter className="px-0 pb-2">
                <Separator />
                <SidebarFooter isCollapsed={isCollapsed} user={user} />
              </SheetFooter>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <h1 className="hidden font-semibold text-2xl md:block">
        {TYPE_TITLE_URL[key]}
      </h1>
      <div className="flex max-w-100 flex-1 items-center gap-4">
        <Input placeholder="Pesquisar" />
        <div>
          <Bell />
        </div>
        <ModeToggleTheme />
      </div>
    </header>
  );
}
