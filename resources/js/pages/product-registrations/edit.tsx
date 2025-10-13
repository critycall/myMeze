import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Option, ProductRegistration, type SharedData } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register a new product',
        href: '/product-registrations',
    },
];
export default function Update({ productRegistration ,products, countries }: { productRegistration: ProductRegistration ,products: Option[], countries: Option[]}) {

    const { auth } = usePage<SharedData>().props;

    console.log(auth)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-3 md:p-6">
                <Head title="Product groups" />
                <div className="text-center md:text-left">
                    <Heading title="REGISTER A NEW HEADPHONE" description="Tell us about your new your new Meze Audio products to access spare parts and guides" />
                </div>
                <div className="">
                    <div >
                        <Form
                            options={{
                                preserveScroll: true,
                            }}
                            method="POST"
                            action={route('product-registrations.store')}
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="mt-2 bg-background rounded grid md:grid-cols-2">
                                        <div className="max-w-xl space-y-6 p-3">
                                            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                                            <div className="grid gap-2">
                                                <Label htmlFor="product">HEADPHONE MODEL</Label>
                                                <Input
                                                    id="product"
                                                    type="text"
                                                    name="product"
                                                    autoComplete="off"
                                                    disabled
                                                    defaultValue={productRegistration.product.name}
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError className="mt-2" message={errors.product} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="serial_number">SERIAL NUMBER</Label>
                                                <Input
                                                    disabled
                                                    id="serial_number"
                                                    type="text"
                                                    name="serial_number"
                                                    autoComplete="off"
                                                    defaultValue={productRegistration.serial_number}
                                                    className="mt-1 block w-full"
                                                />
                                                <InputError className="mt-2" message={errors.serial_number} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="purchase_date">PURCHASE DATE</Label>
                                                <Input id="purchase_date" type="DATE" name="purchase_date" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.purchase_date} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="bought_from">RETAILER</Label>
                                                <Input id="bought_from" type="text" name="bought_from" autoComplete="off" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.bought_from} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="receipt">RECEIPT</Label>
                                                <Input id="receipt" type="file" name="receipt" autoComplete="off" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.receipt} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="nickname">ADD A TAG</Label>
                                                <Input id="nickname" type="text" name="nickname" autoComplete="off" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.nickname} />
                                            </div>
                                        </div>
                                        <div className="max-w-xl space-y-6 p-3 ">
                                            <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
                                            <div className="grid gap-2">
                                                <Label htmlFor="first_name">FIRST NAME</Label>
                                                <Input id="first_name" type="text" name="first_name" defaultValue={auth.user.first_name} autoComplete="off" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.first_name} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="last_name">LAST NAME</Label>
                                                <Input id="last_name" type="text" name="last_name" defaultValue={auth.user.last_name} autoComplete="off" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.last_name} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="address">ADDRESS</Label>
                                                <Input id="address" type="text" name="address" autoComplete="off" className="mt-1 block w-full" />
                                                <InputError className="mt-2" message={errors.address} />
                                            </div>


                                            <div className="grid gap-2">
                                                <Label htmlFor="country_id">COUNTRY</Label>
                                                <Select name="country_id">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={'e.g. ' + products[0].label} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {countries.map((c: Option) => (
                                                            <SelectItem key={c.value} value={String(c.value)}>
                                                                {c.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <InputError className="mt-2" message={errors.country_id} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="flex items-center my-3">
                                        <Button type="submit" disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            REGISTER HEADPHONE
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>

                <div className="mt-6 space-y-6 bg-card p-3 grid md:grid-cols-2">
                    <div>
                        <h2 className="font-bold">NEED HELP FINDING YOUR SERIAL NUMBER?</h2>
                        <p>Here you can find a guide for every headphone that can help you identity your serial code</p>
                    </div>

                    <div className="text-right">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">VIEW GUIDE</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>SERIAL NUMBER GUIDE</DialogTitle>

                                <ScrollArea className="h-96 w-full md:h-[450px]">
                                    <Accordion type="single" className="px-4" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>109 Pro</AccordionTrigger>
                                            <AccordionContent>Under the leather headband you should find a number like 20xxx-xxxx</AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>105 Silva</AccordionTrigger>
                                            <AccordionContent>Under the leather headband you should find a number like 20xxx-xxxx</AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger>105 Aer</AccordionTrigger>
                                            <AccordionContent>Under the leather headband you should find a number like 20xxx-xxxx</AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </ScrollArea>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline">
                                            CLOSE
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
