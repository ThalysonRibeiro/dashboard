'use client';
import clsx from 'clsx';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleDollarSign,
  LayoutDashboard,
  Package2,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  Truck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from '@/app/(public)/_action/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Header } from './header';

export function Sidebar({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserProps;
}) {
  // const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        aria-label="Menu principal"
        className={clsx(
          'z-10 flex h-full flex-col justify-between border-r transition-all duration-300',
          {
            'w-20': isCollapsed,
            'w-64': !isCollapsed,
            'hidden md:fixed md:flex': true,
          }
        )}
      >
        <div>
          <div className="flex h-16 items-center justify-between rounded-lg px-4">
            {!isCollapsed && (
              <p className="font-montserrat font-semibold uppercase">
                ShopInsight
              </p>
            )}
            <Button
              aria-expanded={!isCollapsed}
              aria-label={
                isCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'
              }
              className="cursor-pointer border border-dashed bg-transparent text-foreground hover:bg-transparent focus:border-gray-500 focus:border-offset-2 focus:outline-none focus:ring-2"
              onClick={() => setIsCollapsed(!isCollapsed)}
              size={'icon'}
              title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
            >
              {isCollapsed ? (
                <ChevronRight aria-hidden="true" className="h-12 w-12" />
              ) : (
                <ChevronLeft aria-hidden="true" className="h-12 w-12" />
              )}
            </Button>
          </div>
          <Separator />
          {/* sidebar recolhida */}
          {isCollapsed && (
            <NavigationItemsMap isCollapsed={isCollapsed} pathname={pathname} />
          )}

          {/* sidebar expandida */}
          <Collapsible aria-label="Menu expandido" open={!isCollapsed}>
            <CollapsibleContent>
              <NavigationItemsMap
                isCollapsed={isCollapsed}
                pathname={pathname}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* sidebar footer */}
        <div>
          <Separator />
          <SidebarFooter isCollapsed={isCollapsed} user={user} />
        </div>
      </aside>

      {/* mobile */}
      <div
        className={clsx('flex flex-1 flex-col transition-all duration-300', {
          'md:ml-20': isCollapsed,
          'md:ml-64': !isCollapsed,
        })}
      >
        <main aria-label="Conteúdo principal">
          <Header
            isCollapsed={isCollapsed}
            pathname={pathname}
            setIsCollapsed={setIsCollapsed}
            user={user}
          />
          <div className="flex-1 px-2 py-4 md:p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}

interface SidebarLinksProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

export function SidebarLinks({
  href,
  icon,
  label,
  isCollapsed,
  pathname,
}: SidebarLinksProps) {
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-200',
        {
          'bg-accent text-white': isActive,
          'hover:bg-accent hover:text-white': !isActive,
        }
      )}
      href={href}
      title={isCollapsed ? label : undefined}
    >
      <span aria-hidden="true" className="flex-shrink-0">
        {icon}
      </span>
      {!isCollapsed && <span className="truncate">{label}</span>}
      {isCollapsed && <span className="sr-only">{label}</span>}
    </Link>
  );
}

type NavigationItemsMapProps = Partial<SidebarLinksProps> & {};

export function NavigationItemsMap({
  isCollapsed,
  pathname,
}: NavigationItemsMapProps) {
  const [openMenus, setOpenMenus] = useState<boolean[]>([]);

  function handleToggleMenu(index: number) {
    const newOpenMenus = [...openMenus];
    newOpenMenus[index] = !newOpenMenus[index];
    setOpenMenus(newOpenMenus);
    return navigationItems;
  }

  useEffect(() => {
    setOpenMenus(new Array(navigationItems.length).fill(false));
  }, []);

  return (
    <nav
      aria-label="Menu de navegação principal"
      className="grid gap-2 p-4 text-base"
    >
      {navigationItems.map((link, index) => (
        <div key={link.heading}>
          {!isCollapsed && (
            <button
              aria-controls={`menu-panel-${index}`}
              aria-expanded={!openMenus[index]}
              className="mt-1 flex w-full items-center justify-between rounded px-1 py-1 font-medium text-gray-400 text-xs uppercase hover:text-gray-600"
              id={`menu-button-${index}`}
              onClick={() => handleToggleMenu(index)}
              type="button"
            >
              <span>{link.heading}</span>
              <ChevronUp
                aria-hidden="true"
                className={clsx('h-4 w-4 transition-transform duration-200', {
                  'rotate-180': openMenus[index],
                })}
              />
            </button>
          )}
          <Collapsible id={`menu-panel-${index}`} open={!openMenus[index]}>
            <CollapsibleContent aria-labelledby={`menu-button-${index}`}>
              {link.links.map((item) => (
                <div className="mb-0.5" key={item.href}>
                  <SidebarLinks
                    href={item.href}
                    icon={item.icon}
                    isCollapsed={isCollapsed as boolean}
                    label={item.label}
                    pathname={pathname as string}
                  />
                  {item.subLinks && item.subLinks.length > 0 && (
                    <fieldset
                      aria-label={`Submenu de ${item.label}`}
                      className={clsx('mx-0.5 ', {
                        'ml-6 border-l pl-1': !isCollapsed,
                      })}
                    >
                      {item.subLinks.map((subLink) => (
                        <div className="mt-0.5" key={subLink.href}>
                          <SidebarLinks
                            href={subLink.href}
                            icon={subLink.icon}
                            isCollapsed={isCollapsed as boolean}
                            label={subLink.label}
                            pathname={pathname as string}
                          />
                        </div>
                      ))}
                    </fieldset>
                  )}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </nav>
  );
}

interface SideBarFooterProps {
  user: UserProps;
  isCollapsed: boolean;
  isLoggingOut?: boolean;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  type: string;
  avatar?: string;
}

export function SidebarFooter({
  user,
  isCollapsed,
  isLoggingOut,
}: SideBarFooterProps) {
  async function handleLogout() {
    await logout();
  }

  return (
    <div
      className={clsx('flex flex-col rounded-lg p-1 px-4 pt-4', {
        'flex-col items-center gap-3': isCollapsed,
        '': !isCollapsed,
      })}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex h-full items-center gap-2">
            <Avatar>
              <AvatarImage alt="Avatar" src={user?.avatar} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex w-full flex-col items-start">
                <span
                  className="line-clamp-1 font-medium text-[12px]"
                  title={user.name}
                >
                  {user.name}
                </span>
                <span className="text-[12px] text-gray-600" title={user.email}>
                  {user.email}
                </span>
              </div>
            )}
            {isCollapsed && (
              <div className="sr-only">
                Usuário: {user.name}, Email: {user.email}
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem
            aria-label={
              isLoggingOut ? 'Fazendo logout...' : 'Fazer logout da conta'
            }
            className="text-red-500"
            disabled={isLoggingOut}
            onClick={handleLogout}
            title={isLoggingOut ? 'Saindo...' : 'Sair da conta'}
          >
            {isLoggingOut ? (
              <>
                <span className="sr-only">Fazendo logout...</span>
                <div
                  aria-hidden="true"
                  className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                />
                Saindo...
              </>
            ) : (
              'Sair'
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface NavigationItemsProps {
  heading: string;
  links: LinkProps[];
}

type LinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
  subLinks?: LinkProps[];
};

export const navigationItems: NavigationItemsProps[] = [
  {
    heading: 'PAINEL',
    links: [
      {
        href: '/admin',
        label: 'Dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        href: '/admin/orders',
        label: 'Pedidos',
        icon: <ShoppingCart className="h-5 w-5" />,
      },
      {
        href: '/admin/products',
        label: 'Produtos',
        icon: <Package2 className="h-5 w-5" />,
      },
      {
        href: '/admin/users',
        label: 'Usuários',
        icon: <Users className="h-5 w-5" />,
      },
      {
        href: '/admin/analytics',
        label: 'Relatórios',
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        href: '/admin/stores',
        label: 'Lojas',
        icon: <Store className="h-5 w-5" />,
      },
    ],
  },
  {
    heading: 'Gerenciamento',
    links: [
      {
        href: '/admin/categories',
        label: 'Categorias',
        icon: <Tag className="h-5 w-5" />,
      },
      {
        href: '/admin/inventory',
        label: 'Inventário',
        icon: <Package2 className="h-5 w-5" />,
      },
      {
        href: '/admin/shipping',
        label: 'Entregas',
        icon: <Truck className="h-5 w-5" />,
      },
      {
        href: '/admin/transactions',
        label: 'Transações',
        icon: <CircleDollarSign className="h-5 w-5" />,
      },
      {
        href: '/admin/settings',
        label: 'Configurações',
        icon: <Settings className="h-5 w-5" />,
      },
    ],
  },
  // {
  //   heading: "Outro",
  //   links: [
  //     {
  //       href: "/admin",
  //       label: "Perfil",
  //       icon: <Settings />,
  //       subLinks: [
  //         {
  //           href: "/admin/",
  //           label: "Faturamento",
  //           icon: <CircleDollarSign />
  //         }
  //       ]
  //     },
  //   ]
  // },
];
