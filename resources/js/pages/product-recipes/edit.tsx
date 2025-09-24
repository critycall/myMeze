import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import ProductLayout from '@/layouts/product/layout';
import { BreadcrumbItem, Option, ProductRecipe, ProductRecipeItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products recipes',
        href: '/product-recipes',
    },
];
export default function Edit({ recipe, products }: { recipe: ProductRecipe; products: Option[] }) {
    const [open, setOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product groups" />
            <ProductLayout>
                <div className="max-w-3xl">
                    <div className="flex justify-between">
                        <HeadingSmall title={recipe.name} description="Update recipe details" />
                        <div>
                            {recipe.is_active ? (
                                <Badge> Active</Badge>
                            ) : (
                                <Badge className="text-secondary" variant="destructive">
                                    Inactive
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className="mt-2">
                        <Form
                            options={{
                                preserveScroll: true,
                                preserveState: false,
                            }}
                            method="PATCH"
                            onSuccess={() => {
                                setOpen(false);
                                toast.success('Product recipe has been updated successfully.');
                            }}
                            resetOnSuccess
                            action={route('product-recipes.update', recipe.id)}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Product</Label>
                                        <Input
                                            defaultValue={recipe.product.name}
                                            disabled={true}
                                            type="text"
                                            autoComplete="off"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.name} />

                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            defaultValue={recipe.name}
                                            type="text"
                                            name="name"
                                            autoComplete="off"
                                            className="mt-1 block w-full"
                                        />
                                        <InputError message={errors.name} />

                                        <Label htmlFor="version">Version</Label>
                                        <Input id="version" defaultValue={recipe.version} type="text" name="version" className="mt-1 block w-full" />
                                        <InputError message={errors.version} />

                                        <Label htmlFor="position">Details</Label>
                                        <Textarea
                                            defaultValue={recipe.description}
                                            id="description"
                                            name="description"
                                            className="mt-1 block w-full border"
                                        />
                                        <InputError message={errors.description} className="mt-2" />

                                        <Label className="flex items-start gap-3 rounded-lg border p-3 hover:bg-secondary/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-secondary dark:has-[[aria-checked=true]]:border-primary dark:has-[[aria-checked=true]]:bg-secondary">
                                            <Checkbox
                                                id="is_active"
                                                defaultChecked={recipe.is_active}
                                                name="is_active"
                                                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            />
                                            <div className="grid gap-1.5 font-normal">
                                                <p className="text-sm leading-none font-medium">Active</p>
                                                <p className="text-sm text-muted-foreground">Recipe will be shown in product information</p>
                                            </div>
                                        </Label>
                                        <InputError message={errors.is_active} className="mt-2" />
                                    </div>

                                    <Button type="submit">
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Update recipe
                                    </Button>
                                </>
                            )}
                        </Form>
                    </div>
                </div>

                <div className="pt-6 max-w-3xl">
                    <HeadingSmall title="Recipe items" description="Add or remove product items" />
                    <div className="w-full overflow-auto border mt-2">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-secondary uppercase">
                                    <TableHead className="">Product</TableHead>
                                    <TableHead className="">Quantity</TableHead>
                                    <TableHead className="">Position</TableHead>
                                    <TableHead className="">Description</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recipe.items.map((item: ProductRecipeItem) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.quantity} {item.uom}</TableCell>
                                        <TableCell>{item.position}</TableCell>
                                        <TableCell>
                                            <TooltipProvider key={recipe.id}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <p className="w-32 truncate">{item.details}</p>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p> {item.details}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                        <TableCell className="text-right">
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
                                                            toast.success('Recipe item has been deleted', {
                                                                description: item.product.name + ', Position: ' + recipe.version,
                                                            });
                                                        }}

                                                        action={route('product-recipes.items.destroy', [recipe.id, item.id])}
                                                    >
                                                        {({ processing }) => (
                                                            <>
                                                                <DialogHeader>
                                                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                    <DialogDescription className="my-3">
                                                                        This action cannot be undone.
                                                                    </DialogDescription>
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
                        </Table>
                    </div>
                   <div>
                       <Dialog open={open} onOpenChange={setOpen}>
                           <DialogTrigger asChild>
                               <div className="mt-6">
                                   <Button className="mt-3 md:mt-0" variant="default">
                                       Add item
                                   </Button>
                               </div>
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
                                   action={route('product-recipes.items.store', recipe.id)}
                               >
                                   {({ processing, errors }) => (
                                       <>
                                           <DialogHeader>
                                               <DialogTitle>New recipe item</DialogTitle>
                                               <DialogDescription>Add a new recipe item to the recipe</DialogDescription>
                                           </DialogHeader>
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
                                                   <Label htmlFor="quantity">Quantity</Label>
                                                   <Input required autoComplete="off" id="quantity" name="quantity" placeholder="ex: 1,2,3 ..." />
                                                   <InputError message={errors.quantity} className="mt-2" />
                                               </div>
                                           </div>
                                           <div className="my-4 grid gap-4">
                                               <div className="grid gap-3">
                                                   <Label htmlFor="position">Position</Label>
                                                   <Input required autoComplete="off" id="position" name="position" placeholder="1,2,3 ..." />
                                                   <InputError message={errors.position} className="mt-2" />
                                               </div>
                                           </div>
                                           <div className="my-4 grid gap-4">
                                               <div className="grid gap-3">
                                                   <Label htmlFor="position">Details</Label>
                                                   <Textarea className="border" id="details" name="details" placeholder="" />
                                                   <InputError message={errors.details} className="mt-2" />
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
                </div>
            </ProductLayout>
        </AppLayout>
    );
}
