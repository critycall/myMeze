import { Button } from '@/components/ui/button';

import { ProductRegistration, ProductService, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ServiceCard({ service, productRegistration }: { service: ProductService; productRegistration: string }) {
    const { auth } = usePage<SharedData>().props;

    const { post, processing } = useForm({
        item_type: 'App\\Models\\ProductService',
        item_id: service.id,
        quantity: 1,
        product_registration_id: productRegistration,
        price: service.price,
    });

    const handleAddToCart = () => {
        post(route('cart.add'), {
            preserveScroll: true,
            onSuccess: () => {
                toast(
                    <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium text-green-600">Added to your cart!</span>
                    </div>,
                    {
                        duration: 4000,
                        className: 'border border-emerald-200 shadow-md rounded-xl p-3 dark:bg-neutral-900 dark:border-emerald-700',
                        description: (
                            <div className="mt-2 flex items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-muted dark:bg-neutral-800">
                                    {/*<ResponsiveImage className="object-contain" media={service.product.thumbnail} />*/}
                                </div>
                                <div className="flex flex-col text-sm">
                                    <span className="leading-tight font-semibold text-foreground">{service.name}</span>
                                </div>
                            </div>
                        ),
                    },
                );
            },
            onError: (er ) => {
                toast.error(er[0]);
            }
        });
    };

    return (
        <div className="justify-between rounded bg-card p-3">
            <div className="">
                {/*<div className="flex aspect-[1/1] items-center overflow-hidden rounded-lg">*/}
                {/*    <ResponsiveImage className="max-h-full max-w-full object-contain object-center" media={service.product.thumbnail} />*/}
                {/*</div>*/}
                <h4 className="md:text-md my-3 text-sm font-semibold">{service.name}</h4>
                <p className="md:text-md my-3 text-xs">{service.description}</p>
            </div>

            <div className="flex justify-between">
                <div className="font-semibold">
                    {auth.user.currency.symbol} {service.price}
                </div>
                <Button type={'button'} onClick={handleAddToCart} size="sm" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    ADD TO CART
                </Button>
            </div>
        </div>
    );
}
