import HeadingSmall from '@/components/heading-small';
import { TablePagination } from '@/components/table-pagination';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, Order, PaginatedResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
];

export default function Index( {orders}: { orders: PaginatedResponse<Order> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <SettingsLayout size="lg">
                <div className="space-y-6">
                    <HeadingSmall title="Orders" description="View your past orders" />

                    {orders.data && (
                        <div className="bg-card p-2">
                            <Table className='border rounded'>
                                <TableHeader>
                                    <TableRow className="bg-secondary uppercase">
                                        <TableHead>Number</TableHead>
                                        <TableHead className="">Status</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.data.map((order: Order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <Link href={route('orders.show', order.id)} className="underline">{order.number}</Link>
                                            </TableCell>
                                            <TableCell className="uppercase">{order.status.replace(/[^a-zA-Z ]/g, ' ')}</TableCell>
                                            <TableCell>{ order.currency.symbol} {order.total} </TableCell>
                                            <TableCell>{order.created_at}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <TablePagination resource={orders} />
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    )}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
