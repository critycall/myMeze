import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function ContactSupport() {
    return (
        <div className="items-center justify-between bg-card p-6 text-center md:flex md:text-left">
            <div>
                <h4 className="font-semibold md:text-lg">NEED ADDITIONAL HELP?</h4>
                <p className="my-3 text-sm text-muted-foreground">
                    {' '}
                    Can't find what you're looking for? Contact our support team for personalised assistance
                </p>
            </div>
            <Link href={'/support/contact'}>
                <Button variant="outline">CONTACT SUPPORT</Button>
            </Link>
        </div>
    );
}
