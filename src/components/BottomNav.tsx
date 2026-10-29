import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
}) => {
  // Hide bottom nav on full-screen checkout flow if desired, or keep accessible
  if (currentScreen === 'order_success' || currentScreen === 'thank-you') {
    return null;
  }

  const navItems: { screen: ScreenType; label: string; icon: string; badge?: number }[] = [
    { screen: 'catalog', label: 'Главная', icon: 'local_mall' },
    { screen: 'lookbook', label: 'Лукбук', icon: 'auto_awesome' },
    { screen: 'cart', label: 'Корзина', icon: 'shopping_bag', badge: cartCount },
    { screen: 'profile', label: 'Профиль', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pointer-events-none pb-4 sm:pb-5 px-4">
      <div className="pointer-events-auto mx-auto max-w-sm h-16 rounded-full glass-dock flex items-center justify-around px-3 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_1px_rgba(0,238,252,0.4)]">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[56px] px-2 transition-all relative group cursor-pointer ${
                isActive
                  ? 'text-[#00eefc] drop-shadow-[0_0_8px_rgba(0,238,252,0.8)] scale-105'
                  : 'text-[#a5a1b8] hover:text-[#e4e1ed]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[23px] transition-transform group-hover:scale-110">
                  {item.icon}
                </span>

                {/* Badge for cart */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-4 px-1 rounded-full bg-[#ff4a8d] text-[#0d0d16] font-sans font-bold text-[10px] leading-4 text-center shadow-[0_0_10px_#ff4a8d]">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="font-sans text-[11px] font-medium mt-0.5 tracking-tight">
                {item.label}
              </span>

              {/* Active neon dot */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#00eefc] shadow-[0_0_6px_#00eefc] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
