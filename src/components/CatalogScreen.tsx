import React, { useState } from 'react';
import { Category, Product } from '../types';
import { ASSETS, PRODUCTS } from '../data/products';

interface CatalogScreenProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  wishlist: string[];
  onOpenLookbook: () => void;
  onOpenShowroom: () => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onOpenLookbook,
  onOpenShowroom,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [maxPrice, setMaxPrice] = useState(35000);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'Все' },
    { id: 'corsets', label: 'Платья и корсеты' },
    { id: 'chokers', label: 'Чокеры и ошейники' },
    { id: 'decor', label: 'Неон и декор' },
    { id: 'cloaks', label: 'Мантии' },
    { id: 'accessories', label: 'Аксессуары' },
    { id: 'hoodies', label: 'Худи' },
  ];

  // Filtering
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Top Astana Express Delivery Notice */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#00eefc] shadow-[0_0_8px_#00eefc]" />
          <span className="font-sans text-[13px] font-medium text-[#e4e1ed]">
            Доставка: Астана
          </span>
          <span className="font-sans text-[11px] text-[#00eefc] font-semibold tracking-wide">
            (Экспресс за 2 часа)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#ffb1c4] bg-[#1f1f27] px-2 py-0.5 rounded-full border border-[#ff4a8d]/30 shadow-[0_0_8px_rgba(255,74,141,0.2)]">
          <span className="material-symbols-outlined text-[14px] text-[#ff4a8d]">bolt</span>
          <span>24/7</span>
        </div>
      </div>

      {/* Search Bar + Filter Button */}
      <div className="px-4 py-1.5 flex items-center gap-2.5">
        <div className="flex-1 relative flex items-center bg-[#1b1b23] rounded-xl px-3.5 py-2.5 shadow-[0_0_12px_rgba(0,238,252,0.12)] border border-white/5 focus-within:border-[#00eefc]/50 focus-within:shadow-[0_0_18px_rgba(0,238,252,0.3)] transition-all">
          <span className="material-symbols-outlined text-[20px] text-[#00eefc] mr-2 shrink-0">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Искать готическую одежду, декор..."
            className="w-full bg-transparent font-sans text-sm text-[#e4e1ed] placeholder:text-[#a5a1b8]/60 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#a5a1b8] hover:text-[#e4e1ed] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFiltersModal(true)}
          className="h-[44px] w-[44px] shrink-0 rounded-xl bg-[#1f1f27] border border-[#ff4a8d]/30 flex items-center justify-center text-[#ff4a8d] shadow-[0_0_14px_rgba(255,74,141,0.25)] hover:bg-[#292932] active:scale-95 transition-all cursor-pointer"
          aria-label="Фильтры"
        >
          <span className="material-symbols-outlined text-[22px]">tune</span>
        </button>
      </div>

      {/* Hero Banners Carousel (Snap scroll) */}
      <div className="pt-3 pb-2">
        <div className="flex overflow-x-auto gap-3.5 px-4 no-scrollbar snap-x snap-mandatory">
          {/* Banner 1: Cyber Goth '25 */}
          <div className="snap-center shrink-0 w-[86vw] max-w-[360px] rounded-2xl overflow-hidden relative bg-[#1f1f27] border border-[#ff4a8d]/30 shadow-[0_0_24px_rgba(255,74,141,0.25)] flex flex-col justify-end p-5 min-h-[185px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('${ASSETS.bannerLookbook}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/70 to-transparent" />
            <div className="relative z-10 flex flex-col items-start gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0d0d16]/85 backdrop-blur-md text-[#ffb1c4] border border-[#ff4a8d]/40 font-mono text-[10px] tracking-widest uppercase shadow-[0_0_8px_#ff4a8d]">
                Скидки до -30%
              </span>
              <h2 className="font-display text-[20px] font-extrabold uppercase tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Cyber Goth '25
              </h2>
              <p className="font-sans text-[12px] text-[#e5bcc5] line-clamp-1">
                Темная неоготика и кибер-детали новой эры
              </p>
              <button
                onClick={onOpenLookbook}
                className="mt-1 px-4 py-2 rounded-xl bg-[#ff4a8d] hover:bg-[#ff007f] text-white font-sans text-xs font-bold flex items-center gap-1.5 shadow-[0_0_16px_rgba(255,74,141,0.6)] active:scale-95 transition-all cursor-pointer"
              >
                <span>Смотреть лукбук</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Banner 2: Темный декор дома */}
          <div className="snap-center shrink-0 w-[86vw] max-w-[360px] rounded-2xl overflow-hidden relative bg-[#1f1f27] border border-[#00eefc]/30 shadow-[0_0_24px_rgba(0,238,252,0.2)] flex flex-col justify-end p-5 min-h-[185px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url('${ASSETS.bannerDecor}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/70 to-transparent" />
            <div className="relative z-10 flex flex-col items-start gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0d0d16]/85 backdrop-blur-md text-[#00eefc] border border-[#00eefc]/40 font-mono text-[10px] tracking-widest uppercase shadow-[0_0_8px_#00eefc]">
                Новинки недели
              </span>
              <h2 className="font-display text-[20px] font-extrabold uppercase tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Темный декор дома
              </h2>
              <p className="font-sans text-[12px] text-[#e5bcc5] line-clamp-1">
                Неоновые черепа, рунические светильники
              </p>
              <button
                onClick={() => setSelectedCategory('decor')}
                className="mt-1 px-4 py-2 rounded-xl bg-[#292932] hover:bg-[#34343d] text-[#00eefc] border border-[#00eefc]/40 font-sans text-xs font-bold flex items-center gap-1.5 shadow-[0_0_14px_rgba(0,238,252,0.3)] active:scale-95 transition-all cursor-pointer"
              >
                <span>Исследовать</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="py-2">
        <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold shrink-0 transition-all active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-[#ff4a8d] text-white shadow-[0_0_12px_rgba(255,74,141,0.5)]'
                    : 'bg-[#1f1f27] text-[#a5a1b8] hover:text-[#e4e1ed] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h3 className="font-display text-[17px] font-bold text-white uppercase tracking-wider">
            Каталог
          </h3>
          <span className="font-sans text-[11px] text-[#a5a1b8]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'артефакт' : 'артефактов'}
          </span>
        </div>

        {/* Sort Select */}
        <div className="relative flex items-center gap-1 text-[#00eefc] font-sans text-xs font-medium cursor-pointer">
          <span className="material-symbols-outlined text-[16px]">swap_vert</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-[#00eefc] text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="popular" className="bg-[#1f1f27] text-[#e4e1ed]">
              По популярности
            </option>
            <option value="price_asc" className="bg-[#1f1f27] text-[#e4e1ed]">
              Сначала дешевле
            </option>
            <option value="price_desc" className="bg-[#1f1f27] text-[#e4e1ed]">
              Сначала дороже
            </option>
          </select>
        </div>
      </div>

      {/* 2-Column Product Cards Grid */}
      <div className="px-4">
        {filteredProducts.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center p-6 bg-[#1b1b23] rounded-2xl border border-white/5">
            <span className="material-symbols-outlined text-4xl text-[#ff4a8d] mb-2">search_off</span>
            <p className="font-display text-lg text-white">Артефакты не найдены</p>
            <p className="font-sans text-xs text-[#a5a1b8] mt-1">Попробуйте изменить категорию или поисковый запрос</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setMaxPrice(35000);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#292932] text-[#00eefc] text-xs font-semibold"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="flex flex-col bg-[#1f1f27] rounded-2xl overflow-hidden border border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.6)] relative group transition-all duration-300 hover:border-[#ff4a8d]/40 hover:shadow-[0_0_20px_rgba(255,74,141,0.2)] cursor-pointer"
                >
                  {/* Image Container with 3:4 Aspect Ratio */}
                  <div className="relative w-full aspect-[3/4] bg-[#0d0d16] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div
                        className={`absolute top-2 left-2 px-2 py-0.5 rounded-full backdrop-blur-md font-mono text-[9px] uppercase tracking-wider font-bold shadow-md ${
                          product.badge.variant === 'neon'
                            ? 'bg-[#0d0d16]/85 text-[#00eefc] border border-[#00eefc]/50 shadow-[0_0_8px_#00eefc]'
                            : 'bg-[#0d0d16]/85 text-[#ff4a8d] border border-[#ff4a8d]/50 shadow-[0_0_8px_#ff4a8d]'
                        }`}
                      >
                        {product.badge.text}
                      </div>
                    )}

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => onToggleWishlist(product.id, e)}
                      aria-label="В избранное"
                      className={`absolute top-2 right-2 h-7 w-7 rounded-full bg-[#0d0d16]/80 backdrop-blur-md flex items-center justify-center transition-all active:scale-75 ${
                        isWishlisted ? 'text-[#ff007f] shadow-[0_0_10px_#ff007f]' : 'text-[#a5a1b8] hover:text-[#ff007f]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-[10px] text-[#a5a1b8] uppercase tracking-widest">
                        {product.categoryLabel}
                      </span>
                      <h4 className="font-sans text-[13px] font-semibold text-[#e4e1ed] line-clamp-1 mt-0.5">
                        {product.name}
                      </h4>
                      <span className="font-sans text-[11px] text-[#e5bcc5] line-clamp-1">
                        {product.subtitle}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-col">
                        <span className="font-display text-[15px] font-bold text-[#ffb1c4] tracking-tight">
                          {product.price.toLocaleString('ru-RU')} ₸
                        </span>
                        {product.oldPrice && (
                          <span className="font-sans text-[10px] text-[#a5a1b8] line-through -mt-1">
                            {product.oldPrice.toLocaleString('ru-RU')} ₸
                          </span>
                        )}
                      </div>

                      {/* Add To Cart Button */}
                      <button
                        onClick={(e) => onAddToCart(product, e)}
                        aria-label="Добавить в корзину"
                        className="h-8 w-8 rounded-xl bg-[#292932] text-[#ff4a8d] hover:bg-[#ff4a8d] hover:text-white flex items-center justify-center shadow-[0_0_8px_rgba(255,74,141,0.3)] active:scale-90 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Showroom Astana Card */}
      <div className="px-4 pt-5">
        <div className="rounded-2xl bg-[#1b1b23] border border-[#00eefc]/20 p-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#1f1f27] border border-[#00eefc]/40 flex items-center justify-center text-[#00eefc] shadow-[0_0_12px_rgba(0,238,252,0.3)] shrink-0">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm font-semibold text-[#e4e1ed]">
                Примерка в Астане
              </span>
              <span className="font-sans text-xs text-[#a5a1b8]">
                Шоурум: ул. Достык, 16 • 11:00-22:00
              </span>
            </div>
          </div>
          <button
            onClick={onOpenShowroom}
            className="px-3.5 py-1.5 rounded-xl bg-[#292932] text-[#00eefc] border border-[#00eefc]/30 font-sans text-xs uppercase font-semibold tracking-wider hover:bg-[#34343d] active:scale-95 transition-all cursor-pointer"
          >
            Карта
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 z-50 bg-[#0d0d16]/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full sm:max-w-md bg-[#1f1f27] rounded-t-3xl sm:rounded-2xl p-5 border border-white/10 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <h3 className="font-display text-lg font-bold text-white">Фильтры каталога</h3>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="text-[#a5a1b8] hover:text-white p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#a5a1b8]">
                Максимальная цена: {maxPrice.toLocaleString('ru-RU')} ₸
              </label>
              <input
                type="range"
                min="4000"
                max="35000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full mt-2 accent-[#ff4a8d] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#a5a1b8] mt-1 font-mono">
                <span>4 000 ₸</span>
                <span>35 000 ₸</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#a5a1b8]">
                Сортировка
              </label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  onClick={() => setSortBy('popular')}
                  className={`py-2 px-2 text-xs rounded-xl font-medium transition-all ${
                    sortBy === 'popular'
                      ? 'bg-[#ff4a8d] text-white shadow-[0_0_10px_#ff4a8d]'
                      : 'bg-[#292932] text-[#a5a1b8]'
                  }`}
                >
                  Популярные
                </button>
                <button
                  onClick={() => setSortBy('price_asc')}
                  className={`py-2 px-2 text-xs rounded-xl font-medium transition-all ${
                    sortBy === 'price_asc'
                      ? 'bg-[#ff4a8d] text-white shadow-[0_0_10px_#ff4a8d]'
                      : 'bg-[#292932] text-[#a5a1b8]'
                  }`}
                >
                  Дешевле
                </button>
                <button
                  onClick={() => setSortBy('price_desc')}
                  className={`py-2 px-2 text-xs rounded-xl font-medium transition-all ${
                    sortBy === 'price_desc'
                      ? 'bg-[#ff4a8d] text-white shadow-[0_0_10px_#ff4a8d]'
                      : 'bg-[#292932] text-[#a5a1b8]'
                  }`}
                >
                  Дороже
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setMaxPrice(35000);
                  setSortBy('popular');
                  setSelectedCategory('all');
                }}
                className="flex-1 py-3 rounded-xl bg-[#292932] text-[#a5a1b8] text-xs font-semibold hover:text-white"
              >
                Сбросить
              </button>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="flex-1 py-3 rounded-xl bg-[#ff4a8d] text-white text-xs font-bold shadow-[0_0_16px_rgba(255,74,141,0.5)]"
              >
                Применить ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
