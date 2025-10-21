import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Product } from '@/types';
import { Form, Head } from '@inertiajs/react';

import Heading from '@/components/heading';
import { InputSearch } from '@/components/ui/input-search';
import ProductCard from '@/sections/product-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('products.index'),
    },
];
export default function Collection({
    products,
    search,
    title,
    description,
}: {
    products: Product[];
    search: string;
    title: string;
    description: string;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-3 md:p-6">
                <div className="my-6 md:my-0 text-center md:text-left" >
                    <Heading title={title} description={description} />
                </div>

                <div className="grid w-full gap-2 md:gap-4 md:grid-cols-4">
                    <Form action="#" className="col-span-3 md:col-span-1">
                        <InputSearch name="search" defaultValue={search} placeholder={'Search'}></InputSearch>
                    </Form>
                </div>

                <div>
                    <div className="grid gap-4 md:grid-cols-3 mt-3">
                        {products.map((item: Product) => (
                            <div key={item.id + 'recipe-item'}>
                                <ProductCard product={item}></ProductCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
