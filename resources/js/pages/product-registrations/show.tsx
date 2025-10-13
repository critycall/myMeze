import Heading from '@/components/heading';
import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ui/image';
import AppLayout from '@/layouts/app-layout';
import ContactSupport from '@/sections/contact-support';
import ProductCard from '@/sections/product-card';
import { BreadcrumbItem, ProductRecipeItem, ProductRegistration, ProductService } from '@/types';
import { Head } from '@inertiajs/react';
import { Hash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register a new product',
        href: '/product-registrations',
    },
];
export default function Show({ productRegistration }: { productRegistration: ProductRegistration }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-3 md:p-6">
                <Head title="Registered products" />
                <div className="flex justify-between uppercase">
                    <Heading title="Registered product" />
                </div>
                <div className="rounded bg-background md:grid md:grid-cols-3">
                    <ResponsiveImage className="h-full w-full" media={productRegistration.product.thumbnail} />
                    <div className="flex max-w-xl items-center rounded bg-background p-4 text-center md:col-span-2 md:mx-auto">
                        <div className="w-full">
                            <h2 className="my-1 mb-1 text-xl font-bold uppercase"> {productRegistration.product.name}</h2>
                            <div className="mt-1 mb-7">
                                {productRegistration.nickname && <Badge className="w-fit">{productRegistration.nickname}</Badge>}
                            </div>
                            <div className="my-5 flex justify-between border-b">
                                <p className="flex text-muted-foreground">
                                    <span>
                                        <Icon iconNode={Hash} className="h-5"></Icon>
                                    </span>
                                    <span> Serial number: </span>
                                </p>
                                <p className="font-semibold"> {productRegistration.serial_number}</p>
                            </div>

                            {!productRegistration.warranty_days && (
                                <div>
                                    <h4 className="mt-6 font-semibold md:text-lg">WARRANTY DETAILS</h4>
                                    <p className="my-3 max-w-96 text-sm">
                                        Please complete your registration details to benefit from the No Invoice Needed service and other available
                                        services.
                                    </p>
                                    <Button variant="default">COMPLETE REGISTRATION</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {productRegistration.can_extend_warranty && (
                    <div className="flex aspect-auto scroll-m-20 justify-between overflow-hidden py-4 text-center md:text-left">
                        <h1 className="text-xl font-semibold text-balance uppercase">EXTEND YOUR WARRANTY</h1>
                    </div>
                )}
                {productRegistration.can_extend_warranty && (
                    <div className="grid md:grid-cols-2">
                        {productRegistration.product.services.length > 0 &&
                            productRegistration.product.services.map((service: ProductService) => (
                                <div className="my-3 rounded bg-background p-3" key={service.id + productRegistration.product.id}>
                                    <h3 className="font-semibold">{service.name}</h3>
                                    <p>{service.price}</p>
                                    <p className="text-muted-foreground">{service.description}</p>
                                    <div>
                                        <Button variant="default"> EXTEND WARRANTY</Button>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                { productRegistration.product.latest_recipe && (
                    <div className="my-10 aspect-auto scroll-m-20 justify-between overflow-hidden text-center md:text-left">
                        <h2 className="text-xl font-semibold text-balance uppercase mb-4">SPARE PARTS</h2>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {productRegistration.product.latest_recipe.items.map((item: ProductRecipeItem) => (
                                <div key={item.id + 'recipe-item'}>
                                    <ProductCard product={item.product}></ProductCard>
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
