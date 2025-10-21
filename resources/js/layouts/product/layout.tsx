import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Product',
        href: '/products',
        icon: null,
    },
    {
        title: 'Services',
        href: '/product-services',
        icon: null,
    },
    {
        title: 'Recipes',
        href: '/product-recipes',
        icon: null,
    },
    {
        title: 'Categories',
        href: '/product-categories',
        icon: null,
    },
    {
        title: 'Groups',
        href: '/product-groups',
        icon: null,
    },
    {
        title: 'Content block',
        href: '/content-blocks',
        icon: null,
    },
    {
        title: 'Tags',
        href: '/tags',
    }
];

export default function ManagementLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Management" description="Manage product available content, products, groups, categories, recipes, sevices" />

            <div className="flex flex-col lg:flex-row lg:space-x-12 ">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath.includes(item.href),
                                })}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="h-4 w-4" />}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 md:max-w-5xl bg-card p-6 border rounded">
                    <section className="max-w-5xl space-y-6">{children}</section>
                </div>
            </div>
        </div>
    );
}
