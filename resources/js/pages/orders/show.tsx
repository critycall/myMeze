import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, Order } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
];

export default function Show({ order }: { order: Order }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <SettingsLayout size="lg">
                <div className="space-y-6">
                    <HeadingSmall title={order.number} description="Order details" />
                </div>

                <div className="space-y-3 bg-card p-3">
                    <div>
                        Status:
                        <span className="uppercase mx-2">{order.status.replace(/[^a-zA-Z ]/g, ' ')}</span>
                    </div>

                    <div>
                        Payment status:
                        <span className="uppercase mx-2">{order.payment_status}</span>
                    </div>
                    <div>
                        Order data:
                       <span> {order.created_at}</span>
                    </div>
                    <div>Items: {order.items.length}</div>

                    {order.carrier && (
                        <div>
                            Order if fulfilled
                            <Link href={order.carrier.tracking_url + order.tracking_number}>
                                <Button>{order.tracking_number}</Button>
                            </Link>
                        </div>
                    )}

                    <Table className="rounded border">
                        <TableHeader>
                            <TableRow className="bg-secondary uppercase">
                                <TableHead>No.</TableHead>
                                <TableHead className="">Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <p>{item.name}</p>
                                        <p>{item.description}</p>
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        {order.currency.symbol}
                                        {item.price}
                                    </TableCell>
                                    <TableCell>
                                        {order.currency.symbol}
                                        {item.total}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-end">
                        Shipping cost: {order.currency.symbol}
                        {order.shipping_cost}
                    </div>
                    <div className="flex justify-end">
                        Total: {order.currency.symbol}
                        {order.total}
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
