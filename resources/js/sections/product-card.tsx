import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import ResponsiveImage from '@/components/ui/image';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getVisibleTags } from '@/lib/utils';
import { Product, ProductVariant, SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: Product }) {
    const { auth } = usePage<SharedData>().props;
    const [open, setOpen] = useState(false);

    const firstVariant = product.variants?.[0] || null;
    const [selectedVariant, setSelectedVariant] = useState(firstVariant);

    const { data, setData, post, processing } = useForm({
        item_type: 'App\\Models\\Product',
        item_id: product.id,
        variant_id: firstVariant ? firstVariant.id : null,
        quantity: 1,
        price: firstVariant ? firstVariant.price : product.msrp,
    });

    const handleVariantChange = (variantId: string) => {
        const variant = product.variants.find((v: ProductVariant) => String(v.id) === variantId);
        if (variant) {
            setSelectedVariant(variant);
            setData({
                ...data,
                variant_id: variant.id,
                price: variant.price,
            });
        }
    };

    const handleAddToCart = () => {
        post(route('cart.add'), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                toast(
                    <div className="flex items-center gap-2 text-green-900">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium text-green-900">Added to your cart!</span>
                    </div>,
                    {
                        duration: 4000,
                        className: 'border border-emerald-200 shadow-md rounded-xl p-3 dark:bg-neutral-900 dark:border-emerald-700',
                        description: (
                            <div>
                                <div className="mt-2 flex items-center gap-3 mb-6">
                                    <div className="flex h-18 w-18 items-center justify-center overflow-hidden rounded-lg border border-muted dark:bg-neutral-800">
                                        <ResponsiveImage className="object-contain" media={product.thumbnail} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-tight font-semibold text-foreground">{product.name}</span>
                                        {selectedVariant && <span className="text-sm text-muted-foreground">{selectedVariant.name}</span>}
                                        <span className="mt-1 text-sm font-medium text-primary">
                                        {auth.user.currency.symbol}
                                            {Math.round(selectedVariant?.price ?? product.msrp)}
                                    </span>
                                    </div>
                                </div>
                              <div className="absolute right-2 bottom-2 text-right">
                                  <Link href={'/cart'} >
                                      <Button size="sm" className="mt-3 uppercase text-xs"> Checkout</Button>
                                  </Link>
                              </div>
                            </div>
                        ),
                    },
                );
            },
        });
    };

    return (
        <div className="items-center justify-between rounded bg-card text-center">
            <div className="text-center">
                <div className="flex aspect-[1/1] items-center overflow-hidden rounded-lg">
                    <ResponsiveImage className="max-h-full max-w-full object-contain object-center" media={product.thumbnail} />
                </div>
                <h4 className="md:text-md my-3 text-sm font-semibold">{product.name}</h4>
            </div>

            {product.tags && product.tags.length > 0 && (
                <div className="flex flex-grow flex-wrap justify-center gap-1">
                    {getVisibleTags(product.tags).map((tag) => (
                        <div key={tag.id} className="w-fit">
                            <Badge variant="outline">
                                <div>{tag.name['en']}</div>
                            </Badge>
                        </div>
                    ))}
                </div>
            )}

            <div className="mx-2 flex items-center justify-between p-3">
                <div className="font-semibold">
                    {product.variants && product.variants.length > 0 && <span className="mr-2">From</span>}
                    {auth.user.currency.symbol} {product.msrp}
                </div>
                {product.variants && product.variants.length > 0 && (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            <Button onClick={(e) => e.currentTarget.blur()}>ADD TO CART</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full md:max-w-xl">
                                <DrawerHeader>
                                    <div className="flex text-left">
                                        <div className="flex aspect-[1/1] min-w-18 items-center overflow-hidden rounded-lg">
                                            <ResponsiveImage
                                                className="max-h-full max-w-full object-contain object-center"
                                                media={product.thumbnail}
                                            />
                                        </div>
                                        <div>
                                            <DrawerTitle>{product.name}</DrawerTitle>
                                            <div className="text-lg text-muted-foreground">
                                                {auth.user.currency.symbol} {Math.round(selectedVariant.price)}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="my-2 flex">
                                        <DrawerTitle className="text-sm">
                                            <span className="mr-2 font-normal">{product.variants[0]['option']}:</span>
                                            {selectedVariant.name}
                                        </DrawerTitle>
                                    </div>
                                    <DrawerDescription asChild>

                                        <RadioGroup
                                            className="space-y w-full"
                                            defaultValue={String(selectedVariant.id)}
                                            onValueChange={handleVariantChange}
                                        >
                                            {product.variants.map(({ id, name }: ProductVariant) => {
                                                const descriptionId = `${id}-description`;

                                                return (
                                                    <div key={'variant-picker'+id} className='border-input has-data-[state=checked]:border-primary/70 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative w-full rounded-md border p-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]'>

                                                    <RadioGroupItem
                                                            value={String(id)}
                                                            id={String(id)}
                                                            className="sr-only"
                                                            aria-label={name}
                                                            aria-describedby={descriptionId}
                                                        />

                                                        <Label
                                                            htmlFor={String(id)}
                                                            className="flex flex-col items-start text-foreground after:absolute after:inset-0"
                                                        >
                                                            <div className="flex w-full items-center justify-between">
                                                                <span className="text-xs">{name}</span>
                                                            </div>
                                                        </Label>
                                                    </div>
                                                );
                                            })}
                                        </RadioGroup>
                                    </DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 pb-0"></div>
                                <DrawerFooter>
                                    <Button type={'button'} onClick={handleAddToCart} size="sm" disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        ADD TO CART
                                    </Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                )}

                {(!product.variants || product.variants.length === 0) && (
                    <Button type={'button'} onClick={handleAddToCart} size="sm" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        ADD TO CART
                    </Button>
                )}
            </div>
        </div>
    );
}
