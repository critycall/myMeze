import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BlockContent from '@/components/ui/content-block';
import ResponsiveImage from '@/components/ui/image';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, ContentBlock, ProductRegistration, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Award, CircleUser, Headset, Wrench } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    productRegistrations = [],
    registerFirstProduct,
    registerAnotherHeadphone,
}: {
    productRegistrations: ProductRegistration[];
    registerFirstProduct: ContentBlock;
    registerAnotherHeadphone: ContentBlock;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded p-4">
                <div className="flex aspect-auto min-h-32 flex-col justify-between overflow-hidden rounded border border-sidebar-border/70 bg-primary p-4 text-center text-secondary md:col-span-2 md:text-left dark:border-sidebar-border">
                    <h1 className="scroll-m-20 text-xl font-semibold text-balance uppercase">Welcome back, </h1>
                    <h1 className="scroll-m-20 text-xl font-semibold text-balance uppercase">{auth.user.first_name} </h1>
                    <p className="mt-6 text-lg">Take your time!</p>
                </div>

                {productRegistrations.length > 0 && (
                    <div className="flex aspect-auto scroll-m-20 justify-between overflow-hidden p-4 text-center md:text-left">
                        <h1 className="text-xl font-semibold text-balance uppercase">Your products </h1>
                    </div>
                )}

                {productRegistrations.length == 0 && registerFirstProduct && (
                    <div className="relative overflow-hidden rounded border border-sidebar-border/70 dark:border-sidebar-border">
                        <BlockContent block={registerFirstProduct} />
                    </div>
                )}

                {productRegistrations.length > 0 && (
                    <div className="relative grid auto-rows-min gap-4 overflow-hidden md:grid-cols-2 dark:border-sidebar-border">
                        {productRegistrations.map((registration: ProductRegistration, index: number) => (
                            <div className="flex rounded border border-sidebar-border/70 bg-card" key={index + '-product'}>
                                <ResponsiveImage className="aspect-square w-1/2 flex-shrink-0" media={registration.product.thumbnail} />
                                <div className="flex min-h-40 flex-col justify-between p-4">
                                    <div>
                                        <h3 className="my-2 font-bold uppercase"> {registration.product.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Serial No.
                                            <span> {registration.serial_number}</span>
                                        </p>

                                        {registration.nickname && (
                                            <Badge variant="secondary" className="my-2 font-normal">
                                                {registration.nickname}
                                            </Badge>
                                        )}
                                    </div>
                                    <div>
                                        <Link href={route('product-registrations.show', registration.id)}>
                                            <Button variant="secondary" className="uppercase">
                                                {' '}
                                                More info
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {productRegistrations.length > 0 && (
                    <div className="relative overflow-hidden rounded border border-sidebar-border/70 dark:border-sidebar-border">
                        <BlockContent block={registerAnotherHeadphone} />
                    </div>
                )}

                <div className="flex aspect-auto scroll-m-20 justify-between overflow-hidden p-4 text-center md:text-left">
                    <h2 className="text-xl font-semibold text-balance uppercase">Help Center </h2>
                </div>

                <div className="grid gap-6 overflow-hidden md:grid-cols-2 dark:border-sidebar-border">
                    <div className="flex aspect-auto items-center justify-between space-x-6 overflow-hidden rounded border border-sidebar-border/70 bg-card p-2 dark:border-sidebar-border">
                        <Icon iconNode={Wrench} className="h-32 w-32" />
                        <div className="w-full">
                            <h2 className="scroll-m-20 font-semibold text-balance uppercase md:text-xl">Spare parts</h2>
                            <p className="font-normal text-muted-foreground">Order genuine replacement parts for your headphone</p>
                        </div>
                    </div>

                    <div className="flex aspect-auto items-center justify-between space-x-6 overflow-hidden rounded border border-sidebar-border/70 bg-card p-2 dark:border-sidebar-border">
                        <Icon iconNode={Headset} className="h-32 w-32" />
                        <div className="w-full">
                            <h2 className="scroll-m-20 font-semibold text-balance uppercase md:text-xl">Accessories</h2>
                            <p className="font-normal text-muted-foreground">Find compatible add-ons to elevate your setup</p>
                        </div>
                    </div>

                    <div className="flex aspect-auto items-center justify-between space-x-6 overflow-hidden rounded border border-sidebar-border/70 bg-card p-2 dark:border-sidebar-border">
                        <Icon iconNode={Award} className="h-32 w-32" />
                        <div className="w-full">
                            <h2 className="scroll-m-20 font-semibold text-balance uppercase md:text-xl">Warranty</h2>
                            <p className="font-normal text-muted-foreground">Warranty terms, registration and claims process</p>
                        </div>
                    </div>

                    <div className="flex aspect-auto items-center justify-between space-x-6 overflow-hidden rounded border border-sidebar-border/70 bg-card p-2 dark:border-sidebar-border">
                        <Icon iconNode={CircleUser} className="h-32 w-32" />
                        <div className="w-full">
                            <h2 className="scroll-m-20 font-semibold text-balance uppercase md:text-xl">Support</h2>
                            <p className="font-normal text-muted-foreground">Product guides, FAQs, and contact information</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
