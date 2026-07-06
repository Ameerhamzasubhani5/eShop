// Auth Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
}

// Catalog Types (shape returned by the backend's /products and /categories endpoints)
export interface Category {
  id: number;
  name: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string | null;
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number | null;
  discount?: string | null;
  brand?: string | null;
  rating: number;
  inStock?: boolean;
  colors?: Color[];
  sizes?: string[];
  categoryId?: number | null;
  category?: Category | null;
}

// Cart Types (shape returned by the backend's /cart endpoints)
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  color: string | null;
  size: string | null;
  product: Product;
  lineTotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

// Order Types (shape returned by the backend's /orders endpoints)
export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  id: number;
  productId: number | null;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  color: string | null;
  size: string | null;
  lineTotal: number;
}

export interface Order {
  id: number;
  userId: number;
  status: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentProvider: string | null;
  paymentReference: string | null;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  createdAt: string;
}

export const testimonials = [
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 4,
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 4,
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 4,
  },
  {
    name: "Clark",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 4.5,
  },
  {
    name: "James Bond",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 4,
  },
];
