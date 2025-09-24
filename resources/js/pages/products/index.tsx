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
import ProductLayout from '@/layouts/product/layout';
import { BreadcrumbItem, PaginatedResponse, Product } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { Edit, LoaderCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: route('products.index'),
    },
];
export default function Index({ products, search }: { products: PaginatedResponse<Product>; search: string }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <ProductLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Products" description="Manage products" />
                </div>
                <div className="w-full justify-between md:flex lg:flex-row lg:space-x-12">
                    <Form action={route('products.index')}>
                        <InputSearch name="search" defaultValue={search} placeholder={'Search'}></InputSearch>
                    </Form>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="mt-3 md:mt-0" variant="default">
                                New Product
                            </Button>
                        </DialogTrigger>


                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create new product</DialogTitle>
                                <DialogDescription>Complete information will be available in the next step</DialogDescription>
                            </DialogHeader>
                            <Form method="post" action={route('products.store')} options={{ preserveScroll: true }} className="space-y-6">
                                {({ processing, errors }) => (
                                    <>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="sku">SKU</Label>
                                                <Input id="sku" name="sku" placeholder="SKU" />
                                                <InputError className="mt-2" message={errors.sku} />
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" name="name" placeholder="Product name" />
                                                <InputError className="mt-2" message={errors.name} />
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
                            {products.data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell className="max-w-32 truncate md:max-w-60">{product.name}</TableCell>
                                    <TableCell>{product.position}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('products.edit', product.id)}>
                                            <Button className="mr-2" type="button" size="sm" variant="outline">
                                                <Edit></Edit>
                                            </Button>
                                        </Link>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button type="button" size="sm" variant="destructive">
                                                    <Trash2 />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <Form
                                                    method="delete"
                                                    onSuccess={() => {
                                                        toast.error("Product has been deleted", {
                                                            description: product.name,
                                                        });
                                                    }}
                                                    action={route("products.destroy", product.id)}
                                                >
                                                    {({ processing }) => (
                                                        <>
                                                            {/* ✅ use DialogHeader instead of nested DialogContent */}
                                                            <div className="gap-2">
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription className="my-3">
                                                                    This action cannot be undone.
                                                                </DialogDescription>
                                                            </div>

                                                            <DialogFooter className="gap-2">
                                                                <DialogClose>Cancel</DialogClose>
                                                                <Button variant="destructive" type="submit">
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
                                    <TablePagination resource={products} />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <div></div>
                </div>
            </ProductLayout>
        </AppLayout>
    );
}
