import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onNavigateToCatalog: () => void;
  promoCode: string;
  promoDiscount: number;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onNavigateToCatalog,
  promoCode,
  promoDiscount,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [inputCode, setInputCode] = useState(promoCode || 'GOTH2025');

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);
  const discount = promoDiscount;
  const total = Math.max(0, subtotal - discount);

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 gap-4 max-w-2xl mx-auto">
      {/* Header & Delivery Badge */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <span className="font-display text-[22px] font-bold text-white flex items-center gap-2">
            Корзина
            <span className="text-[#ff4a8d] font-mono text-xs px-2 py-0.5 rounded-full bg-[#1f1f27] border border-[#ff4a8d]/30 shadow-[0_0_12px_rgba(255,74,141,0.25)]">
              {totalCount}
            </span>
          </span>
          <span className="font-sans text-xs text-[#a5a1b8] mt-0.5">
            {items.length === 0
              ? 'Ваша корзина пуста'
              : `В вашей корзине ${totalCount} ${totalCount === 1 ? 'товар' : 'товара'}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1f27] border border-[#00eefc]/20 shadow-sm">
          <span className="material-symbols-outlined text-[15px] text-[#00eefc] animate-pulse">
            local_shipping
          </span>
          <span className="font-mono text-[11px] text-[#00eefc] uppercase tracking-wider font-semibold">
            г. Астана
          </span>
        </div>
      </div>

      {/* Free Delivery Progress Meter */}
      <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-[#1b1b23] border border-white/5 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between text-[#e4e1ed]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#00eefc]">
              verified
            </span>
            <span className="font-sans text-xs font-medium">
              Бесплатная доставка курьером активирована
            </span>
          </div>
          <span className="font-mono text-xs text-[#00eefc] font-bold">100%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#292932] overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-[#ff4a8d] to-[#00eefc] shadow-[0_0_8px_rgba(0,238,252,0.6)] w-full rounded-full" />
        </div>
      </div>

      {/* Order Items List */}
      {items.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center p-6 bg-[#1b1b23] rounded-2xl border border-white/5">
          <span className="material-symbols-outlined text-5xl text-[#ff4a8d] mb-3">
            shopping_bag
          </span>
          <p className="font-display text-lg font-bold text-white">В корзине пусто</p>
          <p className="font-sans text-xs text-[#a5a1b8] mt-1 max-w-xs">
            Выберите темные артефакты в каталоге, чтобы заказать их с ночной примеркой в Астане
          </p>
          <button
            onClick={onNavigateToCatalog}
            className="mt-5 px-6 py-2.5 rounded-xl bg-[#ff4a8d] text-white font-sans text-xs font-bold shadow-[0_0_16px_rgba(255,74,141,0.5)] cursor-pointer"
          >
            В каталог
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3.5 p-3.5 rounded-2xl bg-[#1f1f27] border border-white/5 shadow-md relative group transition-all duration-200 hover:border-white/10"
            >
              {/* Product Thumbnail */}
              <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-[#0d0d16] shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.badgeText && (
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#0d0d16]/80 backdrop-blur-md border border-white/10">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#ffb1c4]">
                      {item.badgeText}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info & Controls */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-bold text-white truncate">
                      {item.name}
                    </h3>
                    <p className="font-sans text-xs text-[#a5a1b8] mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="min-h-[32px] min-w-[32px] flex items-center justify-center text-[#a5a1b8] hover:text-[#ff007f] transition-colors -mr-1 cursor-pointer"
                    aria-label="Удалить товар"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete_outline</span>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-display text-[16px] font-bold text-[#ffb1c4] tracking-tight">
                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₸
                  </span>

                  {/* Stepper (+ / -) */}
                  <div className="flex items-center rounded-xl bg-[#292932] border border-white/5 px-1 py-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center text-[#a5a1b8] hover:text-white transition-colors cursor-pointer"
                      aria-label="Уменьшить"
                    >
                      <span className="material-symbols-outlined text-[14px]">remove</span>
                    </button>
                    <span className="w-6 text-center font-mono text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#a5a1b8] hover:text-white transition-colors cursor-pointer"
                      aria-label="Увеличить"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <>
          {/* Promo Code Module */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="Промокод (напр. GOTH2025)"
                  className="w-full h-12 pl-4 pr-10 rounded-xl bg-[#1b1b23] border border-white/5 text-white placeholder:text-[#a5a1b8]/50 font-mono text-xs tracking-wider outline-none focus:border-[#00eefc]/50 transition-colors"
                />
                {promoCode && (
                  <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#00eefc] text-[18px]">
                    check_circle
                  </span>
                )}
              </div>
              <button
                onClick={() => onApplyPromo(inputCode)}
                className="h-12 px-4 sm:px-5 rounded-xl bg-[#292932] hover:bg-[#34343d] text-[#00eefc] border border-[#00eefc]/30 font-sans text-xs font-bold transition-all active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,238,252,0.2)]"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Применить</span>
              </button>
            </div>

            {/* Active Promo Toast */}
            {promoCode && (
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#1f1f27] border border-[#ff4a8d]/30 shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-[#ff4a8d]/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[13px] text-[#ff4a8d]">
                      sell
                    </span>
                  </div>
                  <span className="font-sans text-xs text-[#e4e1ed] truncate">
                    Промокод <strong className="text-[#ff4a8d] font-bold">{promoCode}</strong> активирован
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#ff4a8d] font-bold">
                    -{discount.toLocaleString('ru-RU')} ₸
                  </span>
                  <button
                    onClick={onRemovePromo}
                    className="text-[#a5a1b8] hover:text-white p-0.5"
                    title="Удалить промокод"
                  >
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Calculation Summary Card */}
          <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[#1f1f27] border border-white/5 shadow-xl relative overflow-hidden">
            <div className="flex flex-col gap-2.5 pb-2 border-b border-white/5">
              <div className="flex items-center justify-between text-xs text-[#a5a1b8]">
                <span>Товары ({totalCount} шт.)</span>
                <span className="font-mono text-white font-medium">
                  {subtotal.toLocaleString('ru-RU')} ₸
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-xs text-[#a5a1b8]">
                  <span>Скидка по коду</span>
                  <span className="font-mono text-[#ff4a8d] font-semibold">
                    -{discount.toLocaleString('ru-RU')} ₸
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-[#a5a1b8]">
                <div className="flex items-center gap-1">
                  <span>Доставка курьером</span>
                  <span className="font-mono text-[10px] text-[#00eefc] px-1 py-0.2 rounded bg-[#00eefc]/10">
                    Астана
                  </span>
                </div>
                <span className="font-sans text-[#00eefc] font-semibold">Бесплатно</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5a1b8]">
                  Итого к оплате
                </span>
                <span className="font-sans text-[11px] text-[#e5bcc5]">Включая все налоги</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[26px] font-bold text-[#00eefc] tracking-tight drop-shadow-[0_0_12px_rgba(0,238,252,0.4)]">
                  {total.toLocaleString('ru-RU')}
                </span>
                <span className="font-display text-[18px] text-[#00eefc]">₸</span>
              </div>
            </div>
          </div>

          {/* Primary CTA & Safeguards */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={onProceedToCheckout}
              className="w-full h-14 rounded-2xl bg-[#ff4a8d] hover:bg-[#ff007f] text-white font-display text-[16px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,74,141,0.5)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Перейти к оформлению</span>
              <span className="font-mono text-[13px] opacity-90">({total.toLocaleString('ru-RU')} ₸)</span>
              <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-center text-[#a5a1b8] px-2 text-[11px]">
              <span className="material-symbols-outlined text-[15px] text-[#00eefc] shrink-0">
                electric_bolt
              </span>
              <span>Быстрое оформление за 1 минуту • Примерка перед оплатой</span>
            </div>
          </div>
        </>
      )}

      {/* Trust Features Bento Pill */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <div className="p-3.5 rounded-2xl bg-[#1b1b23] border border-white/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#292932] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px] text-[#00eefc]">
              checkroom
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-xs font-semibold text-white truncate">
              Примерка
            </span>
            <span className="font-sans text-[11px] text-[#a5a1b8] leading-none">
              15 мин бесплатно
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#1b1b23] border border-white/5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#292932] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px] text-[#ff4a8d]">
              replay
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-xs font-semibold text-white truncate">
              Возврат 14 дней
            </span>
            <span className="font-sans text-[11px] text-[#a5a1b8] leading-none">
              Легкий отказ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
