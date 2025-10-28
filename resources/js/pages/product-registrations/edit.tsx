import Heading from '@/components/heading';
import { Icon } from '@/components/icon';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Option, ProductRegistration, type SharedData } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { Hash, LoaderCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register a new product',
        href: '/product-registrations',
    },
];
export default function Update({ productRegistration, countries }: { productRegistration: ProductRegistration, countries: Option[] }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-3 md:p-6">
                <Head title="Product groups" />
                <div className="text-center md:text-left">
                    <Heading
                        title="COMPLETE REGISTRATION"
                        description="Complete your registration details so you can benefit from all abailable services"
                    />
                </div>
                <div className="space-y-6">
                    <div className="rounded bg-card md:grid md:grid-cols-5">
                        <ResponsiveImage className="h-full w-full" media={productRegistration.product.thumbnail} />
                        <div className="flex w-full max-w-md items-center rounded p-4 text-center md:col-span-4 md:mx-auto">
                            <div className="w-full">
                                <h2 className="my-1 mb-1 text-xl font-bold uppercase"> {productRegistration.product.name}</h2>
                                <div className="mt-1 mb-7">
                                    {productRegistration.nickname && <Badge className="w-fit">{productRegistration.nickname}</Badge>}
                                </div>
                                <div className="my-5 flex justify-between border-b">
                                    <p className="flex text-muted-foreground">
                                            <span>
                                                <Icon iconNode={Hash} className="h-5"></Icon>
                                            </span>
                                        <span> Serial number: </span>
                                    </p>
                                    <p className="font-semibold">{productRegistration.serial_number}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded bg-card p-3">
                        <Form
                            options={{
                                preserveScroll: true,
                            }}
                            method="POST"
                            action={route('product-registrations.update', productRegistration.id)}
                        >
                            {({ processing, errors }) => (
                                <>
                                    <input type="hidden" name="_method" value="PUT" />
                                    <div className="grid md:grid-cols-2">
                                        <div className="max-w-xl space-y-6 p-3">
                                            <h2 className="mb-2 text-xl font-semibold">PURCHASE DETAILS</h2>

                                            <div className="grid gap-2">
                                                <Label htmlFor="purchase_date">PURCHASE DATE</Label>
                                                <Input id="purchase_date" type="DATE" name="purchase_date" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.purchase_date} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="bought_from">RETAILER</Label>
                                                <Input
                                                    id="bought_from"
                                                    type="text"
                                                    name="bought_from"
                                                    autoComplete="off"
                                                    placeholder="ex: mezeaudio.com"
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError className="mt-2" message={errors.bought_from} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="receipt">RECEIPT</Label>
                                                <Input id="receipt" type="file" name="receipt" autoComplete="off" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.receipt} />
                                            </div>
                                        </div>
                                        <div className="max-w-xl space-y-6 p-3">
                                            <h2 className="mb-2 text-xl font-semibold">PERSONAL DETAILS</h2>
                                            <div className="grid gap-2">
                                                <Label htmlFor="first_name">FIRST NAME</Label>
                                                <Input
                                                    id="first_name"
                                                    type="text"
                                                    name="first_name"
                                                    defaultValue={auth.user.first_name}
                                                    autoComplete="off"
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError className="mt-2" message={errors.first_name} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="last_name">LAST NAME</Label>
                                                <Input
                                                    id="last_name"
                                                    type="text"
                                                    name="last_name"
                                                    defaultValue={auth.user.last_name}
                                                    autoComplete="off"
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError className="mt-2" message={errors.last_name} />
                                            </div>


                                            <div className="grid gap-2">
                                                <Label htmlFor="country_id">Country</Label>
                                                <Select name="country_id" required defaultValue={String(auth.user.country_id)}>
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

                                            <div className="grid gap-2">
                                                <Label htmlFor="address">ADDRESS</Label>
                                                <Textarea id="address" name="address" autoComplete="off" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.address} />
                                            </div>

                                        </div>

                                        <div className="flex items-center p-3">
                                            <Button type="submit" disabled={processing}>
                                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                             COMPLETE REGISTRATION
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
