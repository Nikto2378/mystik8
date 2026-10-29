import React from 'react';
import { ASSETS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  const lookbookItems = [
    {
      title: 'Образ I: Темная неоновая королева',
      tag: 'Cyber Occult',
      image: ASSETS.bannerLookbook,
      description: 'Сочетание бархатного платья «Nocturna» со стальным ошейником и неоновыми световодами.',
      productId: 'nocturna-dress',
    },
    {
      title: 'Образ II: Техно-Некромантия',
      tag: 'Urban Witch',
      image: PRODUCTS.find(p => p.id === 'necromancer-cloak')?.image || ASSETS.bannerLookbook,
      description: 'Мантия некроманта с глубоким капюшоном и лазерной портупеей «Neo Noir».',
      productId: 'necromancer-cloak',
    },
    {
      title: 'Образ III: Кибер-Рунический Андеграунд',
      tag: 'Streetwear 2025',
      image: PRODUCTS.find(p => p.id === 'cyber-rune-hoodie')?.image || ASSETS.bannerLookbook,
      description: 'Оверсайз худи «Cyber Rune» с флуоресцентной вышивкой и титановым чокером.',
      productId: 'cyber-rune-hoodie',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d16]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#1f1f27] border border-[#ff4a8d]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between bg-[#1b1b23]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff4a8d] text-2xl">auto_awesome</span>
            <div>
              <h2 className="font-display text-lg font-bold text-white tracking-wide">
                Cyber Goth '25 Lookbook
              </h2>
              <p className="font-sans text-[11px] text-[#e5bcc5]">
                Эксклюзивная капсула темной неоготики
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#292932] text-[#a5a1b8] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Lookbook Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 no-scrollbar">
          {lookbookItems.map((look, i) => {
            const product = PRODUCTS.find(p => p.id === look.productId);
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-[#1b1b23] border border-white/5 shadow-lg group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#0d0d16]/80 backdrop-blur-md border border-[#ff4a8d]/50 font-mono text-[9px] text-[#ffb1c4] uppercase font-bold tracking-wider">
                    {look.tag}
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-display text-base font-bold text-white">{look.title}</h3>
                  <p className="font-sans text-xs text-[#a5a1b8] leading-relaxed">
                    {look.description}
                  </p>
                  {product && (
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="mt-2 w-full py-2.5 rounded-xl bg-[#292932] hover:bg-[#ff4a8d] text-white border border-[#ff4a8d]/30 font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(255,74,141,0.2)]"
                    >
                      <span>Купить образ ({product.price.toLocaleString('ru-RU')} ₸)</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface ShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowroomModal: React.FC<ShowroomModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d16]/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#1f1f27] border border-[#00eefc]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between bg-[#1b1b23]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00eefc] text-2xl">storefront</span>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Шоурум GothNeon в Астане
              </h2>
              <p className="font-sans text-[11px] text-[#00eefc]">
                ул. Достык, 16 (возле Байтерека)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#292932] text-[#a5a1b8] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content & Map Mockup */}
        <div className="p-5 flex flex-col gap-4">
          {/* Stylized Cyber Map Box */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#0d0d16] border border-[#00eefc]/30 flex items-center justify-center">
            {/* Visual background map simulation */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#00eefc_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute w-24 h-24 rounded-full bg-[#00eefc]/15 blur-xl animate-pulse" />
            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 rounded-full bg-[#00eefc] text-[#00363a] flex items-center justify-center shadow-[0_0_16px_#00eefc] font-bold mb-1.5">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <span className="font-display text-sm font-bold text-white drop-shadow">
                GothNeon Astana Flagship
              </span>
              <span className="font-sans text-[11px] text-[#e4e1ed] opacity-80">
                Есильский район, Левый берег
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-[#1b1b23] border border-white/5 flex flex-col gap-1">
              <span className="text-[#a5a1b8] font-mono text-[10px] uppercase">Время работы</span>
              <span className="font-semibold text-white">Ежедневно: 11:00 – 22:00</span>
            </div>
            <div className="p-3 rounded-xl bg-[#1b1b23] border border-white/5 flex flex-col gap-1">
              <span className="text-[#a5a1b8] font-mono text-[10px] uppercase">Примерка</span>
              <span className="font-semibold text-[#00eefc]">4 VIP-примерочные</span>
            </div>
          </div>

          <p className="font-sans text-xs text-[#a5a1b8] leading-relaxed">
            В шоуруме представлены все корсеты, платья, мантии и светящийся декор. Действует бар с черным крафтовым чаем и бесплатная примерка со стилистом.
          </p>

          <a
            href="tel:+77776661313"
            className="w-full py-3 rounded-xl bg-[#00eefc] hover:bg-[#00dbe9] text-[#00363a] font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,238,252,0.4)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Позвонить в шоурум: +7 (777) 666-13-13</span>
          </a>
        </div>
      </div>
    </div>
  );
};

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  const districts = [
    { name: 'Астана — Есильский (Левый берег)', desc: 'Доставка 60–90 мин • Байтерек, Экспо' },
    { name: 'Астана — Алматинский (Правый берег)', desc: 'Доставка до 2 часов' },
    { name: 'Астана — Байконур', desc: 'Доставка до 2 часов' },
    { name: 'Астана — Сарыарка', desc: 'Доставка до 2 часов' },
    { name: 'Астана — Нура', desc: 'Доставка до 2 часов' },
    { name: 'Алматы (Экспресс Авиа)', desc: 'Доставка на следующий день' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d16]/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#1f1f27] border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00eefc]">location_on</span>
            <h3 className="font-display text-base font-bold text-white">Выбор района доставки</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b1b23] text-[#a5a1b8] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-1.5 py-1">
          {districts.map((d, i) => {
            const isSelected = selectedCity.includes(d.name.split(' ')[1] || d.name);
            return (
              <button
                key={i}
                onClick={() => {
                  onSelectCity(d.name.includes('Астана') ? 'Астана' : d.name);
                  onClose();
                }}
                className={`p-3 rounded-xl text-left transition-all flex flex-col gap-0.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#292932] border border-[#00eefc] shadow-[0_0_12px_rgba(0,238,252,0.2)]'
                    : 'bg-[#1b1b23] border border-white/5 hover:border-white/10'
                }`}
              >
                <span className="font-sans text-xs font-bold text-white">{d.name}</span>
                <span className="font-sans text-[11px] text-[#a5a1b8]">{d.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
