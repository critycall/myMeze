import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Warranty',
        href: '/warranty',
    },
];

export default function Warranty() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Warranty" />
            <div className="mx-auto max-w-5xl">
                <h1 className="text-2xl md:text-4xl my-20 font-bold text-center">WARRANTY POLICY</h1>
                <div className="space-y-6 my-6 p-6 ">
                    <p>Meze Audio guarantees their products against defects in materials or workmanship, as follows:</p>
                    <p>Elite | Empyrean II | Poet | Liric | 109 Pro | Advar – 2 years, applicable worldwide.</p>
                    <p>
                        105 SILVA | 105 AER | 99 Series | Alba – two (2) years for customers from EU countries; one (1) year for customers outside the
                        EU.
                    </p>
                    <p>Accessories – 6 months, applicable worldwide.</p>
                    <p>
                        During this period, Meze Audio will repair or replace the product or parts at no charge. After the warranty period expires,
                        you are responsible for the repair or replacement of the product. This warranty does not cover other related costs and is
                        independent of the seller's warranty policy, depending on the country.
                    </p>
                    <p>
                        For the warranty to apply, presenting an original proof of purchase is required. The proof of purchase may be in the form of a
                        receipt or bill of sale from an authorized dealer, and must include the model of the product and the date of purchase.
                    </p>
                    <p>
                        This warranty DOES cover products sold as-is, open box, second-hand, or display models, as long as the original proof of
                        purchase is provided.
                    </p>
                    <p>
                        This warranty DOES NOT cover cosmetic damage, acts of God, normal wear and tear, accidents, misuse, commercial use, any
                        modifications to the product, improper use, or improper connection. Additionally, it doesn't cover purchases from an
                        unauthorized dealer or attempted repair by anyone other than Meze Audio or another authorized person or unit. This warranty is
                        also void if the product was damaged by a product that it was used with, such as battery leaks or electrical fault of a
                        connecting product.
                    </p>
                    <p>
                        The warranty is transferable, on the condition that the original proof of purchase is provided. Meze Audio is not responsible
                        for the replacement or repair of products if in violation of this warranty.
                    </p>
                    <p>Some countries may have other restrictions on warranty policies.&nbsp;</p>
                    <p>
                        If you've got any queries, concerns, issues, or anything in between, we’re happy to help. Please reach out to our Customer
                        Care team at{' '}
                        <a href="mailto:support@mezeaudio.com">
                            <span className="underline">support@mezeaudio.com</span>
                        </a>
                        .&nbsp;
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
