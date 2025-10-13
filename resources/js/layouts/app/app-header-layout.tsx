import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import AppLogoIcon from '@/components/app-logo-icon';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
            <div className="text-center py-6 text-muted-foreground">
                <p>
                    © { new Date().getFullYear() }, Meze Audio
                </p>
                <p>
                   Sound. Comfort. Design. True high-end.
                </p>
                <p className="flex justify-center pt-3">
                    <AppLogoIcon className="w-8 h-8"/>
                </p>
            </div>
            <Toaster
                toastOptions={{
                    classNames: {
                        toast: '!bg-secondary !border-input !text-primary',
                        description: '!text-muted-foreground',
                    },
                }}
            />
        </AppShell>
    );
}
