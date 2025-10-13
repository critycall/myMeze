import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { TablePagination } from '@/components/table-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import ManagementLayout from '@/layouts/product/layout';
import { BreadcrumbItem, Option, PaginatedResponse, ProductService } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { Edit, LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products services',
        href: '/product-services',
    },
];
export default function Index({
    productServices,
    search,
    products,
}: {
    productServices: PaginatedResponse<ProductService>;
    search: string;
    products: Option[];
}) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product services" />
            <ManagementLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Product service" description="Manage product services" />
                </div>
                <div className="w-full justify-between md:flex lg:flex-row lg:space-x-12">
                    <Form
                        options={{
                            preserveScroll: true,
                        }}
                        action={route('product-services.index')}
                    >
                        <InputSearch name="search" defaultValue={search} placeholder={'Search'}></InputSearch>
                    </Form>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-3 md:mt-0" variant="default">
                                New Service
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
                                    toast.success('Product service has been created');
                                }}
                                resetOnSuccess={['name', 'position']}
                                action={route('product-services.store')}
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <DialogHeader>
                                            <DialogTitle>New product recipe</DialogTitle>
                                            <DialogDescription> </DialogDescription>
                                        </DialogHeader>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Name</Label>
                                                <Input autoComplete="off" id="name" name="name" placeholder="1 Year extra warranty" />
                                                <InputError message={errors.name} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="product_id">Product</Label>
                                                <Select name="product_id">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a product" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {products.map((s: Option) => (
                                                            <SelectItem key={s.value} value={String(s.value)}>
                                                                {s.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>{' '}
                                                <InputError message={errors.product_id} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="price">Price</Label>
                                                <Input autoComplete="off" type="number" id="price" name="price" />
                                                <InputError message={errors.price} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="warranty_days">Warranty days</Label>
                                                <Input autoComplete="off" type="warranty_days" id="warranty_days" name="warranty_days" />
                                                <InputError message={errors.warranty_days} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="my-4 grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea className="border" id="description" name="description" placeholder="" />
                                                <InputError message={errors.description} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="my-4 grid gap-4">
                                            <Label className="flex items-start gap-3 rounded-lg border p-3 hover:bg-secondary/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-secondary dark:has-[[aria-checked=true]]:border-primary dark:has-[[aria-checked=true]]:bg-secondary">
                                                <Checkbox
                                                    id="is_active"
                                                    defaultChecked
                                                    name="is_active"
                                                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                                />
                                                <div className="grid gap-1.5 font-normal">
                                                    <p className="text-sm leading-none font-medium">Active</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Service will be available to the customers to buy
                                                    </p>
                                                </div>
                                            </Label>
                                            <InputError message={errors.is_active} className="mt-2" />
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
                                <TableHead>Name</TableHead>
                                <TableHead className="">Product</TableHead>
                                <TableHead className="">Version</TableHead>
                                <TableHead className="">Status</TableHead>
                                <TableHead className="">Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productServices.data.map((service: ProductService) => (
                                <TableRow key={service.id}>
                                    <TableCell>{service.id}</TableCell>
                                    <TableCell className="max-w-32 truncate md:max-w-60">{service.name}</TableCell>
                                    <TableCell>{service.product.name}</TableCell>
                                    <TableCell>{service.price}</TableCell>
                                    <TableCell>
                                        {service.is_active ? (
                                            <Badge> Active</Badge>
                                        ) : (
                                            <Badge className="text-secondary" variant="destructive">
                                                {' '}
                                                Inactive
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TooltipProvider key={service.id}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <p className="w-32 truncate">{service.description}</p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p> {service.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button className="mr-2" type="button" size="sm" variant="outline">
                                            <Edit />
                                        </Button>
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
                                                            description: service.name,
                                                        });
                                                    }}
                                                    onError={(error) => {
                                                        toast.error('Could not delete product recipe', {
                                                            description: error[0],
                                                        });
                                                    }}
                                                    action={route('product-services.destroy', service.id)}
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
                                <TableCell colSpan={7}>
                                    <TablePagination resource={productServices} />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </ManagementLayout>
        </AppLayout>
    );
}
