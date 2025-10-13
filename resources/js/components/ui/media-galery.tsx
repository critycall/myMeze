import { useEffect, useRef, useState, forwardRef } from "react";
import Sortable from "sortablejs";
import { Media } from "@/types";
import ResponsiveImage from '@/components/ui/image';
import { Button } from '@/components/ui/button';

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
    const [selected, setSelected] = useState<number[]>([]);
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

    const toggleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const deleteSelected = () => {
        setImages((prev) => prev.filter((img) => !selected.includes(img.id)));
        setSelected([]);
    };

    return (
        <div>
            <Gallery
                ref={galleryRef}
                className="gallery grid grid-cols-3 md:grid-cols-6 gap-3 py-2"
            >
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div
                            key={image.id}
                            data-id={image.id}
                            className="relative aspect-square rounded overflow-hidden bg-secondary border-2"
                        >
                            {/* Top-left checkbox */}
                            <input
                                type="checkbox"
                                checked={selected.includes(image.id)}
                                onChange={() => toggleSelect(image.id)}
                                className="absolute top-1 left-1 w-4 h-4 accent-destructive z-10"
                            />

                            <ResponsiveImage media={image} />

                            <input
                                type="hidden"
                                name={`${name}[${index}]`}
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

            {selected.length > 0 && (
                <Button
                    type="button"
                    onClick={deleteSelected}
                    variant="destructive"
                >
                    Delete image(s)
                </Button>
            )}
        </div>
    );
}
