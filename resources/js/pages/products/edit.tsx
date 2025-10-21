import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import RichEditor from '@/components/ui/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SortableGallery from '@/components/ui/media-galery';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Thumbnail } from '@/components/ui/thumbnail';
import AppLayout from '@/layouts/app-layout';
import ManagementLayout from '@/layouts/product/layout';
import { BreadcrumbItem, Option, Product, ProductVariant } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { MultiSelect } from '@/components/ui/multi-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function EditProduct({
    product,
    categories,
    groups,
    statuses,
    tags
}: {
    product: Product;
    categories: Option[];
    groups: Option[];
    statuses: Option[];
    tags: Option[];
}) {
    const [variants, setVariants] = useState<number[]>([]);

    const addVariant = () => {
        setVariants((prev) => [...prev, prev.length]); // append new index
    };

    const removeVariant = (index: number) => {
        setVariants((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Update ${product.name}`} />
            <ManagementLayout>
                <Form
                    method="POST"
                    onSuccess={() => {
                        toast.success('Product has been successfully updated', {
                            description: `${product.name}, Status: ${product.status.charAt(0).toUpperCase() + product.status.slice(1)}`,
                        });
                        setVariants([]);
                    }}
                    resetOnSuccess={['media_files[]']}
                    action={route('products.update', product.id)}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="_method" value="PUT" />
                            <div className="max-w-3xl justify-between space-y-6 md:flex">
                                <div className="flex space-x-2">
                                    <Thumbnail media={product.thumbnail} name={product.name} className="h-10 w-10 rounded-xl" />
                                    <HeadingSmall title={product.name} description="Update product information" />
                                </div>
                                <div className="grid min-w-40 gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select name="status" defaultValue={product.status}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statuses.map((s: Option) => (
                                                <SelectItem key={s.value} value={String(s.value)}>
                                                    {s.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError className="mt-2" message={errors.status} />
                                </div>
                            </div>

                            <div className="max-w-3xl space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="media_files">Add media</Label>
                                    <Input accept="image/*" type="file" name="media_files[]" multiple />
                                    <InputError className="mt-2" message={errors.media_files} />
                                    {Object.keys(errors)
                                        .filter((key) => key.startsWith('media_files.'))
                                        .map((key) => (
                                            <InputError key={key} className="mt-2" message={errors[key]} />
                                        ))}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="media_files">Media gallery</Label>
                                    <SortableGallery initialImages={product.gallery} name="media_order"></SortableGallery>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <RichEditor name="description" value={product.description} />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Tags</Label>
                                    <MultiSelect name="tags" options={tags} defaultValue={product.tags.map(tag => tag.name['en'])}/>
                                    <InputError className="mt-2" message={errors.description} />
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input id="sku" name="sku" defaultValue={product.sku} placeholder="SKU" />
                                    <InputError className="mt-2" message={errors.sku} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" defaultValue={product.name} placeholder="Product name" />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="position">Position</Label>
                                    <Input id="position" type="number" name="position" placeholder="ex: 1, 2 ..." defaultValue={product.position} />
                                    <InputError className="mt-2" message={errors.position} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="eu_warranty_days">EU Warranty Days</Label>
                                    <Input id="eu_warranty_days" type="number" name="eu_warranty_days" placeholder="ex: 730" defaultValue={product.eu_warranty_days} />
                                    <InputError className="mt-2" message={errors.eu_warranty_days} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="non_eu_warranty_days">NON-EU Warranty Days</Label>
                                    <Input id="non_eu_warranty_days" type="number" name="non_eu_warranty_days" placeholder="ex: 365" defaultValue={product.non_eu_warranty_days} />
                                    <InputError className="mt-2" message={errors.non_eu_warranty_days} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="ean">EAN</Label>
                                    <Input id="ean" name="ean" defaultValue={product.ean} placeholder="EAN code" />
                                    <InputError className="mt-2" message={errors.ean} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="upc">UPC</Label>
                                    <Input id="upc" name="upc" defaultValue={product.upc} placeholder="UPC code" />
                                    <InputError className="mt-2" message={errors.upc} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="msrp">MSRP</Label>
                                    <Input id="msrp" type="number" defaultValue={product.msrp} step="0.01" name="msrp" placeholder="0.00" />
                                    <InputError className="mt-2" message={errors.msrp} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="material_id">Material ID</Label>
                                    <Input name="material_id" type="number" placeholder="Material ID" defaultValue={product.material_id} />
                                    <InputError className="mt-2" message={errors.material_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="product_category_id">Category</Label>
                                    <Select
                                        name="product_category_id"
                                        defaultValue={product.product_category_id ? String(product.product_category_id) : undefined}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c: Option) => (
                                                <SelectItem key={c.value} value={String(c.value)}>
                                                    {c.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError className="mt-2" message={errors.product_category_id} />
                                </div>

                                {/* Group */}
                                <div className="grid gap-2">
                                    <Label htmlFor="product_group_id">Group</Label>
                                    <Select
                                        name="product_group_id"
                                        defaultValue={product.product_group_id ? String(product.product_group_id) : undefined}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {groups.map((g: Option) => (
                                                <SelectItem key={g.value} value={String(g.value)}>
                                                    {g.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError className="mt-2" message={errors.product_group_id} />
                                </div>

                                <div className="min-h-32 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-lg font-semibold">Variants</Label>
                                        <Button type="button" variant="outline" onClick={addVariant}>
                                            + Add Variant
                                        </Button>
                                    </div>

                                    {product.variants.length > 0 && (
                                        <div>
                                            {product.variants.map((variant: ProductVariant) => (
                                                <div className="rounded border bg-background p-3" key={variant.id}>
                                                    <p>
                                                        Option:<span className="font-semibold"> {variant.option}</span>
                                                    </p>
                                                    <p>
                                                        Name:<span className="">  {variant.name}</span>
                                                    </p>
                                                    <p></p>
                                                    <p>
                                                        SKU:<span className="text-muted-foreground"> {variant.sku}</span>
                                                    </p>
                                                    <p>
                                                        Price:<span className="text-muted-foreground"> {variant.price}</span>
                                                    </p>
                                                    <p>
                                                        Material Id:<span className="text-muted-foreground"> {variant.material_id}</span>
                                                    </p>
                                                    <div className="flex justify-end">
                                                        <Button className="mr-2" type="button" size="sm" variant="outline">
                                                            <Edit />
                                                        </Button>
                                                        <Button type="button" size="sm" variant="destructive">
                                                            <Trash2></Trash2>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {variants.map((index) => (
                                        <div key={index} className="space-y-4 rounded-lg border p-4">
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label>SKU</Label>
                                                    <Input autoComplete="off" name={`newVariants[${index}][sku]`} placeholder="SKU" />
                                                    <InputError message={errors[`newVariants.${index}.sku`]} />
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label>Name</Label>
                                                    <Input autoComplete="off" name={`newVariants[${index}][name]`} placeholder="Variant name" />
                                                    <InputError message={errors[`newVariants.${index}.name`]} />

                                                </div>

                                                <div className="grid gap-2">
                                                    <Label>Option</Label>
                                                    <Input name={`newVariants[${index}][option]`} placeholder="Color / Size / Type" />
                                                    <InputError message={errors[`newVariants.${index}.option`]} />
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label>Price</Label>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        autoComplete="off"
                                                        name={`newVariants[${index}][price]`}
                                                        placeholder="0.00"
                                                    />
                                                    <InputError message={errors[`newVariants.${index}.price`]} />
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label>Material ID</Label>
                                                    <Input name={`newVariants[${index}][material_id]`} placeholder="Material ID" />
                                                    <InputError message={errors[`newVariants.${index}.material_id`]} />
                                                </div>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="text-sm text-muted-foreground"
                                                onClick={() => removeVariant(index)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>Save</Button>
                                </div>
                            </div>
                        </>
                    )}
                </Form>
            </ManagementLayout>
        </AppLayout>
    );
}
