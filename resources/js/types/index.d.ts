import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface Option {
    value: string;
    label: string;
    icon?: LucideIcon | null;
    description?: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
    currency : Currency
}

export interface Currency {
    id: number;
    name: string;
    symbol: string;
}
export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface ProductCategory {
    id: number;
    name: string;
    position: number;
}
export interface ProductGroup {
    id: number;
    name: string;
    position: number;
}

export interface ProductRecipe {
    id: number;
    name: string;
    version: string;
    description: string;
    is_active: boolean;
    product: Product;
    items: ProductRecipeItem[];
}

export interface ProductRecipeItem {
    id: number;
    name: string;
    quantity: number;
    uom: string;
    position: number;
    details: string;
    product: Product;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string;
    eu_warranty_days: int;
    non_eu_warranty_days: int;
    position: number;
    msrp: int;
    weight: number;
    ean: string;
    upc: string;
    status: string;
    product_category: ProductCategory;
    product_category_id: string;
    product_group: ProductGroup;
    product_group_id: string;
    material_id: number;
    thumbnail: Media;
    gallery: Media[];
    services: ProductService[];
    latest_recipe: ProductRecipe;
    variants: ProductVariant[];
    tags: Tag[];
}

export interface ProductVariant {
    id: number;
    sku : string;
    name : string;
    option : string;
    price : number;
    material_id: string;
}

export interface Media {
    id: number;
    name: string;
    temporary_url: string;
    src: string;
    srcset: string;
}

export interface ProductService {
    id: number;
    name: string;
    description: string;
    price: number;
    warranty_days: number;
    product_id: number;
    product: Product;
    is_active: boolean;
}

export interface ProductRegistration {
    id: string;
    product: Product;
    product_id: string;
    user: User;
    user_id: string;
    first_name: string;
    last_name: string;
    nickname: string;
    email: string;
    purchase_date: string;
    serial_number: string;
    checked: boolean;
    validated: boolean;
    product_service: ProductService;
    product_service_id: string;
    has_warning: boolean;
    currency_id: number;
    country_id: number;
    warranty_days: number;
    default_warranty_days: number;
    bought_from: string;
    address: string;
    phone: string;
    can_extend_warranty: boolean;
    created_at: string;
    remaining_warranty_days: number;
    expiration_date: string
}

export interface ContentBlock {
    id: number;
    key: string;
    title: string;
    body?: string | null;
    action: string;
    action_name: string;
    background: Media;
    mobileBackground: Media;
    video_url : string;
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: {
        en: string;
    };
    order_column: string;
}
