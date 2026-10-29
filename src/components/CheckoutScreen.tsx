const TOKEN = "9249177921:AAF-HspZSUd34MBMEdqqdB26ltZqkd51ofM";
const CHAT_ID = "6149714271";

import React, { useState } from 'react';
import { CartItem, OrderState } from '../types';
import { ASSETS } from '../data/products';

interface CheckoutScreenProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  onOrderCompleted: (order: OrderState) => void;
  onBackToCart: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  subtotal,
  discount,
  onOrderCompleted,
  onBackToCart: _onBackToCart,
}) => {
  const [customerName, setCustomerName] = useState('Алиса Воронова');
  const [phone, setPhone] = useState('+7 (777) 666-13-13');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'express' | 'showroom'>('courier');
  const [address, setAddress] = useState('ул. Достык, 18, кв. 66');
  const [district, setDistrict] = useState('Есильский район, возле Байтерека');
  const [comment, setComment] = useState('Позвонить за 20 минут, примерка 15 минут, домофон работает');
  const [paymentMethod, setPaymentMethod] = useState<'kaspi' | 'card' | 'cash'>('kaspi');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deliveryFee = deliveryMethod === 'express' ? 2500 : 0;
  const total = Math.max(0, subtotal - discount) + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!customerName.trim()) {
      setErrorMessage('Пожалуйста, укажите ваше имя (обязательное поле).');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Пожалуйста, укажите ваш контактный телефон (обязательное поле).');
      return;
    }

    if (items.length === 0) {
      setErrorMessage('Корзина пуста. Добавьте товары перед оформлением заказа.');
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const formattedDateTime = now.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const itemsList = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.subtitle || item.size || 'Стандарт'}) — ${item.quantity} шт. × ${item.price.toLocaleString('ru-RU')} ₸ = ${(item.price * item.quantity).toLocaleString('ru-RU')} ₸`
      )
      .join('\n');

    const deliveryTitle =
      deliveryMethod === 'courier'
        ? 'Курьер по Астане (Сегодня)'
        : deliveryMethod === 'express'
        ? 'Экспресс 2 часа (+2 500 ₸)'
        : 'Самовывоз из шоурума (ул. Достык, 16)';

    const paymentTitle =
      paymentMethod === 'kaspi'
        ? 'Kaspi QR / Kaspi Gold'
        : paymentMethod === 'card'
        ? 'Оплата картой'
        : 'Оплата при получении курьеру';

    const fullAddress = deliveryMethod === 'showroom'
      ? 'Самовывоз из шоурума (Астана, ул. Достык, 16)'
      : `${address || 'Не указан'}${district ? ` (${district})` : ''}`;

    const message = `🛒 Новый заказ

📦 Товары:
${itemsList}

💰 Итого к оплате: ${total.toLocaleString('ru-RU')} ₸
🚚 Доставка: ${deliveryTitle}
💳 Оплата: ${paymentTitle}

👤 Имя: ${customerName.trim()}
📞 Телефон: ${phone.trim()}
📍 Адрес доставки: ${fullAddress}
💬 Комментарий: ${comment.trim() || 'Без комментария'}
📅 Дата и время: ${formattedDateTime}`;

    try {
      // Send Telegram message via Bot API with no custom headers
      const tokenClean = TOKEN.trim();
      const chatIdClean = CHAT_ID.trim();

      const response = await fetch("https://api.telegram.org/bot" + tokenClean + "/sendMessage", {
        method: "POST",
        body: new URLSearchParams({
          chat_id: chatIdClean,
          text: message,
        }),
      });

      const data = await response.json();

      if (data && data.ok === true) {
        const order: OrderState = {
          orderNumber: `#GN-${Math.floor(10000 + Math.random() * 90000)}`,
          customerName: customerName.trim(),
          phone: phone.trim(),
          deliveryMethod,
          deliveryAddress: fullAddress,
          district,
          comment: comment.trim(),
          paymentMethod,
          items,
          subtotal,
          discount,
          deliveryFee,
          total,
          createdAt: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        };

        // Telegram returned ok: true -> complete order and show thank-you page
        onOrderCompleted(order);
      } else {
        const errorDesc = data?.description || 'Telegram Bot API отклонил запрос.';
        setErrorMessage(`Ошибка при отправке заказа: ${errorDesc}. Пожалуйста, попробуйте снова.`);
      }
    } catch (err: any) {
      console.error('Telegram order dispatch error:', err);
      setErrorMessage(
        'Сетевая ошибка при отправке заказа в Telegram. Проверьте интернет-соединение и повторите попытку.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 gap-4 max-w-2xl mx-auto">
      {/* Progress Tracker */}
      <section className="flex flex-col gap-1.5 mt-1">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
          <span className="text-[#00eefc] flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[15px]">check_circle</span>
            1. Корзина
          </span>
          <span className="text-[#ff4a8d] flex items-center gap-1.5 font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff4a8d] animate-pulse shadow-[0_0_8px_#ff4a8d]" />
            2. Доставка
          </span>
          <span className="text-[#a5a1b8] flex items-center gap-1">
            3. Оплата
          </span>
        </div>
        <div className="w-full bg-[#292932] h-1.5 rounded-full overflow-hidden flex">
          <div className="w-1/3 bg-[#00eefc] h-full" />
          <div className="w-1/3 bg-gradient-to-r from-[#00eefc] to-[#ff4a8d] h-full" />
          <div className="w-1/3 bg-[#34343d] h-full" />
        </div>
      </section>

      {/* Astana Ambient Teaser Card with Baiterek Visual */}
      <section className="relative overflow-hidden rounded-2xl bg-[#1f1f27] border border-[#00eefc]/30 p-4 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 z-10">
          <div className="w-10 h-10 rounded-xl bg-[#292932] border border-[#00eefc]/40 flex items-center justify-center text-[#00eefc] shrink-0 shadow-[0_0_12px_rgba(0,238,252,0.3)]">
            <span className="material-symbols-outlined text-[20px]">location_city</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00eefc] font-bold">
              Астана • Экспресс-хаб
            </span>
            <p className="font-sans text-xs text-[#e4e1ed] truncate">
              Ночная доставка и примерка по левому и правому берегу
            </p>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-[#0d0d16] border border-[#00eefc]/40 shadow-[0_0_10px_rgba(0,238,252,0.3)]">
          <img
            src={ASSETS.astanaBaiterek}
            alt="Байтерек Астана неон"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Error Banner if Telegram dispatch failed */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-[#93000a]/30 border border-[#ffb4ab] text-[#ffdad6] text-xs flex items-start gap-3 shadow-[0_0_20px_rgba(255,180,171,0.25)] animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[20px] text-[#ffb4ab] shrink-0 mt-0.5">
            error
          </span>
          <div className="flex-1">
            <strong className="block font-sans text-sm text-[#ffb4ab] mb-0.5">
              Не удалось оформить заказ
            </strong>
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-[#ffb4ab] hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Section 1: Контактные данные */}
        <section className="bg-[#1f1f27] border border-white/5 rounded-2xl p-4 flex flex-col gap-3.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb1c4] text-[20px]">badge</span>
              <h2 className="font-display text-[16px] font-bold text-white">
                1. Контактные данные
              </h2>
            </div>
            <span className="font-mono text-[10px] text-[#00eefc] bg-[#0d0d16] px-2.5 py-0.5 rounded-full border border-[#00eefc]/30 font-bold uppercase tracking-wider">
              Обязательные поля *
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs text-[#a5a1b8] flex items-center justify-between">
              <span>Ваше имя и фамилия *</span>
              <span className="text-[10px] text-[#ff4a8d]">Обязательно</span>
            </label>
            <div className="relative flex items-center bg-[#0d0d16] rounded-xl px-3.5 h-12 border border-white/5 focus-within:border-[#00eefc]/50 focus-within:shadow-[0_0_16px_rgba(0,238,252,0.25)] transition-all">
              <span className="material-symbols-outlined text-[#e5bcc5] text-[20px] mr-2.5">
                person
              </span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                placeholder="Имя и фамилия"
                className="w-full bg-transparent text-white font-sans text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs text-[#a5a1b8] flex items-center justify-between">
              <span>Номер телефона (Казахстан) *</span>
              <span className="text-[10px] text-[#ff4a8d]">Обязательно</span>
            </label>
            <div className="relative flex items-center bg-[#0d0d16] rounded-xl px-3.5 h-12 border border-white/5 focus-within:border-[#ff4a8d]/50 focus-within:shadow-[0_0_16px_rgba(255,74,141,0.25)] transition-all">
              <span className="material-symbols-outlined text-[#e5bcc5] text-[20px] mr-2.5">
                call
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+7 (___) ___-__-__"
                className="w-full bg-transparent text-white font-mono text-sm tracking-wide focus:outline-none"
              />
              <span className="material-symbols-outlined text-[#00eefc] text-[18px]">
                verified
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Доставка в Астане */}
        <section className="bg-[#1f1f27] border border-white/5 rounded-2xl p-4 flex flex-col gap-3.5 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00eefc] text-[20px]">
              local_shipping
            </span>
            <h2 className="font-display text-[16px] font-bold text-white">
              2. Доставка в Астане
            </h2>
          </div>

          {/* Delivery Options */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs text-[#a5a1b8]">Способ получения</label>
            <div className="grid grid-cols-1 gap-2">
              {/* Option 1: Courier */}
              <button
                type="button"
                onClick={() => setDeliveryMethod('courier')}
                className={`text-left p-3 rounded-xl transition-all flex items-center justify-between active:scale-[0.99] cursor-pointer ${
                  deliveryMethod === 'courier'
                    ? 'bg-gradient-to-r from-[#292932] to-[#34343d] border border-[#ff4a8d] shadow-[0_0_14px_rgba(255,74,141,0.3)]'
                    : 'bg-[#1b1b23] border border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      deliveryMethod === 'courier'
                        ? 'bg-[#ff4a8d] text-white shadow-[0_0_8px_#ff4a8d]'
                        : 'bg-[#292932] text-[#a5a1b8]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">electric_bolt</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold text-white">
                      Курьер по Астане (Сегодня)
                    </p>
                    <p className="font-sans text-[11px] text-[#a5a1b8]">
                      Интервал: 19:00 - 22:00 • Бесплатно от 30 000 ₸
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    deliveryMethod === 'courier' ? 'text-[#ff4a8d]' : 'text-[#a5a1b8]'
                  }`}
                >
                  {deliveryMethod === 'courier' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </button>

              {/* Option 2: Express 2h */}
              <button
                type="button"
                onClick={() => setDeliveryMethod('express')}
                className={`text-left p-3 rounded-xl transition-all flex items-center justify-between active:scale-[0.99] cursor-pointer ${
                  deliveryMethod === 'express'
                    ? 'bg-gradient-to-r from-[#292932] to-[#34343d] border border-[#00eefc] shadow-[0_0_14px_rgba(0,238,252,0.3)]'
                    : 'bg-[#1b1b23] border border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      deliveryMethod === 'express'
                        ? 'bg-[#00eefc] text-[#0d0d16] shadow-[0_0_8px_#00eefc]'
                        : 'bg-[#292932] text-[#a5a1b8]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">pace</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold text-white">
                      Экспресс 2 часа
                    </p>
                    <p className="font-sans text-[11px] text-[#a5a1b8]">
                      Мгновенный выезд яндекс-курьером • +2 500 ₸
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    deliveryMethod === 'express' ? 'text-[#00eefc]' : 'text-[#a5a1b8]'
                  }`}
                >
                  {deliveryMethod === 'express' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </button>

              {/* Option 3: Showroom */}
              <button
                type="button"
                onClick={() => setDeliveryMethod('showroom')}
                className={`text-left p-3 rounded-xl transition-all flex items-center justify-between active:scale-[0.99] cursor-pointer ${
                  deliveryMethod === 'showroom'
                    ? 'bg-gradient-to-r from-[#292932] to-[#34343d] border border-[#ffb1c4] shadow-[0_0_14px_rgba(255,177,196,0.3)]'
                    : 'bg-[#1b1b23] border border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      deliveryMethod === 'showroom'
                        ? 'bg-[#ffb1c4] text-[#0d0d16] shadow-[0_0_8px_#ffb1c4]'
                        : 'bg-[#292932] text-[#a5a1b8]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold text-white">
                      Шоурум GothNeon (ул. Достык, 16)
                    </p>
                    <p className="font-sans text-[11px] text-[#a5a1b8]">
                      Примерка, бар и самовывоз • Бесплатно
                    </p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    deliveryMethod === 'showroom' ? 'text-[#ffb1c4]' : 'text-[#a5a1b8]'
                  }`}
                >
                  {deliveryMethod === 'showroom' ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </button>
            </div>
          </div>

          {/* Address Inputs */}
          {deliveryMethod !== 'showroom' && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs text-[#a5a1b8]">Адрес доставки в Астане</label>
                <div className="relative flex items-center bg-[#0d0d16] rounded-xl px-3.5 h-12 border border-white/5 focus-within:border-[#00eefc]/50 transition-all">
                  <span className="material-symbols-outlined text-[#e5bcc5] text-[20px] mr-2.5">
                    home_pin
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Улица, дом, квартира в Астане"
                    className="w-full bg-transparent text-white font-sans text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs text-[#a5a1b8]">Район / Ориентир</label>
                <div className="relative flex items-center bg-[#0d0d16] rounded-xl px-3.5 h-12 border border-white/5 focus-within:border-[#00eefc]/50 transition-all">
                  <span className="material-symbols-outlined text-[#e5bcc5] text-[20px] mr-2.5">
                    explore
                  </span>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Район (напр. Есильский район, Байтерек)"
                    className="w-full bg-transparent text-white font-sans text-sm focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs text-[#a5a1b8]">Комментарий к заказу</label>
            <div className="relative flex items-start bg-[#0d0d16] rounded-xl p-3 border border-white/5 focus-within:border-[#00eefc]/50 transition-all">
              <span className="material-symbols-outlined text-[#e5bcc5] text-[20px] mr-2.5 mt-0.5">
                notes
              </span>
              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Пожелания к доставке, домофон, этаж..."
                className="w-full bg-transparent text-white font-sans text-xs focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Способ оплаты */}
        <section className="bg-[#1f1f27] border border-white/5 rounded-2xl p-4 flex flex-col gap-3.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff4a8d] text-[20px]">
                account_balance_wallet
              </span>
              <h2 className="font-display text-[16px] font-bold text-white">
                3. Способ оплаты
              </h2>
            </div>
            <span className="font-mono text-xs text-[#00eefc]">0% комиссии</span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Kaspi Option */}
            <label
              onClick={() => setPaymentMethod('kaspi')}
              className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'kaspi'
                  ? 'bg-[#292932] border border-[#ff4a8d] shadow-[0_0_16px_rgba(255,74,141,0.25)]'
                  : 'bg-[#1b1b23] border border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#93000a] text-white flex items-center justify-center font-display font-bold text-sm tracking-tighter shadow-md">
                  QR
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-xs font-bold text-white">
                      Kaspi QR / Kaspi Gold
                    </span>
                    <span className="font-mono text-[9px] text-[#ff4a8d] bg-[#0d0d16] px-1.5 py-0.5 rounded font-bold uppercase">
                      Популярно
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-[#a5a1b8]">
                    Оплата в приложении Kaspi.kz без комиссии
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'kaspi'}
                onChange={() => setPaymentMethod('kaspi')}
                className="accent-[#ff4a8d] w-5 h-5 cursor-pointer"
              />
            </label>

            {/* Bank Card Option */}
            <label
              onClick={() => setPaymentMethod('card')}
              className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'card'
                  ? 'bg-[#292932] border border-[#00eefc] shadow-[0_0_16px_rgba(0,238,252,0.25)]'
                  : 'bg-[#1b1b23] border border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#34343d] text-[#00eefc] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">credit_card</span>
                </div>
                <div>
                  <span className="font-sans text-xs font-bold text-white">Оплата картой</span>
                  <p className="font-sans text-[11px] text-[#a5a1b8]">
                    Visa, MasterCard, Halyk, Apple Pay
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="accent-[#ff4a8d] w-5 h-5 cursor-pointer"
              />
            </label>

            {/* Cash/Terminal on delivery */}
            <label
              onClick={() => setPaymentMethod('cash')}
              className={`p-3.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'cash'
                  ? 'bg-[#292932] border border-[#ffb1c4] shadow-[0_0_16px_rgba(255,177,196,0.25)]'
                  : 'bg-[#1b1b23] border border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#34343d] text-[#cbc3da] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
                </div>
                <div>
                  <span className="font-sans text-xs font-bold text-white">
                    Оплата при получении курьеру
                  </span>
                  <p className="font-sans text-[11px] text-[#a5a1b8]">
                    Наличные или POS-терминал курьера
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="accent-[#ff4a8d] w-5 h-5 cursor-pointer"
              />
            </label>
          </div>
        </section>

        {/* Order Items Mini Preview */}
        <section className="bg-[#1f1f27] border border-white/5 rounded-2xl p-4 flex flex-col gap-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#a5a1b8] uppercase tracking-wider">
              Товары в заказе ({items.length})
            </span>
            <span className="font-sans text-xs text-[#00eefc]">
              {items.reduce((s, it) => s + it.quantity, 0)} шт.
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto py-1 no-scrollbar">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex items-center gap-2.5 bg-[#0d0d16] p-2 rounded-xl shrink-0 border border-white/5 min-w-[190px]"
              >
                <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#1f1f27] shrink-0">
                  <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-xs font-semibold text-white truncate">
                    {it.name}
                  </span>
                  <span className="font-sans text-[11px] text-[#a5a1b8]">
                    {it.size} • {it.quantity} шт
                  </span>
                  <span className="font-display text-xs font-bold text-[#ffb1c4]">
                    {(it.price * it.quantity).toLocaleString('ru-RU')} ₸
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary Card */}
        <section className="bg-[#292932] border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-xl">
          <div className="flex justify-between items-center text-xs text-[#a5a1b8]">
            <span>Стоимость товаров ({items.length} шт.)</span>
            <span className="font-mono text-white">{subtotal.toLocaleString('ru-RU')} ₸</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between items-center text-xs text-[#a5a1b8]">
              <span>Скидка по промокоду</span>
              <span className="font-mono text-[#ff4a8d]">-{discount.toLocaleString('ru-RU')} ₸</span>
            </div>
          )}
          <div className="flex justify-between items-center text-xs text-[#a5a1b8]">
            <span>Доставка по Астане</span>
            <span className="font-sans text-[#00eefc] font-semibold">
              {deliveryFee === 0 ? 'Бесплатно' : `+${deliveryFee.toLocaleString('ru-RU')} ₸`}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-[#a5a1b8]">
            <span>Примерка перед оплатой</span>
            <span className="font-sans text-[#ffb1c4] font-semibold">Включена (15 мин)</span>
          </div>
          <div className="h-px bg-white/10 my-1" />
          <div className="flex justify-between items-baseline">
            <span className="font-display text-base font-bold text-white">Итого к оплате</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-[26px] font-extrabold text-[#ff4a8d] tracking-tight drop-shadow-[0_0_12px_rgba(255,74,141,0.5)]">
                {total.toLocaleString('ru-RU')}
              </span>
              <span className="font-display text-[18px] text-[#ff4a8d]">₸</span>
            </div>
          </div>
        </section>

        {/* Submit Button labeled “Оформить заказ” */}
        <section className="flex flex-col gap-2 items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#ff4a8d] via-[#ff007f] to-[#00eefc] text-white font-display text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(255,74,141,0.5),0_0_10px_rgba(0,238,252,0.4)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[22px]">
                  progress_activity
                </span>
                <span>Отправляем заказ в Telegram...</span>
              </>
            ) : (
              <>
                <span>Оформить заказ — {total.toLocaleString('ru-RU')} ₸</span>
                <span className="material-symbols-outlined text-[24px]">chevron_right</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#a5a1b8] text-center px-2">
            <span className="material-symbols-outlined text-[#00eefc] text-[16px]">
              verified_user
            </span>
            <span>Гарантия конфиденциальности • Без предоплаты</span>
          </div>
        </section>
      </form>
    </div>
  );
};
