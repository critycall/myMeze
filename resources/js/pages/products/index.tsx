import { TablePagination } from '@/components/table-pagination';
import { Button } from '@/components/ui/button';
import { InputSearch } from '@/components/ui/input-search';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PaginatedResponse, Product} from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { Edit, LoaderCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog,DialogTitle, DialogDescription, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import ProductLayout from '@/layouts/product/layout';
import HeadingSmall from '@/components/heading-small';

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
                    <Link href={route('products.create')}>
                        <Button className="mt-3 md:mt-0" variant="default">
                            New Product
                        </Button>
                    </Link>
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
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.position}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={ route('products.edit', product.id) }>
                                            <Button className="mr-2" type="button" size="sm" variant="outline">
                                                <Edit></Edit>
                                            </Button>
                                        </Link>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button type="button" size="sm" variant="destructive">
                                                    <Trash2></Trash2>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <Form
                                                    method="delete"
                                                    onSuccess={() => {
                                                        toast.error('Product has been deleted', {
                                                            description: product.name + ', Position: ' + product.position,
                                                        });
                                                    }}
                                                    action={route('products.destroy', product.id)}
                                                >
                                                    {({ processing }) => (
                                                        <>
                                                            <DialogContent  className="gap-2">
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription className="my-3">
                                                                    This action cannot be undone.
                                                                </DialogDescription>
                                                            </DialogContent>
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
