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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import ManagementLayout from '@/layouts/product/layout';
import { BreadcrumbItem, ContentBlock, PaginatedResponse } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { Edit, LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Content block',
        href: '/content-blocks',
    },
];
export default function Index({ contentBlocks, search }: { contentBlocks: PaginatedResponse<ContentBlock>; search: string }) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Content blocks" />
            <ManagementLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Content blocks" description="Manage montent blocks" />
                </div>
                <div className="w-full justify-between md:flex lg:flex-row lg:space-x-12">
                    <Form
                        options={{
                            preserveScroll: true,
                        }}
                        action={route('content-blocks.index')}
                    >
                        <InputSearch name="search" defaultValue={search} placeholder={'Search'}></InputSearch>
                    </Form>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-3 md:mt-0" variant="default">
                                New Block
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
                                    toast.success('Content block has been created');
                                }}
                                resetOnSuccess={['name', 'position']}
                                action={route('content-blocks.store')}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>New content block</DialogTitle>
                                            <DialogDescription> </DialogDescription>
                                        </DialogHeader>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="title">Title</Label>
                                                <Input autoComplete="off" id="title" name="title" placeholder="Register your first Headphone" />
                                                <InputError message={errors.title} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="key">Key</Label>
                                                <Input autoComplete="off" id="key" name="key" placeholder="register-first-headpohone" />
                                                <InputError message={errors.key} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea className="border" id="description" name="description" placeholder="" />
                                                <InputError message={errors.description} className="mt-2" />
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
                <div className="w-full overflow-auto border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-secondary uppercase">
                                <TableHead>Id</TableHead>
                                <TableHead>Key</TableHead>
                                <TableHead className="">Title</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contentBlocks.data.map((block: ContentBlock) => (
                                <TableRow key={block.id}>
                                    <TableCell>{block.id}</TableCell>
                                    <TableCell className="max-w-32 truncate md:max-w-60">{block.key}</TableCell>
                                    <TableCell>{block.title}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('content-blocks.edit', block.id)}>
                                            <Button className="mr-2" type="button" size="sm" variant="outline">
                                                <Edit />
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
                                                    options={{
                                                        preserveScroll: true,
                                                    }}
                                                    method="delete"
                                                    onSuccess={() => {
                                                        toast.success('Product recipe has been deleted', {
                                                            description: block.title + ', Key: ' + block.key,
                                                        });
                                                    }}
                                                    onError={(error) => {
                                                        toast.error('Could not delete product recipe', {
                                                            description: error[0],
                                                        });
                                                    }}
                                                    action={route('content-blocks.destroy', block.id)}
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
                                <TableCell colSpan={7}>
                                    <TablePagination resource={contentBlocks} />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </ManagementLayout>
        </AppLayout>
    );
}
