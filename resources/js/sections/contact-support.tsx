import { Button } from '@/components/ui/button';

export default function ContactSupport() {
    return (
        <div className="md:flex text-center md:text-left bg-card justify-between p-6 items-center">
            <div>
                <h4 className="font-semibold md:text-lg">NEED ADDITIONAL HELP?</h4>
                <p className="text-muted-foreground my-3 text-sm"> Can't find what you're looking for? Contact our support team for personalised assistance</p>
            </div>
            <Button variant="outline">CONTACT SUPPORT</Button>
        </div>
    );
}
