import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ProductLayout from '@/layouts/product/layout';
import { BreadcrumbItem, } from '@/types';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <ProductLayout>
                <div className="space-y-6">
                    <HeadingSmall title="New product" description="Insert product informations" />
                </div>

                <div className="max-w-2xl">
                    <Form method="post" action={route('products.store')} options={{ preserveScroll: true }} className="space-y-6">
                        {({ processing, errors }) => (

                            <>
                                {/* SKU */}
                                <div className="grid gap-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input id="sku" name="sku" placeholder="SKU" />
                                    <InputError className="mt-2" message={errors.sku} />
                                </div>

                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" placeholder="Product name" />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>


                                {/* Actions */}
                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Save</Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </ProductLayout>
        </AppLayout>
    );
}
