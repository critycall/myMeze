import { useEffect, useRef, useState, forwardRef } from "react";
import Sortable from "sortablejs";
import { Media } from "@/types";
import ResponsiveImage from '@/components/ui/image';

const Gallery = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, ...props }, ref) => (
        <div ref={ref} {...props}>
            {children}
        </div>
    )
);

export default function SortableGallery({
                                            initialImages,
                                            name,
                                        }: {
    initialImages: Media[];
    name: string;
}) {
    const [images, setImages] = useState(initialImages);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setImages(initialImages);
    }, [initialImages]);

    useEffect(() => {
        if (!galleryRef.current) return;

        const container = galleryRef.current;

        const sortable = new Sortable(container, {
            animation: 150,
            onEnd: () => {
                const elements = Array.from(container.children) as HTMLElement[];

                const newOrder = elements.map((el) => {
                    const id = Number(el.dataset.id);
                    return images.find((img) => img.id === id)!;
                });

                setImages(newOrder);
            },
        });

        return () => sortable.destroy();
    }, [images]);

    return (
        <Gallery
            ref={galleryRef}
            className="gallery grid grid-cols-3 md:grid-cols-6 gap-3 py-2"
        >
            {images.length > 0 ? (
                images.map((image, index) => (
                <div
                    key={image.id}
                    data-id={image.id}
                    className="aspect-square rounded overflow-hidden bg-secondary border-2"
                >
                   <ResponsiveImage media={image} />

                    <input
                        type="hidden"
                        name={`${name}[${index + 1}]`}
                        value={image.id}
                    />
                </div>
                ))
            ) : (
                <p className="col-span-full text-sm text-muted-foreground p-2 border rounded">
                    No images yet
                </p>
            )}
        </Gallery>
    );
}
