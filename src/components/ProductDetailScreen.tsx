import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onGoToCart: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onGoToCart,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.label || 'S');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Глубокий черный');
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<{ desc: boolean; delivery: boolean }>({
    desc: true,
    delivery: false,
  });
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const galleryImages = product.gallery.length > 0 ? product.gallery : [product.image];
  const thumbnailImages = product.thumbnails.length > 0 ? product.thumbnails : galleryImages;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-1 relative">
      {/* Hero Showcase & Interactive Gallery */}
      <div className="relative w-full overflow-hidden bg-[#0d0d16]">
        {/* Carousel Tracks */}
        <div
          className="flex w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {galleryImages.map((imgUrl, idx) => (
            <div key={idx} className="w-full flex-shrink-0 relative aspect-[3/4]">
              <img
                src={imgUrl}
                alt={`${product.name} - ракурс ${idx + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13131b] via-transparent to-[#13131b]/30" />
            </div>
          ))}
        </div>

        {/* Floating Top Badges & Actions */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d0d16]/80 backdrop-blur-md border border-[#00eefc]/30 shadow-[0_0_16px_rgba(0,238,252,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#00eefc] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#00eefc]">
              Бестселлер в Астане
            </span>
          </div>

          <button
            onClick={() => onToggleWishlist(product.id)}
            aria-label="В избранное"
            className={`pointer-events-auto w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-90 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer ${
              isWishlisted
                ? 'bg-[#ff007f] text-white shadow-[0_0_16px_rgba(255,0,127,0.7)]'
                : 'bg-[#1f1f27]/80 text-white hover:text-[#ff007f]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Thumbnail Bar & Dots Indicator */}
        <div className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-2.5 z-10 px-4">
          {thumbnailImages.length > 1 && (
            <div className="flex items-center gap-2">
              {thumbnailImages.map((thumbUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-12 h-12 rounded-xl overflow-hidden bg-[#1f1f27] p-0.5 shadow-md transition-all cursor-pointer ${
                    currentSlide === idx
                      ? 'scale-105 opacity-100 ring-2 ring-[#00eefc] shadow-[0_0_10px_#00eefc]'
                      : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <img
                    src={thumbUrl}
                    alt={`Миниатюра ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Dot Indicators */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-1.5">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'w-6 bg-[#ff4a8d] shadow-[0_0_6px_#ff4a8d]'
                      : 'w-1.5 bg-[#5c3f46]'
                  }`}
                  aria-label={`Слайд ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col px-4 space-y-5 z-20 mt-2">
        {/* Header & Title */}
        <div className="flex flex-col gap-1.5 pt-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-[#a5a1b8]">
              Limited Cyber-Occult drop
            </span>
            <div className="flex items-center gap-1 bg-[#1f1f27] px-2.5 py-0.5 rounded-full border border-white/5">
              <span
                className="material-symbols-outlined text-[15px] text-[#ff4a8d]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-sans text-xs font-bold text-[#e4e1ed]">{product.rating}</span>
              <span className="font-sans text-xs text-[#a5a1b8]">({product.reviewsCount} отзыва)</span>
            </div>
          </div>
          <h2 className="font-display text-[22px] sm:text-[24px] font-bold tracking-tight text-white leading-snug">
            {product.name}
          </h2>
        </div>

        {/* Pricing Row */}
        <div className="flex items-baseline gap-3 p-3.5 rounded-2xl bg-[#1b1b23] border border-white/5 shadow-sm">
          <span className="font-display text-[26px] font-extrabold text-[#ffb1c4] drop-shadow-[0_0_18px_rgba(255,74,141,0.55)]">
            {product.price.toLocaleString('ru-RU')} ₸
          </span>
          {product.oldPrice && (
            <span className="font-sans text-sm line-through text-[#a5a1b8]">
              {product.oldPrice.toLocaleString('ru-RU')} ₸
            </span>
          )}
          {product.oldPrice && (
            <span className="ml-auto px-2.5 py-1 rounded-full font-mono text-xs font-bold bg-[#ff4a8d] text-white shadow-[0_0_12px_rgba(255,74,141,0.4)]">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Color Variant Selector */}
        {product.colors.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wider text-[#a5a1b8]">
                Цвет:
              </span>
              <span className="font-sans text-xs font-semibold text-[#00eefc]">
                {selectedColor}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {product.colors.map((c) => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1f1f27] text-white border border-[#00eefc] shadow-[0_0_14px_rgba(0,238,252,0.35)]'
                        : 'bg-[#1b1b23] text-[#a5a1b8] border border-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shadow-inner ring-1 ring-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-sans text-xs font-medium">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selector */}
        {product.sizes.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-wider text-[#a5a1b8]">
                Выберите размер (RU):
              </span>
              <button
                onClick={() => setShowSizeModal(true)}
                className="flex items-center gap-1 font-sans text-xs text-[#00eefc] hover:underline underline-offset-4 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">straighten</span>
                <span>Таблица размеров</span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s.label;
                return (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s.label)}
                    disabled={!s.inStock}
                    className={`py-2.5 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      !s.inStock
                        ? 'bg-[#1b1b23] opacity-30 cursor-not-allowed text-[#a5a1b8]'
                        : isSelected
                        ? 'bg-[#1f1f27] text-[#ffb1c4] border border-[#ff4a8d] shadow-[0_0_16px_rgba(255,74,141,0.4)]'
                        : 'bg-[#1b1b23] text-[#a5a1b8] border border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="font-display text-[15px] font-bold">{s.label}</span>
                    <span className="font-mono text-[10px] opacity-75">{s.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Atmospheric Micro Perk Strip */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#1b1b23] border border-white/5">
            <span className="material-symbols-outlined text-[#00eefc] text-[22px]">
              dry_cleaning
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-xs font-semibold text-[#e4e1ed] truncate">
                Премиум шёлк & бархат
              </span>
              <span className="font-sans text-[11px] text-[#a5a1b8] truncate">Ручная отделка</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#1b1b23] border border-white/5">
            <span className="material-symbols-outlined text-[#ff4a8d] text-[22px]">
              local_shipping
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-xs font-semibold text-[#e4e1ed] truncate">
                Шоурум в Астане
              </span>
              <span className="font-sans text-[11px] text-[#a5a1b8] truncate">
                Примерка до покупки
              </span>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-2.5 pt-1">
          {/* Section 1: Описание */}
          <div className="rounded-2xl bg-[#1f1f27] border border-white/5 overflow-hidden transition-colors">
            <button
              onClick={() =>
                setOpenAccordion((prev) => ({ ...prev, desc: !prev.desc }))
              }
              className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#ffb1c4] text-[20px]">
                  auto_awesome
                </span>
                <span className="font-display text-[16px] font-bold text-white">
                  Описание модели
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[#a5a1b8] transition-transform duration-300 ${
                  openAccordion.desc ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openAccordion.desc && (
              <div className="px-4 pb-4 flex flex-col gap-3 font-sans text-xs text-[#e5bcc5] leading-relaxed border-t border-white/5 pt-3">
                <p>{product.description}</p>
                {product.details && product.details.length > 0 && (
                  <ul className="space-y-1 text-[#e4e1ed]">
                    {product.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#00eefc] font-bold">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-[#292932] text-[#cbc3da]">
                    {product.composition}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#292932] text-[#cbc3da]">
                    {product.care}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Доставка по Астане */}
          <div className="rounded-2xl bg-[#1f1f27] border border-white/5 overflow-hidden transition-colors">
            <button
              onClick={() =>
                setOpenAccordion((prev) => ({ ...prev, delivery: !prev.delivery }))
              }
              className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#00eefc] text-[20px]">
                  near_me
                </span>
                <span className="font-display text-[16px] font-bold text-white">
                  Доставка по Астане
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[#a5a1b8] transition-transform duration-300 ${
                  openAccordion.delivery ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openAccordion.delivery && (
              <div className="px-4 pb-4 flex flex-col gap-3 font-sans text-xs text-[#e5bcc5] leading-relaxed border-t border-white/5 pt-3">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#00eefc] text-[20px] mt-0.5">
                    moped
                  </span>
                  <div>
                    <span className="font-sans font-semibold text-white block">
                      Курьер с примеркой (Бесплатно сегодня)
                    </span>
                    <span className="text-[11px] text-[#a5a1b8]">
                      При заказе до 17:00. Курьер подождет 20 минут, пока вы примерите платье.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-1">
                  <span className="material-symbols-outlined text-[#00eefc] text-[20px] mt-0.5">
                    storefront
                  </span>
                  <div>
                    <span className="font-sans font-semibold text-white block">
                      Шоурум GothNeon
                    </span>
                    <span className="text-[11px] text-[#a5a1b8]">
                      ул. Достык, 16. Ежедневно с 11:00 до 22:00. Готово к выдаче через 15 минут.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-[#0d0d16]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-[#1f1f27] border border-white/10 p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h3 className="font-display text-[18px] font-bold text-white">
                Таблица размеров (см)
              </h3>
              <button
                onClick={() => setShowSizeModal(false)}
                className="w-8 h-8 rounded-full bg-[#1b1b23] flex items-center justify-center text-[#a5a1b8] hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5 font-sans text-xs text-[#e5bcc5]">
              <div className="grid grid-cols-4 py-2 font-mono text-xs font-bold text-[#00eefc]">
                <span>Размер</span>
                <span>Грудь</span>
                <span>Талия</span>
                <span>Бедра</span>
              </div>
              <div className="grid grid-cols-4 py-2 bg-[#1b1b23] px-2 rounded-lg font-mono">
                <span className="font-bold text-white">XS (40)</span>
                <span>80-84</span>
                <span>60-64</span>
                <span>86-90</span>
              </div>
              <div className="grid grid-cols-4 py-2 px-2 font-mono">
                <span className="font-bold text-white">S (42)</span>
                <span>84-88</span>
                <span>64-68</span>
                <span>90-94</span>
              </div>
              <div className="grid grid-cols-4 py-2 bg-[#1b1b23] px-2 rounded-lg font-mono">
                <span className="font-bold text-white">M (44)</span>
                <span>88-92</span>
                <span>68-72</span>
                <span>94-98</span>
              </div>
              <div className="grid grid-cols-4 py-2 px-2 font-mono">
                <span className="font-bold text-white">L (46)</span>
                <span>92-96</span>
                <span>72-76</span>
                <span>98-102</span>
              </div>
            </div>
            <p className="font-sans text-[11px] text-[#a5a1b8] leading-normal">
              Благодаря корсетной шнуровке на спине посадка в зоне талии и груди легко регулируется в пределах 4-6 см.
            </p>
            <button
              onClick={() => setShowSizeModal(false)}
              className="w-full py-3 rounded-xl bg-[#292932] text-white font-sans text-xs font-semibold hover:bg-[#34343d] transition-colors"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Action Bar */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-[#0d0d16]/90 backdrop-blur-xl border-t border-white/5 shadow-[0_-8px_32px_rgba(0,0,0,0.7)] px-4 py-3 pb-safe">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#a5a1b8]">
              Итого
            </span>
            <span className="font-display text-[18px] font-bold text-white truncate">
              {product.price.toLocaleString('ru-RU')} ₸
            </span>
          </div>

          <button
            onClick={isAddedSuccess ? onGoToCart : handleAddToCart}
            className={`flex-1 min-h-[50px] rounded-2xl font-display text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer ${
              isAddedSuccess
                ? 'bg-[#00eefc] text-[#0d0d16] shadow-[0_0_24px_rgba(0,238,252,0.7)]'
                : 'bg-[#ff4a8d] text-white hover:bg-[#ff007f] shadow-[0_0_24px_rgba(255,74,141,0.5)]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAddedSuccess ? 'check_circle' : 'shopping_bag'}
            </span>
            <span>{isAddedSuccess ? 'В корзине! Перейти →' : 'В корзину'}</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
