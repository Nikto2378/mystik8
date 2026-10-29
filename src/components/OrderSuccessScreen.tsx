import React, { useState } from 'react';
import { OrderState } from '../types';
import { ASSETS } from '../data/products';

interface OrderSuccessScreenProps {
  order: OrderState;
  onNavigateToCatalog: () => void;
  onNavigateToProfile: () => void;
}

export const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({
  order,
  onNavigateToCatalog,
  onNavigateToProfile,
}) => {
  const [copied, setCopied] = useState(false);

  const copyOrderCode = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 max-w-2xl mx-auto">
      {/* Dynamic Atmospheric Glow Orbs & Occult Emblem */}
      <div className="relative w-full flex flex-col items-center text-center pt-2 pb-6 overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#ff4a8d]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-1/3 -translate-x-1/2 w-44 h-44 bg-[#00eefc]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Glowing Gothic Emblem Artifact */}
        <div className="relative flex items-center justify-center w-28 h-28 mb-3">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff4a8d] via-[#1f1f27] to-[#00eefc] opacity-50 animate-pulse blur-md" />

          {/* Obsidian Badge Core */}
          <div className="relative w-24 h-24 rounded-full bg-[#0d0d16] border border-[#ff4a8d]/40 flex items-center justify-center shadow-xl">
            {/* Occult Ring SVG Vector with spin */}
            <svg
              className="absolute inset-1 w-[88px] h-[88px] text-[#ffb1c4]/40 animate-spin"
              fill="none"
              style={{ animationDuration: '26s' }}
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeDasharray="4 6" strokeWidth="1" />
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.5" />
              <polygon fill="currentColor" points="50,6 54,16 46,16" />
              <polygon fill="currentColor" points="50,94 54,84 46,84" />
              <polygon fill="currentColor" points="6,50 16,54 16,46" />
              <polygon fill="currentColor" points="94,50 84,54 84,46" />
            </svg>

            {/* Gothic Skull & Cyan Confirmation Stamp */}
            <div className="relative z-10 flex items-center justify-center text-[#ffd9e1]">
              <span className="material-symbols-outlined text-4xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                skull
              </span>
              <div className="absolute -bottom-1 -right-2 bg-[#00eefc] text-[#00363a] w-7 h-7 rounded-full flex items-center justify-center shadow-lg font-bold">
                <span className="material-symbols-outlined text-lg font-bold">check</span>
              </div>
            </div>
          </div>
        </div>

        {/* Headline & Subtitle */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#292932] border border-[#00eefc]/40 text-[#00eefc] font-mono text-[10px] tracking-widest uppercase mb-2 shadow-[0_0_8px_rgba(0,238,252,0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00eefc] animate-ping" />
          Ритуал завершен
        </span>
        <h1 className="font-display text-[24px] sm:text-[28px] font-bold text-white tracking-tight">
          Заказ успешно оформлен!
        </h1>
        <p className="font-sans text-xs text-[#a5a1b8] max-w-xs mt-1">
          Благодарим за погружение в мистический мир GothNeon
        </p>
      </div>

      {/* Editorial Packaging Preview Image */}
      <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-[#1f1f27] border border-white/5 mb-4 shadow-xl">
        <img
          src={ASSETS.packagingBox}
          alt="Фирменная упаковка GothNeon"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f27] via-[#1f1f27]/60 to-transparent flex items-end p-4">
          <div className="flex items-center gap-2 text-[#00eefc]">
            <span className="material-symbols-outlined text-lg">package_2</span>
            <span className="font-sans text-xs font-semibold">
              Коллекционный бокс подготовлен к упаковке
            </span>
          </div>
        </div>
      </div>

      {/* Order Receipt Bento Card */}
      <div className="w-full rounded-2xl bg-[#1f1f27] border border-white/5 p-4 mb-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5a1b8]">
              Идентификатор заказа
            </span>
            <span className="font-display text-[18px] font-bold text-[#ffb1c4] tracking-wide">
              {order.orderNumber}
            </span>
          </div>
          <button
            onClick={copyOrderCode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer ${
              copied
                ? 'bg-[#ff4a8d] text-white shadow-[0_0_12px_#ff4a8d]'
                : 'bg-[#292932] text-white hover:bg-[#34343d]'
            }`}
          >
            <span className="material-symbols-outlined text-base text-[#00eefc]">
              {copied ? 'done' : 'content_copy'}
            </span>
            <span className="font-sans text-xs font-medium">
              {copied ? 'Скопировано' : 'Копировать'}
            </span>
          </button>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d0d16] border border-white/5 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00eefc] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00eefc]" />
            </span>
            <span className="font-sans text-xs text-[#e4e1ed]">Статус обработки:</span>
          </div>
          <span className="font-sans text-xs font-bold text-[#00eefc]">
            В обработке стилистом
          </span>
        </div>

        {/* Details List */}
        <div className="flex flex-col gap-2">
          {/* Time */}
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#292932]/70 border border-white/5">
            <span className="material-symbols-outlined text-[#ffb1c4] mt-0.5 text-xl">
              schedule
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[10px] text-[#a5a1b8] uppercase tracking-wider">
                Окно доставки
              </span>
              <span className="font-sans text-xs font-semibold text-white">
                Сегодня, с 18:00 до 20:00
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#292932]/70 border border-white/5">
            <span className="material-symbols-outlined text-[#00eefc] mt-0.5 text-xl">
              location_on
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[10px] text-[#a5a1b8] uppercase tracking-wider">
                Адрес в Астане
              </span>
              <span className="font-sans text-xs text-white">
                г. Астана, {order.deliveryAddress}
              </span>
            </div>
          </div>

          {/* Payment */}
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#292932]/70 border border-white/5">
            <span className="material-symbols-outlined text-[#ff4a8d] mt-0.5 text-xl">
              qr_code_scanner
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[10px] text-[#a5a1b8] uppercase tracking-wider">
                Оплата и сумма
              </span>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display text-[15px] font-bold text-[#ffb1c4]">
                  {order.total.toLocaleString('ru-RU')} ₸
                </span>
                <span className="font-sans text-xs text-[#a5a1b8]">
                  {order.paymentMethod === 'kaspi'
                    ? 'Kaspi QR при получении'
                    : order.paymentMethod === 'card'
                    ? 'Оплата картой онлайн'
                    : 'Оплата наличными / POS-терминал'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Stepper Timeline */}
      <div className="w-full rounded-2xl bg-[#1f1f27] border border-white/5 p-4 mb-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-[16px] font-bold text-white">Трекинг заказа</h2>
          <span className="font-mono text-[10px] text-[#00eefc] uppercase tracking-wider">
            Шаг 2 из 4
          </span>
        </div>

        <div className="relative flex flex-col gap-3.5">
          {/* Step 1: Done */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#00eefc] text-[#00363a] flex items-center justify-center shadow-md z-10 font-bold">
                <span className="material-symbols-outlined text-base">check</span>
              </div>
              <div className="w-0.5 h-10 bg-[#00eefc]/60 my-1" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-sans text-xs font-bold text-white">Заказ принят</span>
              <span className="font-sans text-[11px] text-[#a5a1b8]">
                {order.createdAt} • Оцифрован в системе GothNeon
              </span>
            </div>
          </div>

          {/* Step 2: In Progress */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#ff4a8d] text-white flex items-center justify-center shadow-lg z-10 animate-pulse">
                <span className="material-symbols-outlined text-base">inventory_2</span>
              </div>
              <div className="w-0.5 h-12 bg-[#34343d] my-1" />
            </div>
            <div className="flex flex-col pt-1">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-bold text-[#ffb1c4]">
                  Сборка и упаковка
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ff4a8d]/20 text-[#ffb1c4] font-mono text-[10px]">
                  Сейчас
                </span>
              </div>
              <span className="font-sans text-[11px] text-[#e5bcc5]">
                Бережная упаковка в фирменный черный сатин
              </span>
            </div>
          </div>

          {/* Step 3: Pending */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#292932] text-[#a5a1b8] flex items-center justify-center z-10">
                <span className="material-symbols-outlined text-base">electric_moped</span>
              </div>
              <div className="w-0.5 h-10 bg-[#34343d] my-1" />
            </div>
            <div className="flex flex-col pt-1 opacity-70">
              <span className="font-sans text-xs font-semibold text-white">
                Курьер в пути по Астане
              </span>
              <span className="font-sans text-[11px] text-[#a5a1b8]">
                Ожидается выезд в 17:30
              </span>
            </div>
          </div>

          {/* Step 4: Pending Final */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#292932] text-[#a5a1b8] flex items-center justify-center z-10">
                <span className="material-symbols-outlined text-base">checkroom</span>
              </div>
            </div>
            <div className="flex flex-col pt-1 opacity-50">
              <span className="font-sans text-xs font-semibold text-white">
                Доставка и примерка
              </span>
              <span className="font-sans text-[11px] text-[#a5a1b8]">
                15 минут на примерку перед оплатой
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stylist Support Box */}
      <div className="w-full rounded-2xl bg-[#1f1f27] border border-white/5 p-4 mb-4 shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#00eefc]/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-start gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-[#292932] border border-[#00eefc]/30 flex items-center justify-center text-[#00eefc] flex-shrink-0 shadow-[0_0_12px_rgba(0,238,252,0.2)]">
            <span className="material-symbols-outlined text-2xl">support_agent</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-display text-sm font-bold text-white">Персональный стилист</h3>
            <p className="font-sans text-xs text-[#a5a1b8] mt-0.5 leading-relaxed">
              Возникли вопросы по размеру или времени визита? Личный ассистент онлайн в Telegram и WhatsApp.
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/77000000000?text=${encodeURIComponent(
            `Здравствуйте, я по заказу ${order.orderNumber}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 rounded-xl bg-[#292932] hover:bg-[#34343d] border border-[#00eefc]/30 flex items-center justify-center gap-2 text-[#00eefc] font-sans text-xs font-bold transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-lg">chat</span>
          <span>Написать в WhatsApp стилисту</span>
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 w-full">
        <button
          onClick={onNavigateToCatalog}
          className="w-full h-13 rounded-2xl bg-[#ff4a8d] hover:bg-[#ff007f] text-white font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,74,141,0.5)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">storefront</span>
          <span>Вернуться в каталог</span>
        </button>

        <button
          onClick={onNavigateToProfile}
          className="w-full h-12 rounded-2xl bg-[#1f1f27] hover:bg-[#292932] text-white border border-white/5 font-sans text-xs font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg text-[#a5a1b8]">receipt_long</span>
          <span>Детали заказа в профиле</span>
        </button>
      </div>
    </div>
  );
};
