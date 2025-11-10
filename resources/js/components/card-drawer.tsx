import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Auth } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Award, ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CartSheet() {
    const { auth, sharedCart } = usePage().props as unknown as {
        auth: Auth;
        sharedCart: { count: number };
    };

    const [open, setOpen] = useState(false);

    const [cart, setCart] = useState<{ items: any[]; subtotal: number }>({
        items: [],
        subtotal: 0,
    });

    const fetchCart = async () => {
        try {
            const res = await axios.get(route('cart.data'));
            setCart({
                items: res.data.items,
                subtotal: res.data.subtotal,
            });
        } catch (err) {
            console.error('Failed to fetch cart', err);
        }
    };

    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity < 1 || isNaN(quantity)) return;
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await axios.put(route('cart.item.update', id), { quantity });

                setCart({
                    items: res.data.items,
                    subtotal: res.data.subtotal,
                });

                router.reload({ only: ['sharedCart'] });
            } catch (error) {
                console.error('❌ Failed to update item quantity:', error);
            }
        }, 400);
    };

    useEffect(() => {
        if (open) fetchCart();
    }, [open]);

    const handleRemove = async (id: number) => {
        try {
            const res = await axios.delete(route('cart.item.remove', id));

            setCart({
                items: res.data.items,
                subtotal: res.data.subtotal,
            });

            router.reload({ only: ['sharedCart'] });
        } catch (error) {
            console.error('❌ Failed to remove item:', error);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* 🛒 Trigger button */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {sharedCart?.count > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#5A583A] text-[10px] text-white">
                            {sharedCart.count}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            {/* 🧾 Drawer content */}
            <SheetContent side="right" className="w-full bg-transparent">
                <div className="flex h-full flex-col bg-card">
                    <SheetHeader className="px-6 pt-6">
                        <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
                            Cart
                            {sharedCart?.count > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5A583A] text-xs text-white">
                                    {sharedCart.count}
                                </span>
                            )}
                        </SheetTitle>
                        <SheetDescription className="mt-1 text-sm text-[#5A583A]">You are eligible for free shipping.</SheetDescription>
                    </SheetHeader>

                    <div className="mx-6 my-4 border-b"></div>

                    {/* 🧩 Cart items */}
                    <div className="flex-1 space-y-6 overflow-y-auto px-6">
                        {cart.items.length === 0 ? (
                            <div className="mt-10 text-center text-muted-foreground">Your cart is empty.</div>
                        ) : (
                            cart.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        {item.thumbnail && (
                                            <div className="flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-md">
                                                <ResponsiveImage className="h-full w-full object-contain" media={item.thumbnail} />
                                            </div>
                                        )}
                                        {!item.thumbnail && <Award className="h-14 w-18"></Award>}
                                        <div>
                                            <div className="text-sm font-semibold tracking-wide uppercase">{item.name}</div>
                                            {item.product_registration && (
                                                <div className="text-sm tracking-wide uppercase">{item.product_registration.product.name}</div>
                                            )}
                                            {item.variant && <div className="text-xs tracking-wide uppercase">{item.variant.name}</div>}
                                            {item.product_registration && (
                                                <div className="text-xs font-semibold tracking-wide uppercase">
                                                    SN: {item.product_registration.serial_number}
                                                </div>
                                            )}
                                            <div className="mt-1 text-sm">
                                                {auth.user.currency.symbol}
                                                {(item.quantity * item.price).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end text-sm">
                                        <div className="flex items-center gap-1">
                                            <Input
                                                className="no-spinners w-12 rounded border border-input text-center text-xs"
                                                type="number"
                                                defaultValue={item.quantity}
                                                min={1}
                                                max={99}
                                                disabled={item.product_registration}
                                                onChange={(e) => {
                                                    let newQty = parseInt(e.target.value, 10);

                                                    if (newQty < 1) {
                                                        e.target.value = '1';
                                                        newQty = 1;
                                                    }
                                                    if (newQty > 99) {
                                                        newQty = 99;
                                                        e.target.value = '99';
                                                    }
                                                    handleQuantityChange(item.id, newQty);
                                                }}
                                                onBlur={(e) => {
                                                    const newQty = parseInt(e.target.value, 10);

                                                    if (isNaN(newQty)) {
                                                        e.target.value = '1';
                                                    }
                                                }}
                                            />
                                        </div>
                                        <button className="mt-1 text-xs text-muted-foreground hover:underline" onClick={() => handleRemove(item.id)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* 💵 Footer */}
                    <SheetFooter className="mt-auto space-y-3 border-t px-6 py-5">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Total</span>
                            <span className="font-semibold">
                                {auth.user.currency.symbol}
                                {cart.subtotal.toLocaleString()}
                            </span>
                        </div>
                        <div className="text-xs">
                            Shipping calculated at checkout. <br />
                        </div>
                        <div className="mt-3 flex gap-3">
                            <Link href={'/cart'}>
                                <Button>Checkout</Button>
                            </Link>
                        </div>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
}
