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
import type { BreadcrumbItem, PaginatedResponse, ProductGroup } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Edit, LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products groups',
        href: '/product-groups',
    },
];
export default function Index({ productGroups, search }: { productGroups: PaginatedResponse<ProductGroup>; search: string }) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product groups" />
            <ProductLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Product groups" description="Manage product groups" />
                </div>
                <div className="w-full justify-between md:flex lg:flex-row lg:space-x-12">
                    <Form
                        options={{
                            preserveScroll: true,
                        }}
                        action={route('product-groups.index')}
                    >
                        <InputSearch name="search" defaultValue={search} placeholder={'Search'}></InputSearch>
                    </Form>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-3 md:mt-0" variant="default">
                                New Group
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
                                    toast.success('Product group has been created');
                                }}
                                resetOnSuccess={['name', 'position']}
                                action={route('product-groups.store')}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>New product group</DialogTitle>
                                            <DialogDescription>Insert the name and positon (order) of the new product group</DialogDescription>
                                        </DialogHeader>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Name</Label>
                                                <Input required autoComplete="off" id="name" name="name" placeholder="109 Series" />
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
                            {productGroups.data.map((group) => (
                                <TableRow key={group.id}>
                                    <TableCell>{group.id}</TableCell>
                                    <TableCell className="max-w-32 truncate md:max-w-60">{group.name}</TableCell>
                                    <TableCell>{group.position}</TableCell>
                                    <TableCell className="text-right">
                                        <UpdateGroupDialog group={group} />
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
                                                        toast.success('Product group has been deleted', {
                                                            description: group.name + ', Position: ' + group.position,
                                                        });
                                                    }}
                                                    onError={(error) => {
                                                        toast.error('Could not delete product group', {
                                                            description: error[0],
                                                        });
                                                    }}
                                                    action={route('product-groups.destroy', group.id)}
                                                >
                                                    {({ processing }) => (
                                                        <>
                                                            <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription className="my-3">This action cannot be undone.</DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button type="button" variant="outline">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
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
                                    <TablePagination resource={productGroups} />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </ProductLayout>
        </AppLayout>
    );
}

function UpdateGroupDialog({ group }: { group: ProductGroup }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mr-2" type="button" size="sm" variant="outline">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Update product group</DialogTitle>
                <DialogDescription>Modify the product group information</DialogDescription>
                <Form
                    options={{
                        preserveScroll: true,
                    }}
                    method="patch"
                    action={route('product-groups.update', group.id)}
                    onSuccess={() => {
                        toast.success('Product group has been updated');
                        setOpen(false);
                    }}
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue={group.name} type="text" name="name" autoComplete="off" autoFocus />
                                <InputError message={errors.name} />

                                <Label htmlFor="position">Position</Label>
                                <Input id="position" defaultValue={group.position} type="text" name="position" />
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
