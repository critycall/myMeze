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
import type { BreadcrumbItem, PaginatedResponse, Tag } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Edit, LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tags',
        href: '/tags',
    },
];
export default function Index({ tags, search }: { tags: PaginatedResponse<Tag>; search: string }) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tags" />
            <ManagementLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Tags" description="Manage models tags" />
                </div>
                <div className="w-full justify-between md:flex lg:flex-row lg:space-x-12">
                    <Form
                        options={{
                            preserveScroll: true,
                        }}
                        action={route('tags.index')}
                    >
                        <InputSearch name="search" defaultValue={search} placeholder={'Search'}></InputSearch>
                    </Form>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-3 md:mt-0" variant="default">
                                New Tag
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
                                    toast.success('Tag has been created');
                                }}
                                resetOnSuccess={['name', 'order_column']}
                                action={route('tags.store')}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>New tag</DialogTitle>
                                            <DialogDescription>Insert the name and order of the new tag</DialogDescription>
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
                                                <Label htmlFor="order_column">Order column</Label>
                                                <Input required id="order_column" name="order_column" placeholder="1" />
                                                <InputError message={errors.order_column} className="mt-2" />
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
                                <TableHead className="">Order column</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tags.data.map((tag: Tag) => (
                                <TableRow key={tag.id}>
                                    <TableCell>{tag.id}</TableCell>
                                    <TableCell className="max-w-32 truncate md:max-w-60">{tag.name['en']}</TableCell>
                                    <TableCell>{tag.order_column}</TableCell>
                                    <TableCell className="text-right">
                                        <UpdateTagDialog tag={tag} />
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
                                                        toast.success('Tag has been deleted', {
                                                            description: tag.name['en'],
                                                        });
                                                    }}
                                                    onError={(error) => {
                                                        toast.error('Could not delete tag', {
                                                            description: error[0],
                                                        });
                                                    }}
                                                    action={route('tags.destroy', tag.id)}
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
                                    <TablePagination resource={tags} />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </ManagementLayout>
        </AppLayout>
    );
}

function UpdateTagDialog({ tag }: { tag: Tag }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mr-2" type="button" size="sm" variant="outline">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Update tag</DialogTitle>
                <DialogDescription>Modify the tag information</DialogDescription>
                <Form
                    options={{
                        preserveScroll: true,
                    }}
                    method="patch"
                    action={route('tags.update', tag.id)}
                    onSuccess={() => {
                        toast.success('Tag has been updated');
                        setOpen(false);
                    }}
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue={tag.name['en']} type="text" name="name" autoComplete="off" autoFocus />
                                <InputError message={errors.name} />

                                <Label htmlFor="order_column">Order column</Label>
                                <Input id="order_column" defaultValue={tag.order_column} type="text" name="order_column" />
                                <InputError message={errors.order_column} />
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
