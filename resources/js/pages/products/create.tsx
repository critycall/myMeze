import { Head, Form } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BreadcrumbItem } from '@/types';
import ProductLayout from '@/layouts/product/layout';
import HeadingSmall from '@/components/heading-small';

interface Option {
    id: number
    name: string
}

interface Props {
    materials: Option[]
    categories: Option[]
    groups: Option[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    }
];


export default function Create({ categories, groups }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <ProductLayout>
                <div className="space-y-6">
                    <HeadingSmall title="New product" description="Insert product informations" />
                </div>

                <div className="max-w-2xl">
                    <Form
                        method="post"
                        action={route('products.store')}
                        options={{ preserveScroll: true }}
                        className="space-y-6"
                    >
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

                                {/* EAN */}
                                <div className="grid gap-2">
                                    <Label htmlFor="ean">EAN</Label>
                                    <Input id="ean" name="ean" placeholder="EAN code" />
                                    <InputError className="mt-2" message={errors.ean} />
                                </div>

                                {/* UPC */}
                                <div className="grid gap-2">
                                    <Label htmlFor="upc">UPC</Label>
                                    <Input id="upc" name="upc" placeholder="UPC code" />
                                    <InputError className="mt-2" message={errors.upc} />
                                </div>

                                {/* MSRP */}
                                <div className="grid gap-2">
                                    <Label htmlFor="msrp">MSRP</Label>
                                    <Input id="msrp" type="number" step="0.01" name="msrp" placeholder="0.00" />
                                    <InputError className="mt-2" message={errors.msrp} />
                                </div>

                                {/* Slug */}
                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" name="slug" placeholder="unique-slug" />
                                    <InputError className="mt-2" message={errors.slug} />
                                </div>

                                {/* Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                {/* Position */}
                                <div className="grid gap-2">
                                    <Label htmlFor="position">Position</Label>
                                    <Input id="position" type="number" name="position" placeholder="1" />
                                    <InputError className="mt-2" message={errors.position} />
                                </div>

                                {/* Status */}
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select name="status" defaultValue="draft">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                            <SelectItem value="discontinued">Discontinued</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError className="mt-2" message={errors.status} />
                                </div>

                                {/* Material */}
                                <div className="grid gap-2">
                                    <Label htmlFor="material_id">Material</Label>
                                    <Input name="material_id" type="number" placeholder="Material ID" />
                                    <InputError className="mt-2" message={errors.material_id} />
                                </div>

                                {/* Category */}
                                <div className="grid gap-2">
                                    <Label htmlFor="product_category_id">Category</Label>
                                    <Select name="product_category_id">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c) => (
                                                <SelectItem key={c.id} value={String(c.id)}>
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError className="mt-2" message={errors.product_category_id} />
                                </div>

                                {/* Group */}
                                <div className="grid gap-2">
                                    <Label htmlFor="product_group_id">Group</Label>
                                    <Select name="product_group_id">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {groups.map((g) => (
                                                <SelectItem key={g.id} value={String(g.id)}>
                                                    {g.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError className="mt-2" message={errors.product_group_id} />
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
    )
}
