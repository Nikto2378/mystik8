export type Category = 'all' | 'corsets' | 'chokers' | 'decor' | 'cloaks' | 'accessories' | 'hoodies';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  price: number;
  oldPrice?: number;
  badge?: {
    text: string;
    variant: 'hit' | 'neon' | 'exclusive' | 'new';
  };
  image: string;
  gallery: string[];
  thumbnails: string[];
  description: string;
  details: string[];
  composition: string;
  care: string;
  sizes: { label: string; sub: string; inStock: boolean }[];
  colors: { id: string; name: string; bgClass: string; hex: string }[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  badgeText?: string;
}

export interface OrderState {
  orderNumber: string;
  customerName: string;
  phone: string;
  deliveryMethod: 'courier' | 'express' | 'showroom';
  deliveryAddress: string;
  district: string;
  comment: string;
  paymentMethod: 'kaspi' | 'card' | 'cash';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}

export type ScreenType = 'catalog' | 'product' | 'cart' | 'checkout' | 'thank-you' | 'order_success' | 'profile' | 'lookbook';
