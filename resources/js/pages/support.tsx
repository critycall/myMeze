import { Icon } from '@/components/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ResponsiveImage from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import ContactForm from '@/sections/contact-form';
import ContactSupport from '@/sections/contact-support';
import { type BreadcrumbItem, ContentBlock } from '@/types';
import { Head } from '@inertiajs/react';
import { Play } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Support',
        href: '/support',
    },
];

export default function Support({ tab, selfServiceContent }: { tab: string; selfServiceContent: [] }) {
    const faqs = [
        {
            question: 'Do you offer after-sales services for your products?',
            answer: (
                <>
                    Yes, we do offer after-sales service for our products. Certain replaceable components can be purchased directly from our website.
                    For our European customers, please visit our dedicated EU store at{' '}
                    <a href="https://mezeaudio.eu" target="_blank" className="underline">
                        mezeaudio.eu
                    </a>
                    , and for international customers, you can use{' '}
                    <a href="https://mezeaudio.com" target="_blank" className="underline">
                        mezeaudio.com
                    </a>
                    . If you’re looking for a specific part and can’t find it, email us at{' '}
                    <a href="mailto:support@mezeaudio.com" className="underline">
                        support@mezeaudio.com
                    </a>
                    , and we’ll be happy to help you.
                </>
            ),
        },
        {
            question: 'Do you ship to my country?',
            answer: (
                <>
                    You can check our{' '}
                    <a href="https://mezeaudio.com/pages/shipping" target="_blank" className="underline">
                        Shipping and Returns
                    </a>{' '}
                    page for the full list of locations we deliver to. If you don’t see your country or have any doubts, feel free to email our
                    support team, and we’ll do our best to accommodate you.
                </>
            ),
        },
        {
            question: 'Can you repair my cable?',
            answer: (
                <>
                    Depending on the issue, we may be able to repair or replace the cable for you. Please reach out to our Customer Support team with
                    details about the cable’s problem, and they’ll guide you to the best solution.
                </>
            ),
        },
        {
            question: 'How do I request a return?',
            answer: (
                <>
                    Visit our{' '}
                    <a href="https://mezeaudio.com/pages/shipping" target="_blank" className="underline">
                        Shipping &amp; Returns
                    </a>{' '}
                    page, where you’ll also find information about our refund policy. You might also want to review our{' '}
                    <a href="https://mezeaudio.com/pages/warranty" target="_blank" className="underline">
                        Warranty Policy
                    </a>
                    . If you encounter issues during the process, contact our Customer Support for help.
                </>
            ),
        },
        {
            question: 'What should I do if I received / ordered the wrong item?',
            answer: (
                <>
                    Visit our{' '}
                    <a href="https://mezeaudio.com/pages/shipping" target="_blank" className="underline">
                        Return &amp; Refund Policy
                    </a>{' '}
                    page for instructions on how to return or exchange your item. You can follow the listed steps or contact our support team directly
                    for assistance.
                </>
            ),
        },
        {
            question: "What should I do if I didn't receive my item?",
            answer: (
                <>
                    Check the shipment’s tracking number (emailed when your order shipped) for updates. If the carrier shows an issue, contact DHL for
                    details. You can also email{' '}
                    <a href="mailto:support@mezeaudio.com" className="underline">
                        support@mezeaudio.com
                    </a>{' '}
                    with your order number — our team will investigate immediately.
                </>
            ),
        },
        {
            question: 'How do I replace the ear pads / headband on my headphones?',
            answer: (
                <>
                    We have step-by-step video guides on our website. Look for your headphone model in the{' '}
                    <a href="https://mezeaudio.com/pages/videos" target="_blank" className="underline">
                        Instructional Videos
                    </a>{' '}
                    playlist. You’ll find one video for ear pads and one for headbands. Contact our Customer Support team if you need further help.
                </>
            ),
        },
        {
            question: 'How can I use my Alba with an iPhone?',
            answer: (
                <>
                    The ALBA comes with a 3.5 mm to USB-C adapter with DAC/AMP, compatible with iPhone 15 and newer. For older models with a Lightning
                    port, use a 3.5mm to Lightning adapter.
                </>
            ),
        },
        {
            question: 'Is my order subject to customs and taxes?',
            answer: (
                <>
                    Depending on your country’s import laws, your order may be subject to customs duties or VAT/local taxes when it arrives. These are
                    charged by your government, not by us.
                </>
            ),
        },
        {
            question: 'Can I send my headphones in for servicing?',
            answer: (
                <>
                    Please email{' '}
                    <a href="mailto:support@mezeaudio.com" className="underline">
                        support@mezeaudio.com
                    </a>{' '}
                    to describe the issue. Our team will guide you through troubleshooting or arrange a service return if needed.
                </>
            ),
        },
        {
            question:
                'What is the difference between the normal-sized ear pads and the small ones for the 99 Classics? Do you lose anything in soundstage?',
            answer: (
                <>
                    The small ear pads give tighter low frequencies and more forward mids, while maintaining nearly the same soundstage. The
                    difference is mostly tonal, not spatial.
                </>
            ),
        },
        {
            question: 'Why are there no Left / Right markings on the headphone cable or ear cups?',
            answer: (
                <>
                    The 99 Classics are symmetrical. The “L” and “R” markings are on the cable plugs (the left plug also has a tactile ridge for
                    easier identification).
                </>
            ),
        },
        {
            question: 'Why does the wood on different 99 Classics headphones look lighter or darker?',
            answer: (
                <>
                    The wood varies naturally in color and grain since it’s real walnut. Each pair is unique — no two sets look the same. It’s purely
                    aesthetic and doesn’t affect sound.
                </>
            ),
        },
        {
            question: 'Do I need to “burn in” my headphones? If so, what are the recommendations?',
            answer: (
                <>
                    Burn-in isn’t mandatory. Flagship models sound great from day one. For 99 Classics, a moderate 35–50 hours of playback may bring
                    subtle refinement, but enjoyment starts immediately.
                </>
            ),
        },
    ];

    const tips = [
        {
            title: 'BOOM MIC',
            content: (
                <>
                    <p>
                        If you have connected the Boom Mic to your PC and the recorded audio is on the quieter side, your PC’s motherboard may not
                        have sufficient power to drive it optimally. We recommend using an external DAC/AMP with dual 3.5 mm connections (headphone
                        input and microphone output), along with the provided Y-adapter. Alternatively, a 3.5 mm female to USB-C male adapter is also
                        suitable.
                    </p>
                    <p>
                        <strong>Troubleshooting:</strong> If you are not getting signal on the Left or Right channel, try switching the Left and Right
                        cables between ear cups to identify whether the Boom Mic or the headphones are defective.
                    </p>
                </>
            ),
        },
        {
            title: 'ALBA',
            content: (
                <p>To ensure the best sound quality and longest lifespan, we recommend routinely cleaning your ALBA in-ear monitors’ ear tips.</p>
            ),
        },
        {
            title: '99 CLASSICS',
            content: <p>To extend your 99 Classics headphones’ life, we recommend storing them in a dry environment.</p>,
        },
        {
            title: 'ELITE & EMPYREAN II',
            content: (
                <p>
                    To avoid cosmetic defects, handle Empyrean II and Elite headphones carefully and avoid applying excessive pressure to the aluminum
                    grille.
                </p>
            ),
        },
        {
            title: 'CABLES',
            content: (
                <>
                    <p>
                        When detaching 3.5 mm (1/8 inch) jacks, grasp the shell and gently pull them out one by one to prevent damage to your
                        headphones or cable.
                    </p>
                    <p>
                        For mini-XLR cables, remember they have a lock-in mechanism. Firmly press the release button on the shell before pulling to
                        safely detach the cable.
                    </p>
                </>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Warranty" />
            <div className="w-full">
                <div className="w-full overflow-auto md:p-1">
                    <Tabs defaultValue={tab} className="mt-10 w-full">
                        <TabsList className="grid h-full w-full grid-cols-2 bg-transparent transition md:grid-cols-4">
                            <TabsTrigger
                                key="FAQ"
                                value="FAQ"
                                className="h-full rounded-none border-b-2 border-transparent py-3 text-xl text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:shadow-none md:py-6 md:text-xl dark:data-[state=active]:border-primary"
                            >
                                FAQ
                            </TabsTrigger>
                            <TabsTrigger
                                key="tips"
                                value="tips"
                                className="h-full rounded-none border-b-2 border-transparent px-10 py-3 text-xl text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:shadow-none md:py-6 md:text-xl dark:data-[state=active]:border-primary"
                            >
                                USEFUL TIPS
                            </TabsTrigger>
                            <TabsTrigger
                                key="service"
                                value="service"
                                className="h-full rounded-none border-b-2 border-transparent px-10 py-3 text-xl text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:shadow-none md:py-6 md:text-xl dark:data-[state=active]:border-primary"
                            >
                                SELF-SERVICE
                            </TabsTrigger>
                            <TabsTrigger
                                key="contact"
                                value="contact"
                                className="h-full rounded-none border-b-2 border-transparent px-10 py-3 text-xl text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:shadow-none md:py-6 md:text-xl dark:data-[state=active]:border-primary"
                            >
                                CONTACT
                            </TabsTrigger>
                        </TabsList>

                        <div className="mt-2 bg-card p-5">
                            <TabsContent key="FAQ" value="FAQ">
                                <Accordion type="single" collapsible>
                                    {faqs.map((faq, index) => (
                                        <AccordionItem key={index} value={`item-${index}`}>
                                            <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                                            <AccordionContent className="text-sm text-muted-foreground">
                                                <div className="prose prose-sm max-w-none">{faq.answer}</div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </TabsContent>

                            <TabsContent key="tips" value="tips">
                                <Accordion type="single" collapsible>
                                    {tips.map((tip, index) => (
                                        <AccordionItem key={index} value={`item-${index}`}>
                                            <AccordionTrigger className="text-left font-semibold">{tip.title}</AccordionTrigger>
                                            <AccordionContent className="text-sm text-muted-foreground">
                                                <div className="prose prose-sm max-w-none">{tip.content}</div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </TabsContent>

                            <TabsContent key="service" value="service">
                                {Object.entries(selfServiceContent).map(([productName, items]: [string, ContentBlock[]]) => (
                                    <div key={productName} className="mb-8">
                                        <h2 className="mt-10 mb-5 text-center text-2xl font-semibold uppercase">{productName}</h2>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            {items.map((item: ContentBlock) => (
                                                <EmbedCard key={item.id} item={item} />
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <ContactSupport />
                            </TabsContent>

                            <TabsContent key="contact" value="contact">
                                <div className="my-6 grid gap-4 md:grid-cols-2">
                                    <div className="">
                                        <div className="prose">
                                            <h5 className={'mb-5 font-semibold'}>WE ARE HERE TO SUPPORT YOUR AUDIO EXPERIENCE</h5>
                                            <p>Our team is just one click away — send us an email and we will get back to you soon.</p>

                                            <ul className="my-5 ml-10 list-disc space-y-2">
                                                <li>
                                                    Customer support and General Inquiries:{' '}
                                                    <a className={"underline"} href="mailto:support@mezeaudio.com" title="support@mezeaudio.com">
                                                        support@mezeaudio.com
                                                    </a>
                                                </li>
                                                <li>
                                                    Business Inquiries: <a className={"underline"} href="mailto:sales@mezeaudio.com">sales@mezeaudio.com</a>
                                                </li>
                                                <li>
                                                    Press and PR: <a className={"underline"} href="mailto:marketing@mezeaudio.com">marketing@mezeaudio.com</a>
                                                </li>
                                                <li>
                                                    YouTube and Artist Collaborations: <a className={"underline"} href="mailto:hello@mezeaudio.com">hello@mezeaudio.com</a>
                                                </li>
                                            </ul>

                                            <div className={'mt-10  space-y-2'}>
                                                <p className="font-semibold">Meze Audio S.R.L.</p>
                                                <p> 1–3 Morii Street, 430162, Baia Mare, Romania</p>
                                                <p>Phone number: +40&nbsp;770&nbsp;769&nbsp;376</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ContactForm />
                                </div>

                                <div className="md:col-span-2">
                                    <div className="rich-text justify-center">
                                        <div className="">
                                            <div className="prose justify-items-center text-center">
                                                <div>
                                                    <p>
                                                        Our customer support is available Monday to Friday: 8.30 am - 4.30 pm GMT+3
                                                        <br />
                                                        Average answer time: 24h
                                                        <br />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );

    function EmbedCard({ item }: { item: ContentBlock }) {
        const [showEmbed, setShowEmbed] = useState(false);

        return (
            <div className="group relative cursor-pointer overflow-hidden border transition hover:shadow-lg" onClick={() => setShowEmbed(true)}>
                {showEmbed && item.video_url ? (
                    <div className="aspect-video w-full">
                        <iframe src={item.video_url} className="h-full w-full" allowFullScreen></iframe>
                    </div>
                ) : (
                    <>
                        <div className="aspect-video">
                            {item.background && <ResponsiveImage media={item.background} />}

                            <div className="absolute inset-0 items-center justify-center bg-black/10 px-2 text-center transition-colors duration-300 hover:bg-black/40">
                                {item.title && <h3 className="pt-5 text-lg font-semibold drop-shadow-md">{item.title}</h3>}
                            </div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 px-2 text-center transition-colors duration-300 hover:bg-black/40">
                                <Icon iconNode={Play} className="h-12 w-12 rounded-full bg-secondary p-3"></Icon>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }
}
