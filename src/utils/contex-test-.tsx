// // contexts/NotificationContext.tsx - Context específico para notificações
// 'use client';

// import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
// import { getCookie } from '@/lib/cookieClient';

// interface Notification {
//   id: string;
//   title: string;
//   message: string;
//   type: 'info' | 'success' | 'warning' | 'error';
//   read: boolean;
//   createdAt: string;
//   userId: string;
// }

// interface NotificationContextType {
//   notifications: Notification[];
//   unreadCount: number;
//   markAsRead: (id: string) => void;
//   markAllAsRead: () => void;
//   addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
//   removeNotification: (id: string) => void;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// export function NotificationProvider({ 
//   children, 
//   userId 
// }: { 
//   children: ReactNode; 
//   userId: string;
// }) {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   // Carregar notificações ao montar o componente
//   useEffect(() => {
//     fetchNotifications();
    
//     // Configurar WebSocket ou polling para notificações em tempo real
//     const interval = setInterval(fetchNotifications, 30000); // Poll a cada 30s
    
//     return () => clearInterval(interval);
//   }, [userId]);

//   const fetchNotifications = async () => {
//     try {
//       const token = getCookie('accessToken');
//       const response = await fetch('/api/notifications', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         setNotifications(data.notifications);
//       }
//     } catch (error) {
//       console.error('Erro ao buscar notificações:', error);
//     }
//   };

//   const markAsRead = async (id: string) => {
//     try {
//       const token = getCookie('accessToken');
//       await fetch(`/api/notifications/${id}/read`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
      
//       setNotifications(prev => 
//         prev.map(notification => 
//           notification.id === id 
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error('Erro ao marcar notificação como lida:', error);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       const token = getCookie('accessToken');
//       await fetch('/api/notifications/read-all', {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
      
//       setNotifications(prev => 
//         prev.map(notification => ({ ...notification, read: true }))
//       );
//     } catch (error) {
//       console.error('Erro ao marcar todas as notificações como lidas:', error);
//     }
//   };

//   const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
//     const newNotification: Notification = {
//       ...notification,
//       id: Date.now().toString(),
//       read: false,
//       createdAt: new Date().toISOString(),
//     };
    
//     setNotifications(prev => [newNotification, ...prev]);
//   };

//   const removeNotification = (id: string) => {
//     setNotifications(prev => prev.filter(notification => notification.id !== id));
//   };

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <NotificationContext.Provider value={{
//       notifications,
//       unreadCount,
//       markAsRead,
//       markAllAsRead,
//       addNotification,
//       removeNotification,
//     }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// }

// export function useNotifications() {
//   const context = useContext(NotificationContext);
//   if (context === undefined) {
//     throw new Error('useNotifications must be used within a NotificationProvider');
//   }
//   return context;
// }

// // app/admin/layout.tsx - Layout usando headers + context para notificações
// import { headers } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { NotificationProvider } from '@/contexts/NotificationContext';
// import { AdminHeader } from '@/components/AdminHeader';
// import { AdminSidebar } from '@/components/AdminSidebar';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   type: string;
//   avatar?: string;
// }

// function getUserFromHeaders(): User | null {
//   const headersList = headers();
  
//   const id = headersList.get('x-user-id');
//   const name = headersList.get('x-user-name');
//   const email = headersList.get('x-user-email');
//   const type = headersList.get('x-user-type');
//   const avatar = headersList.get('x-user-avatar');

//   if (!id || !name || !email || !type) {
//     return null;
//   }

//   return {
//     id,
//     name,
//     email,
//     type,
//     avatar: avatar || undefined,
//   };
// }

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const user = getUserFromHeaders();

//   if (!user) {
//     redirect('/');
//   }

//   return (
//     <NotificationProvider userId={user.id}>
//       <div className="min-h-screen bg-gray-100">
//         <AdminHeader user={user} />
        
//         <div className="flex">
//           <AdminSidebar user={user} />
          
//           <main className="flex-1 p-6">
//             <div className="max-w-7xl mx-auto">
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>
//     </NotificationProvider>
//   );
// }

// // components/AdminHeader.tsx - Header com notificações
// 'use client';

// import { useNotifications } from '@/contexts/NotificationContext';
// import { useState } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   type: string;
//   avatar?: string;
// }

// export function AdminHeader({ user }: { user: User }) {
//   const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
//   const [showNotifications, setShowNotifications] = useState(false);

//   const getUserTypeLabel = (type: string) => {
//     switch (type) {
//       case "useradmin":
//         return "Administrador";
//       case "usermoderator":
//         return "Moderador";
//       default:
//         return "Usuário";
//     }
//   };

//   const getUserTypeColor = (type: string) => {
//     switch (type) {
//       case "useradmin":
//         return "bg-red-100 text-red-800";
//       case "usermoderator":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <header className="bg-white shadow-sm border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Painel Administrativo
//           </h1>
          
//           <div className="flex items-center space-x-4">
//             {/* Notificações */}
//             <div className="relative">
//               <button 
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a1.5 1.5 0 010-2.12L21 9H9.5a1.5 1.5 0 00-1.5 1.5v1H6a1.5 1.5 0 00-1.5 1.5v4a1.5 1.5 0 001.5 1.5h2v1a1.5 1.5 0 001.5 1.5H15z" />
//                 </svg>
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {unreadCount}
//                   </span>
//                 )}
//               </button>
              
//               {/* Dropdown de notificações */}
//               {showNotifications && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
//                   <div className="p-4 border-b">
//                     <div className="flex justify-between items-center">
//                       <h3 className="font-semibold">Notificações</h3>
//                       {unreadCount > 0 && (
//                         <button 
//                           onClick={markAllAsRead}
//                           className="text-sm text-blue-600 hover:text-blue-800"
//                         >
//                           Marcar todas como lidas
//                         </button>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="max-h-96 overflow-y-auto">
//                     {notifications.length === 0 ? (
//                       <div className="p-4 text-center text-gray-500">
//                         Nenhuma notificação
//                       </div>
//                     ) : (
//                       notifications.map((notification) => (
//                         <div 
//                           key={notification.id}
//                           className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
//                             !notification.read ? 'bg-blue-50' : ''
//                           }`}
//                           onClick={() => markAsRead(notification.id)}
//                         >
//                           <div className="flex items-start space-x-3">
//                             <div className={`w-2 h-2 rounded-full mt-2 ${
//                               !notification.read ? 'bg-blue-500' : 'bg-gray-300'
//                             }`} />
//                             <div className="flex-1">
//                               <h4 className="font-medium text-sm">{notification.title}</h4>
//                               <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
//                               <p className="text-xs text-gray-400 mt-1">
//                                 {new Date(notification.createdAt).toLocaleString()}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {/* Badge do tipo de usuário */}
//             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.type)}`}>
//               {getUserTypeLabel(user.type)}
//             </span>
            
//             {/* Informações do usuário */}
//             <div className="flex items-center space-x-3">
//               {user.avatar && (
//                 <img 
//                   src={user.avatar} 
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full"
//                 />
//               )}
//               <div className="flex flex-col text-sm">
//                 <span className="font-medium text-gray-900">{user.name}</span>
//                 <span className="text-gray-500">{user.email}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// // lib/cookieClient.ts - Helper para cookies no cliente
// export function getCookie(name: string): string | null {
//   if (typeof document === 'undefined') return null;
  
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
  
//   if (parts.length === 2) {
//     return parts.pop()?.split(';').shift() || null;
//   }
  
//   return null;
// }