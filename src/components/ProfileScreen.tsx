import React from 'react';
import { ASSETS, PRODUCTS } from '../data/products';
import { OrderState, Product } from '../types';

interface ProfileScreenProps {
  orders: OrderState[];
  wishlist: string[];
  onSelectProduct: (product: Product) => void;
  onNavigateToCatalog: () => void;
  onViewOrder: (order: OrderState) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  orders,
  wishlist,
  onSelectProduct,
  onNavigateToCatalog,
  onViewOrder,
}) => {
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 gap-5 max-w-2xl mx-auto">
      {/* Profile Header Card */}
      <div className="rounded-3xl bg-[#1f1f27] border border-white/5 p-5 shadow-xl flex items-center gap-4 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#ff4a8d]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative">
          <img
            src={ASSETS.avatar}
            alt="Алиса Воронова"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-[#00eefc] shadow-[0_0_16px_rgba(0,238,252,0.4)]"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#ff4a8d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md font-mono">
            VIP
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-white truncate">
              Алиса Воронова
            </h2>
          </div>
          <p className="font-mono text-xs text-[#a5a1b8]">+7 (777) 666-13-13</p>
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#00eefc]">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span className="font-mono font-semibold">Уровень: Темный Адепт (7% кэшбэк)</span>
          </div>
        </div>
      </div>

      {/* Loyalty & Bonus Balance */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-[#1b1b23] border border-white/5 flex flex-col gap-1">
          <span className="text-[#a5a1b8] font-mono text-[10px] uppercase tracking-wider">
            Бонусный баланс
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-extrabold text-[#ffb1c4]">4 200</span>
            <span className="font-display text-sm text-[#ffb1c4]">₸</span>
          </div>
          <span className="text-[11px] text-[#a5a1b8]">Доступно для списания 100%</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#1b1b23] border border-white/5 flex flex-col gap-1">
          <span className="text-[#a5a1b8] font-mono text-[10px] uppercase tracking-wider">
            Любимый шоурум
          </span>
          <span className="font-sans text-xs font-bold text-white">Астана, ул. Достык, 16</span>
          <span className="text-[11px] text-[#00eefc]">Персональный стилист: онлайн</span>
        </div>
      </div>

      {/* Orders Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
            История ритуалов / Заказы ({orders.length})
          </h3>
        </div>

        {orders.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#1b1b23] border border-white/5 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-3xl text-[#a5a1b8] mb-1">
              receipt_long
            </span>
            <p className="font-sans text-xs text-[#a5a1b8]">История заказов пока пуста</p>
            <button
              onClick={onNavigateToCatalog}
              className="mt-3 px-4 py-1.5 rounded-xl bg-[#292932] text-[#00eefc] text-xs font-semibold"
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((ord, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#1f1f27] border border-white/5 shadow-md flex flex-col gap-3"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-bold text-[#ffb1c4]">
                      {ord.orderNumber}
                    </span>
                    <span className="font-sans text-[11px] text-[#a5a1b8]">
                      {ord.createdAt} • {ord.deliveryAddress}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00eefc]/15 text-[#00eefc] border border-[#00eefc]/30 font-mono text-[10px] font-bold uppercase">
                    В доставке
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#a5a1b8]">
                      {ord.items.length} {ord.items.length === 1 ? 'товар' : 'товара'}
                    </span>
                    <span className="text-white font-bold font-display">
                      {ord.total.toLocaleString('ru-RU')} ₸
                    </span>
                  </div>

                  <button
                    onClick={() => onViewOrder(ord)}
                    className="px-3 py-1.5 rounded-xl bg-[#292932] hover:bg-[#34343d] text-[#00eefc] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Трекинг</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist Grid */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
            Избранное ({wishlistedProducts.length})
          </h3>
        </div>

        {wishlistedProducts.length === 0 ? (
          <p className="font-sans text-xs text-[#a5a1b8] bg-[#1b1b23] p-4 rounded-2xl border border-white/5 text-center">
            Нажимайте сердечко на карточках, чтобы сохранять артефакты в избранное
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {wishlistedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="p-2.5 rounded-2xl bg-[#1b1b23] border border-white/5 flex flex-col gap-2 cursor-pointer hover:border-[#ff4a8d]/40 transition-all"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#0d0d16]">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-xs font-semibold text-white truncate">
                    {p.name}
                  </span>
                  <span className="font-display text-xs font-bold text-[#ffb1c4]">
                    {p.price.toLocaleString('ru-RU')} ₸
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
