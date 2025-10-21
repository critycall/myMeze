import Heading from '@/components/heading';
import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ui/image';
import AppLayout from '@/layouts/app-layout';
import ContactSupport from '@/sections/contact-support';
import ProductCard from '@/sections/product-card';
import { BreadcrumbItem, Product, ProductRecipeItem, ProductRegistration, ProductService, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, CalendarDays, Hash, MapPin, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register a new product',
        href: '/product-registrations',
    },
];
export default function Show({ productRegistration, accessories }: { productRegistration: ProductRegistration; accessories: Product[] }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-3 md:p-6">
                <Head title="Registered products" />
                <div className="flex justify-between uppercase">
                    <Heading title="Registered product" />
                </div>
                <div className="rounded bg-card text-sm md:grid md:grid-cols-3">
                    <ResponsiveImage className="h-full w-full" media={productRegistration.product.thumbnail} />
                    <div className="flex w-full max-w-md items-center rounded p-4 text-center md:col-span-2 md:mx-auto">
                        <div className="w-full">
                            <h2 className="my-1 mb-1 text-xl font-bold uppercase"> {productRegistration.product.name}</h2>
                            <div className="mt-1 mb-7">
                                {productRegistration.nickname && <Badge className="w-fit">{productRegistration.nickname}</Badge>}
                            </div>
                            <div className="mt-5 flex justify-between border-b">
                                <p className="flex text-muted-foreground">
                                    <span>
                                        <Icon iconNode={Hash} className="h-5"></Icon>
                                    </span>
                                    <span> Serial number </span>
                                </p>
                                <p className="ml-2 font-semibold"> {productRegistration.serial_number}</p>
                            </div>

                            {!productRegistration.warranty_days && (
                                <div>
                                    <h4 className="mt-10 font-semibold md:text-lg">WARRANTY DETAILS</h4>
                                    <p className="my-3 max-w-96 text-sm">
                                        Please complete your registration details to benefit from the No Invoice Needed service and other available
                                        services.
                                    </p>
                                    <Link href={route('product-registrations.edit', productRegistration.id)}>
                                        <Button variant="default">COMPLETE REGISTRATION</Button>
                                    </Link>
                                </div>
                            )}

                            {productRegistration.warranty_days && (
                                <div>
                                    <div>
                                        <div className="mt-1 flex justify-between border-b py-1">
                                            <p className="flex text-muted-foreground">
                                                <span>
                                                    <Icon iconNode={Calendar} className="h-5"></Icon>
                                                </span>
                                                <span>Purchase date </span>
                                            </p>
                                            <p className="ml-2 font-semibold"> {productRegistration.purchase_date}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mt-1 flex justify-between border-b pt-1 pb-2">
                                            <p className="flex text-muted-foreground">
                                                <span>
                                                    <Icon iconNode={CalendarDays} className="h-5"></Icon>
                                                </span>
                                                <span>Registration date </span>
                                            </p>
                                            <p className="ml-2 font-semibold"> {productRegistration.created_at}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-1 flex justify-between border-b py-1">
                                            <p className="flex text-muted-foreground">
                                                <span>
                                                    <Icon iconNode={MapPin} className="h-5"></Icon>
                                                </span>
                                                <span>Retailer </span>
                                            </p>
                                            <p className="ml-2 font-semibold"> {productRegistration.bought_from}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-1 flex justify-between border-b py-1">
                                            <p className="flex text-muted-foreground">
                                                <span>
                                                    <Icon iconNode={Shield} className="h-5"></Icon>
                                                </span>
                                                <span>Warranty status </span>
                                            </p>
                                            {productRegistration.remaining_warranty_days > 0 ? (
                                                <Badge className="text-secondary">Warranty active</Badge>
                                            ) : (
                                                <Badge className="text-secondary" variant="destructive">
                                                    Warranty expired
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-3 rounded border bg-background px-3 py-1">
                                        <div className="flex justify-between border-b py-1">
                                            <p>Expires on</p>
                                            <span> {productRegistration.expiration_date}</span>
                                        </div>
                                        <div className="mt-1 flex justify-between py-1">
                                            <p>Days remaining</p>
                                            <span> {productRegistration.remaining_warranty_days} days</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 md:col-span-3">
                        {productRegistration.can_extend_warranty && (
                            <div className="flex aspect-auto scroll-m-20 justify-between overflow-hidden py-4 text-center md:text-left">
                                <h1 className="text-lg font-semibold text-balance uppercase">EXTEND YOUR WARRANTY</h1>
                            </div>
                        )}

                        {productRegistration.can_extend_warranty && (
                            <div className="grid gap-4 md:grid-cols-3">
                                {productRegistration.product.services.length > 0 &&
                                    productRegistration.product.services.map((service: ProductService) => (
                                        <div className="my-3 rounded border bg-background p-3" key={service.id + productRegistration.product.id}>
                                            <h3 className="font-semibold uppercase">{service.name}</h3>

                                            <p className="my-1 text-xs">{service.description}</p>
                                            <div className="flex justify-between pt-3">
                                                <p className="my-1 font-semibold">
                                                    {auth.user.currency.symbol}
                                                    {service.price}
                                                </p>
                                                <Button size="sm" variant="default" className="text-xs">
                                                    {' '}
                                                    EXTEND WARRANTY
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>

                {productRegistration.product.latest_recipe && (
                    <div className="my-10 aspect-auto scroll-m-20 justify-between overflow-hidden text-center md:text-left">
                        <h2 className="mb-4 text-xl font-semibold text-balance uppercase">SPARE PARTS</h2>

                        <div className="grid gap-4 md:grid-cols-4">
                            {productRegistration.product.latest_recipe.items.map((item: ProductRecipeItem) => (
                                <div key={item.id + 'recipe-item'}>
                                    <ProductCard product={item.product}></ProductCard>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {accessories.length > 0 && (
                    <div className="my-10 aspect-auto scroll-m-20 justify-between overflow-hidden text-center md:text-left">
                        <h2 className="mb-4 text-xl font-semibold text-balance uppercase">ACCESSORIES</h2>

                        <div className="grid gap-4 md:grid-cols-4">
                            {accessories.map((item: Product) => (
                                <div key={item.id + 'recipe-item'}>
                                    <ProductCard product={item}></ProductCard>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="my-6">
                    <ContactSupport />
                </div>
            </div>
        </AppLayout>
    );
}
