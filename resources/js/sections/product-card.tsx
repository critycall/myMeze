import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import ResponsiveImage from '@/components/ui/image';

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="text-center bg-background justify-between p-2 items-center">
            <div className="text-center">
                <ResponsiveImage className="h-50 md:h-64" media={product.thumbnail}/>
                <h4 className="font-semibold">{product.name}</h4>
            </div>
           <div className="flex justify-between mt-3 p-4">
               <div className="text-lg">
                   { product.msrp}
               </div>
               <Button>BUY</Button>
           </div>
        </div>
    );
}
