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
import ProductLayout from '@/layouts/product/layout';
import { BreadcrumbItem, Option, PaginatedResponse, ProductRecipe } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { Edit, LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products recipes',
        href: '/product-recipes',
    },
];
export default function Index({
    productRecipes,
    search,
    products,
}: {
    productRecipes: PaginatedResponse<ProductRecipe>;
    search: string;
    products: Option[];
}) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product recipes" />
            <ProductLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Product recipes" description="Manage product recipes" />
                </div>
                <div className="w-full justify-between md:flex lg:flex-row lg:space-x-12">
                    <Form
                        options={{
                            preserveScroll: true,
                        }}
                        action={route('product-recipes.index')}
                    >
                        <InputSearch name="search" defaultValue={search} placeholder={'Search'}></InputSearch>
                    </Form>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="mt-3 md:mt-0" variant="default">
                                New Recipe
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
                                    toast.success('Product recipe has been created');
                                }}
                                resetOnSuccess={['name', 'position']}
                                action={route('product-recipes.store')}
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
                                                <Input autoComplete="off" id="name" name="name" placeholder="109 Series" />
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
                                                <Label htmlFor="name">Version</Label>
                                                <Input autoComplete="off" id="version" name="version" placeholder="1,2,3 ..." />
                                                <InputError message={errors.version} className="mt-2" />
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
                                                        Recipe will be shown in product information
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
                            {productRecipes.data.map((recipe: ProductRecipe) => (
                                <TableRow key={recipe.id}>
                                    <TableCell>{recipe.id}</TableCell>
                                    <TableCell className="max-w-32 truncate md:max-w-60">{recipe.name}</TableCell>
                                    <TableCell>{recipe.product.name}</TableCell>
                                    <TableCell>{recipe.version}</TableCell>
                                    <TableCell>
                                        {recipe.is_active ? (
                                            <Badge> Active</Badge>
                                        ) : (
                                            <Badge className="text-secondary" variant="destructive">
                                                {' '}
                                                Inactive
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TooltipProvider key={recipe.id}>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <p className="w-32 truncate">{recipe.description}</p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p> {recipe.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('product-recipes.edit', recipe.id)}>
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
                                                            description: recipe.name + ', Position: ' + recipe.version,
                                                        });
                                                    }}
                                                    onError={(error) => {
                                                        toast.error('Could not delete product recipe', {
                                                            description: error[0],
                                                        });
                                                    }}
                                                    action={route('product-recipes.destroy', recipe.id)}
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
                                    <TablePagination resource={productRecipes} />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </ProductLayout>
        </AppLayout>
    );
}
