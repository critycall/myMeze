import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { TablePagination } from '@/components/table-pagination';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { InputSearch } from '@/components/ui/input-search';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import ManagementLayout from '@/layouts/product/layout';
import type { BreadcrumbItem, PaginatedResponse, ProductCategory } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Edit, LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product categories',
        href: '/product-categories',
    },
];
export default function Index({ productCategories, search }: { productCategories: PaginatedResponse<ProductCategory>; search: string }) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product categories" />
            <ManagementLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Product categories" description="Manage categories" />
                </div>
                <div className="w-full justify-between md:flex lg:flex-row lg:space-x-12">
                    <Form
                        options={{
                            preserveScroll: true,
                        }}
                        action={route('product-categories.index')}
                    >
                        <InputSearch name="search" defaultValue={search} placeholder={'Search'}></InputSearch>
                    </Form>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-3 md:mt-0" variant="default">
                                New Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <Form
                                options={{
                                    preserveScroll: true,
                                }}
                                method="post"
                                onSuccess={() => {
                                    setOpen(false);
                                    toast.success('Product category has been created');
                                }}
                                resetOnSuccess={['name', 'position']}
                                action={route('product-categories.store')}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>New product category</DialogTitle>
                                            <DialogDescription>Insert the name and positon (order) of the new product category</DialogDescription>
                                        </DialogHeader>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Name</Label>
                                                <Input required autoComplete="off" id="name" name="name" placeholder="TOTL Headphones" />
                                                <InputError message={errors.name} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="position">Position</Label>
                                                <Input required id="position" name="position" placeholder="1" />
                                                <InputError message={errors.position} className="mt-2" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" disabled={processing}>
                                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                                Save
                                            </Button>
                                        </DialogFooter>
                                    </>
                                )}
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-secondary uppercase">
                                <TableHead>Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="">Position</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productCategories.data.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell className="max-w-32 truncate md:max-w-60">{category.name}</TableCell>
                                    <TableCell>{category.position}</TableCell>
                                    <TableCell className="text-right">
                                        <UpdateCategoryDialog category={category} />
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button type="button" size="sm" variant="destructive">
                                                    <Trash2></Trash2>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <Form
                                                    options={{
                                                        preserveScroll: true,
                                                    }}
                                                    method="delete"
                                                    onSuccess={() => {
                                                        toast.error('Product category has been deleted', {
                                                            description: category.name + ', Position: ' + category.position,
                                                        });
                                                    }}
                                                    action={route('product-categories.destroy', category.id)}
                                                >
                                                    {({ processing }) => (
                                                        <>
                                                            <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription className="my-3">This action cannot be undone.</DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button type="button" variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <Button variant="destructive" type="submit" disabled={processing}>
                                                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                                                    Continue
                                                                </Button>
                                                            </DialogFooter>
                                                        </>
                                                    )}
                                                </Form>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <TablePagination resource={productCategories} />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <div></div>
                </div>
            </ManagementLayout>
        </AppLayout>
    );
}

function UpdateCategoryDialog({ category }: { category: ProductCategory }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mr-2" type="button" size="sm" variant="outline">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Update product category</DialogTitle>
                <DialogDescription>Modify the product category information</DialogDescription>
                <Form
                    method="patch"
                    options={{
                        preserveScroll: true,
                    }}
                    action={route('product-categories.update', category.id)}
                    onSuccess={() => {
                        toast.success('Product category has been updated');
                        setOpen(false);
                    }}
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue={category.name} type="text" name="name" autoComplete="off" autoFocus />
                                <InputError message={errors.name} />

                                <Label htmlFor="position">Position</Label>
                                <Input id="position" defaultValue={category.position} type="text" name="position" />
                                <InputError message={errors.position} />
                            </div>

                            <DialogFooter className="mt-4 gap-2">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Update
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
