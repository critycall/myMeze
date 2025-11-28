import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ResponsiveImage from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Auth, Option } from '@/types';
import { Form, Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Award, LoaderCircle, ShoppingBasket } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/icon';

export default function Checkout({ countries, cart_id }: { countries: Option[]; cart_id: number }) {
    const [useSameForBilling, setUseSameForBilling] = useState(true);

    const { auth, sharedCart } = usePage().props as unknown as {
        auth: Auth;
        sharedCart: { count: number };
    };

    const [shippingForm, setShippingForm] = useState({
        country_id: auth.user.country_id ? String(auth.user.country_id) : '',
        address: '',
        postal_code: '',
    });

    const [cart, setCart] = useState<{ items: any[]; subtotal: number }>({
        items: [],
        subtotal: 0,
    });
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await axios.get(route('cart.data'));
            await new Promise((resolve) => setTimeout(resolve, 300));
            setCart({
                items: res.data.items,
                subtotal: res.data.subtotal,
            });
        } catch (err) {
            console.error('Failed to fetch cart', err);
        } finally {
            setLoading(false);
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
                await calculateShipping();
            } catch (error) {
                console.error('❌ Failed to update item quantity:', error);
            }
        }, 400);
    };

    const [shipping, setShipping] = useState<{ cost: number; days: number; currency?: string; digital: boolean } | null>(null);
    const [calculating, setCalculating] = useState(false);
    const handleRemove = async (id: number) => {
        try {
            const res = await axios.delete(route('cart.item.remove', id));

            setCart({
                items: res.data.items,
                subtotal: res.data.subtotal,
            });

            router.reload({ only: ['sharedCart'] });
            await calculateShipping();
        } catch (error) {
            console.error('❌ Failed to remove item:', error);
        }
    };

    const calculateShipping = async () => {
        if (!shippingForm.country_id || !shippingForm.address || !shippingForm.postal_code) return;
        setCalculating(true);
        try {
            const res = await axios.post(route('cart.shipping-cost'), shippingForm);
            setShipping({
                cost: res.data.shipping_cost,
                days: res.data.estimated_days,
                currency: res.data.currency,
                digital: res.data.digital,
            });
        } catch (err) {
            console.error('❌ Failed to calculate shipping:', err);
        } finally {
            setCalculating(false);
        }
    };

    const handleFieldChange = (name: string, value: string) => {
        setShippingForm((prev) => ({ ...prev, [name]: value }));
    };

    const total = cart.subtotal + (shipping?.cost || 0);

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (shippingForm.country_id && shippingForm.postal_code && shippingForm.address.length > 3) {
            calculateShipping();
        }
    }, [shippingForm.country_id, shippingForm.postal_code, shippingForm.address]);

    return (
        <AppLayout>
            <Head title="Checkout" />
            <Form
                method="post"
                transform={(data) => ({ ...data, shipping_cost: shipping.cost })}
                action={route('orders.store', cart_id)}
                disableWhileProcessing
                className="flex flex-col p-2"
            >
                {({ processing, errors }) => (
                    <div className="grid h-full gap-3 lg:grid-cols-2">
                        <div className="">
                            <div className="mt-6 grid gap-6 rounded-md border border-border p-4 transition-all duration-300 ease-in-out">
                                <h4 className="text-sm font-medium">Shipping Information</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first_name">First name</Label>
                                        <Input
                                            id="first_name"
                                            type="text"
                                            required
                                            autoFocus
                                            autoComplete="first_name"
                                            name="first_name"
                                            defaultValue={auth.user.first_name}
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="last_name">Last name</Label>
                                        <Input
                                            id="last_name"
                                            type="text"
                                            required
                                            autoComplete="last_name"
                                            name="last_name"
                                            defaultValue={auth.user.last_name}
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="country_id">Country</Label>
                                    <Select
                                        name="country_id"
                                        onValueChange={(v) => handleFieldChange('country_id', v)}
                                        defaultValue={String(auth.user.country_id)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countries.map((s: Option) => (
                                                <SelectItem key={s.value} value={String(s.value)}>
                                                    {s.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.country_id} />
                                </div>

                                <div className="grid gap-3 lg:grid-cols-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" type="text"  onBlur={(e) => handleFieldChange('city', e.target.value)} required autoComplete="city" name="city" placeholder="" />
                                        <InputError message={errors.city} className="mt-2" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="postal_code">Postal code</Label>
                                        <Input
                                            id="postal_code"
                                            type="text"
                                            required
                                            autoComplete="postal_code"
                                            name="postal_code"
                                            placeholder=""
                                            onBlur={(e) => handleFieldChange('postal_code', e.target.value)}
                                        />
                                        <InputError message={errors.postal_code} className="mt-2" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="county">County / State</Label>
                                        <Input
                                            id="county"
                                            type="text"
                                            required
                                            autoComplete="county"
                                            name="county"
                                            placeholder=""
                                            onBlur={(e) => handleFieldChange('county', e.target.value)}
                                        />
                                        <InputError message={errors.county} className="mt-2" />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input type="text" name="address" className="" onBlur={(e) => handleFieldChange('address', e.target.value)} />
                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" type="text" required autoComplete="phone" name="phone" placeholder="" />
                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pt-4">
                                <Checkbox
                                    id="same_billing"
                                    checked={useSameForBilling}
                                    onCheckedChange={(checked) => setUseSameForBilling(!!checked)}
                                />
                                <Label htmlFor="same_billing" className="text-sm leading-none font-medium">
                                    Use same information for billing
                                </Label>
                            </div>

                            {!useSameForBilling && (
                                <div className="mt-6 grid gap-6 rounded-md border border-border p-4 transition-all duration-300 ease-in-out">
                                    <h4 className="text-sm font-medium">Billing Information</h4>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="billing_first_name">First name</Label>
                                            <Input id="billing_first_name" name="billing_first_name" type="text" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="billing_last_name">Last name</Label>
                                            <Input id="billing_last_name" name="billing_last_name" type="text" />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="billing_phone">Phone</Label>
                                        <Input id="billing_phone" name="billing_phone" type="text" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="billing_country_id">Country</Label>
                                        <Select name="billing_country_id">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries.map((s: Option) => (
                                                    <SelectItem key={s.value} value={String(s.value)}>
                                                        {s.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-3 lg:grid-cols-3">
                                        <div className="grid gap-2">
                                            <Label htmlFor="billing_city">City</Label>
                                            <Input id="billing_city" name="billing_city" type="text" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="billing_postal_code">Postal code</Label>
                                            <Input id="billing_postal_code" name="billing_postal_code" type="text" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="billing_county">County</Label>
                                            <Input id="billing_county" name="billing_county" type="text" />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="billing_address">Address</Label>
                                        <Input id="billing_address" name="billing_address" type="text" className="text-xs" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="">
                            <div className="mt-6 flex-1 space-y-6 overflow-y-auto px-6">
                                {loading ? (
                                    Array.from({ length: sharedCart.count }).map((_, i) => (
                                        <div key={i} className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-18 w-18 rounded-md" />

                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-40" />
                                                    <Skeleton className="h-3 w-32" />
                                                    <Skeleton className="h-3 w-28" />
                                                    <Skeleton className="h-3 w-20" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end space-y-2 text-sm">
                                                <Skeleton className="h-6 w-12 rounded-md" />
                                                <Skeleton className="h-3 w-10" />
                                            </div>
                                        </div>
                                    ))
                                ) : cart.items.length === 0 ? (
                                    <div className="text-muted-foreground">
                                        <span>
                                            <Icon iconNode={ShoppingBasket}/>
                                            Your cart is empty.
                                        </span>
                                    </div>
                                ) : (

                                    cart.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                {item.thumbnail ? (
                                                    <div className="flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-md">
                                                        <ResponsiveImage className="h-full w-full object-contain" media={item.thumbnail} />
                                                    </div>
                                                ) : (
                                                    <Award className="h-14 w-18" />
                                                )}

                                                <div>
                                                    <div className="text-sm font-semibold tracking-wide uppercase">{item.name}</div>

                                                    {item.product_registration && (
                                                        <div className="text-xs tracking-wide uppercase">
                                                            MODEL: {item.product_registration.product.name}
                                                        </div>
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
                                                            if (isNaN(newQty)) e.target.value = '1';
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="mt-1 text-xs text-muted-foreground hover:underline"
                                                    onClick={() => handleRemove(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="notes">Order notes</Label>
                                    <Textarea name="notes" rows={2} className="text-xs"></Textarea>
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>

                                <div className="mt-2 flex justify-between text-sm font-medium">
                                    <span>Order summary</span>
                                    <span className="font-semibold">
                                        {auth.user.currency.symbol}
                                        {cart.subtotal}
                                    </span>
                                </div>

                                {shipping && !shipping.digital && (
                                    <div>
                                        <div className="mt-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
                                            <span>Shipping</span>
                                            {shipping.cost > 0 && (
                                                <span>
                                                    {auth.user.currency.symbol} {shipping.cost}
                                                </span>
                                            )}

                                            {shipping.cost == 0 && <span>FREE</span>}
                                        </div>
                                        <div className="mt-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
                                            <span> Estimate delivery</span>
                                            <span>
                                                {shipping.days} to {shipping.days + 2} bussiness days
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {shipping && shipping.digital && (
                                    <div className="mt-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
                                        <span> This is a digital product, does not require shipping</span>
                                    </div>
                                )}

                                {!shipping && (
                                <div className="mt-2 flex justify-between text-sm font-medium">
                                    <span>Shipping cost</span>
                                    <span>
                                        {calculating
                                            ? 'Calculating shipping...'
                                            : 'Enter shipping address'}
                                    </span>
                                </div>
                                )}

                                <div className="mt-4 flex justify-between border-t border-border pt-2 text-sm font-semibold">
                                    <span>Total</span>
                                    <span>
                                        {auth.user.currency.symbol}
                                        {total.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <Button type="submit" disabled={processing || calculating}>
                                {(processing || calculating) && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                PAY NOW
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </AppLayout>
    );
}
