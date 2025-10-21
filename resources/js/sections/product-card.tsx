import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import ResponsiveImage from '@/components/ui/image';
import { getVisibleTags } from '@/lib/utils';
import { Product, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="items-center justify-between rounded bg-card text-center">

            <div className="text-center">
                <div className="flex aspect-[1/1] items-center overflow-hidden rounded-lg">
                    <ResponsiveImage className="max-h-full max-w-full object-contain object-center" media={product.thumbnail} />
                </div>
                <h4 className="md:text-md my-3 text-sm font-semibold">{product.name}</h4>
            </div>

            {product.tags && product.tags.length > 0 && (
                <div className="flex flex-grow flex-wrap justify-center gap-1">
                    {getVisibleTags(product.tags).map((tag) => (
                        <div key={tag.id} className="w-fit">
                            <Badge variant="outline">
                                <div>{tag.name['en']}</div>
                            </Badge>
                        </div>
                    ))}
                </div>
            )}

            <div className="mx-2 flex items-center justify-between p-3">
                <div className="font-semibold md:text-lg">
                    {auth.user.currency.symbol} {product.msrp}
                </div>
                <div className="hidden md:block">
                    <Button size="sm">ADD TO CART</Button>
                </div>
                <div className="md:hidden">
                    <Button size="icon">
                        <Icon iconNode={ShoppingCart}></Icon>
                    </Button>
                </div>
            </div>
        </div>
    );
}
