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
    description: string;
    position: number;
}
