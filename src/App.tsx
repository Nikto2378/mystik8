const TOKEN = "9249177921:AAF-HspZSUd34MBMEdqqdB26ltZqkd51ofM";
const CHAT_ID = "6149714271";

import { useState, useEffect } from 'react';
import { ScreenType, Product, CartItem, OrderState } from './types';
import { PRODUCTS, INITIAL_CART_ITEMS } from './data/products';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CatalogScreen } from './components/CatalogScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { OrderSuccessScreen } from './components/OrderSuccessScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LookbookModal, ShowroomModal, CitySelectorModal } from './components/Modals';

const CART_STORAGE_KEY = 'gothneon_cart';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('catalog');
  const [historyStack, setHistoryStack] = useState<ScreenType[]>(['catalog']);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  
  // Cart state initialized from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    return INITIAL_CART_ITEMS;
  });

  const [wishlist, setWishlist] = useState<string[]>(['nocturna-dress']);
  const [promoCode, setPromoCode] = useState<string>('GOTH2025');
  const [promoDiscount, setPromoDiscount] = useState<number>(2500);
  const [selectedCity, setSelectedCity] = useState<string>('Астана');
  const [isDesktopFrame, setIsDesktopFrame] = useState<boolean>(true);

  // Modals
  const [showLookbookModal, setShowLookbookModal] = useState<boolean>(false);
  const [showShowroomModal, setShowShowroomModal] = useState<boolean>(false);
  const [showCityModal, setShowCityModal] = useState<boolean>(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Orders history
  const [orders, setOrders] = useState<OrderState[]>([
    {
      orderNumber: '#GN-78942',
      customerName: 'Алиса Воронова',
      phone: '+7 (777) 666-13-13',
      deliveryMethod: 'courier',
      deliveryAddress: 'ул. Достык, 18, кв. 66',
      district: 'Есильский район, возле Байтерека',
      comment: 'Позвонить за 20 минут, примерка 15 минут, домофон работает',
      paymentMethod: 'kaspi',
      items: INITIAL_CART_ITEMS,
      subtotal: 45400,
      discount: 2500,
      deliveryFee: 0,
      total: 42900,
      createdAt: '14:24',
    },
  ]);
  const [activeOrder, setActiveOrder] = useState<OrderState>(orders[0]);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const navigateTo = (screen: ScreenType) => {
    setHistoryStack((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop();
      const prevScreen = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('catalog');
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product');
  };

  const handleAddToCart = (product: Product, size = 'S (42)', color = 'Черный') => {
    setCart((prev) => {
      const existing = prev.find((it) => it.productId === product.id && it.size === size);
      if (existing) {
        return prev.map((it) =>
          it.id === existing.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          productId: product.id,
          name: product.name,
          subtitle: `Размер: ${size} • Цвет: ${color}`,
          price: product.price,
          image: product.image,
          size,
          color,
          quantity: 1,
          badgeText: product.badge?.text,
        };
        return [...prev, newItem];
      }
    });
    showToast('Артефакт добавлен в корзину');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
    showToast('Товар удален из корзины');
  };

  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Удалено из избранного');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Добавлено в избранное');
        return [...prev, productId];
      }
    });
  };

  const handleApplyPromo = (code: string) => {
    if (code.trim().toUpperCase() === 'GOTH2025') {
      setPromoCode('GOTH2025');
      setPromoDiscount(2500);
      showToast('Промокод GOTH2025 активирован (-2 500 ₸)');
    } else if (code.trim()) {
      setPromoCode(code.trim().toUpperCase());
      setPromoDiscount(1500);
      showToast(`Промокод ${code} активирован (-1 500 ₸)`);
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setPromoDiscount(0);
    showToast('Промокод удален');
  };

  // Called when Telegram returns ok: true
  const handleOrderCompleted = (order: OrderState) => {
    setOrders((prev) => [order, ...prev]);
    setActiveOrder(order);
    
    // Clear cart both in state and in localStorage
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear cart storage', e);
    }

    // Show the thank-you page
    navigateTo('thank-you');
  };

  const cartTotalCount = cart.reduce((acc, it) => acc + it.quantity, 0);
  const cartSubtotal = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0d16] text-[#e4e1ed] flex flex-col items-center">
      {/* App Shell Container: Toggleable between sleek centered mobile device frame and expanded view */}
      <div
        className={`w-full transition-all duration-300 min-h-screen flex flex-col relative ${
          isDesktopFrame
            ? 'max-w-[430px] bg-[#13131b] shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,0,127,0.15)] border-x border-white/5'
            : 'max-w-4xl bg-[#13131b]'
        }`}
      >
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          onBack={handleBack}
          cartCount={cartTotalCount}
          wishlistCount={wishlist.length}
          selectedCity={selectedCity}
          onOpenCityModal={() => setShowCityModal(true)}
          isDesktopFrame={isDesktopFrame}
          onToggleDesktopFrame={() => setIsDesktopFrame((prev) => !prev)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col pt-16">
          {currentScreen === 'catalog' && (
            <CatalogScreen
              onSelectProduct={handleSelectProduct}
              onAddToCart={(product, e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              onOpenLookbook={() => setShowLookbookModal(true)}
              onOpenShowroom={() => setShowShowroomModal(true)}
            />
          )}

          {currentScreen === 'product' && (
            <ProductDetailScreen
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={wishlist.includes(selectedProduct.id)}
              onGoToCart={() => navigateTo('cart')}
            />
          )}

          {currentScreen === 'cart' && (
            <CartScreen
              items={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onProceedToCheckout={() => navigateTo('checkout')}
              onNavigateToCatalog={() => navigateTo('catalog')}
              promoCode={promoCode}
              promoDiscount={promoDiscount}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={handleRemovePromo}
            />
          )}

          {currentScreen === 'checkout' && (
            <CheckoutScreen
              items={cart}
              subtotal={cartSubtotal}
              discount={promoDiscount}
              onOrderCompleted={handleOrderCompleted}
              onBackToCart={() => navigateTo('cart')}
            />
          )}

          {(currentScreen === 'thank-you' || currentScreen === 'order_success') && (
            <OrderSuccessScreen
              order={activeOrder}
              onNavigateToCatalog={() => navigateTo('catalog')}
              onNavigateToProfile={() => navigateTo('profile')}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              orders={orders}
              wishlist={wishlist}
              onSelectProduct={handleSelectProduct}
              onNavigateToCatalog={() => navigateTo('catalog')}
              onViewOrder={(ord) => {
                setActiveOrder(ord);
                navigateTo('thank-you');
              }}
            />
          )}

          {currentScreen === 'lookbook' && (
            <div className="flex flex-col w-full pb-28 pt-2">
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">
                    Cyber Goth '25 Lookbook
                  </h2>
                  <p className="font-sans text-xs text-[#a5a1b8]">
                    Атмосферные образы для ночной Астаны
                  </p>
                </div>
              </div>
              <div className="px-4 space-y-4">
                {PRODUCTS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="rounded-2xl overflow-hidden bg-[#1f1f27] border border-white/5 cursor-pointer group"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                        <span className="font-display text-base font-bold text-white">
                          {p.name}
                        </span>
                        <span className="font-display text-sm font-bold text-[#ffb1c4]">
                          {p.price.toLocaleString('ru-RU')} ₸
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Floating Bottom Navigation Bar */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          cartCount={cartTotalCount}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="px-4 py-2.5 rounded-full bg-[#0d0d16]/95 backdrop-blur-xl text-[#ff4a8d] font-sans text-xs font-semibold shadow-[0_0_20px_#ff4a8d] border border-[#ff4a8d]/40 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Supporting Modals */}
        <LookbookModal
          isOpen={showLookbookModal}
          onClose={() => setShowLookbookModal(false)}
          onSelectProduct={handleSelectProduct}
        />

        <ShowroomModal
          isOpen={showShowroomModal}
          onClose={() => setShowShowroomModal(false)}
        />

        <CitySelectorModal
          isOpen={showCityModal}
          onClose={() => setShowCityModal(false)}
          selectedCity={selectedCity}
          onSelectCity={(city) => {
            setSelectedCity(city);
            showToast(`Город доставки изменен: ${city}`);
          }}
        />
      </div>
    </div>
  );
}
