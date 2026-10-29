import React from 'react';
import { ScreenType } from '../types';
import { ASSETS } from '../data/products';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  cartCount: number;
  wishlistCount: number;
  selectedCity: string;
  onOpenCityModal: () => void;
  isDesktopFrame: boolean;
  onToggleDesktopFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  wishlistCount,
  selectedCity,
  onOpenCityModal,
  isDesktopFrame,
  onToggleDesktopFrame,
}) => {
  const isSecondaryScreen = currentScreen === 'product' || currentScreen === 'checkout' || currentScreen === 'order_success' || currentScreen === 'thank-you' || currentScreen === 'cart';

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'product':
        return 'Артефакт';
      case 'checkout':
        return 'Оформление';
      case 'thank-you':
      case 'order_success':
        return 'Заказ оформлен';
      case 'cart':
        return 'Корзина';
      default:
        return 'GothNeon';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0d0d16]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Left: Back button or Logo + Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          {isSecondaryScreen && (
            <button
              onClick={() => onBack ? onBack() : onNavigate('catalog')}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#e4e1ed] hover:text-[#00eefc] transition-colors rounded-lg active:scale-95"
              aria-label="Назад"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 min-w-0 text-left cursor-pointer group"
          >
            <img
              alt="GothNeon Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={ASSETS.logo}
            />

            {!isSecondaryScreen ? (
              <div className="flex flex-col min-w-0">
                <span className="font-display text-[17px] font-bold tracking-wider text-[#ffb1c4] leading-tight truncate">
                  GOTHNEON
                </span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCityModal();
                  }}
                  className="flex items-center gap-1 text-[11px] text-[#e5bcc5] hover:text-[#00eefc] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px] text-[#00eefc]">location_on</span>
                  <span className="font-medium uppercase tracking-wider">{selectedCity}</span>
                  <span className="material-symbols-outlined text-[12px]">expand_more</span>
                </div>
              </div>
            ) : (
              <h1 className="font-display text-[18px] font-bold tracking-tight text-[#e4e1ed] truncate">
                {getScreenTitle()}
              </h1>
            )}
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Frame View Toggle (Mobile / Desktop layout toggle) */}
          <button
            onClick={onToggleDesktopFrame}
            className="h-9 px-2.5 rounded-lg bg-[#1f1f27] hover:bg-[#292932] text-xs text-[#a5a1b8] hover:text-[#00eefc] transition-colors hidden md:flex items-center gap-1.5"
            title="Переключить ширину (Мобильный / Десктоп)"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isDesktopFrame ? 'stay_current_portrait' : 'devices'}
            </span>
            <span className="font-mono text-[11px]">{isDesktopFrame ? 'Mobile' : 'Desktop'}</span>
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => onNavigate('catalog')}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#e5bcc5] hover:text-[#ff007f] transition-colors relative"
            aria-label="Избранное"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-2.5 right-2 w-2 h-2 rounded-full bg-[#ff007f] shadow-[0_0_8px_#ff007f]" />
            )}
          </button>

          {/* Profile / Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className="p-1 min-h-[44px] min-w-[44px] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Профиль"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#00eefc]/50 shadow-[0_0_8px_rgba(0,238,252,0.3)]"
              src={ASSETS.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
