import { Button } from '@/components/ui/button';

import { ProductRegistration, ProductService, SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Award, CheckCircle, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import ResponsiveImage from '@/components/ui/image';
import { Icon } from '@/components/ui/icon';

export default function ServiceCard({ service, productRegistration }: { service: ProductService; productRegistration: ProductRegistration }) {
    const { auth } = usePage<SharedData>().props;

    const { post, processing } = useForm({
        item_type: 'App\\Models\\ProductService',
        item_id: service.id,
        quantity: 1,
        product_registration_id: productRegistration.id,
        price: service.price,
    });

    const handleAddToCart = () => {
        post(route('cart.add'), {
            preserveScroll: true,
            onSuccess: () => {
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
                                    <div className="flex h-18 w-18 items-center justify-center overflow-hidden rounded-lg border border-muted">
                                        <Icon iconNode={Award} className="h-14 w-14 text-primary"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-tight font-semibold text-foreground">{service.name}</span>
                                        <span className="leading-tight text-muted-foreground">{productRegistration.product.name}</span>
                                        <span className="leading-tight text-foreground">SN: {productRegistration.serial_number}</span>
                                    </div>
                                </div>
                                <div className="absolute right-2 bottom-2 text-right">
                                    <Link href={'/cart'} >
                                        <Button  className="mt-3 uppercase"> Checkout</Button>
                                    </Link>
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
