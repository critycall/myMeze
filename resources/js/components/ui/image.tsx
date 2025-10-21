import React, { useRef, useState } from "react";
import { Media } from "@/types";
import { cn } from '@/lib/utils';

export default function ResponsiveImage({ media,  className , ...props}: { media: Media, className?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [sizes, setSizes] = useState("1px");
    const [loaded, setLoaded] = useState(false);

    if (!media) return null;

    return (
        <img
            ref={imgRef}
            src={media.src}
            alt={media.name}
            srcSet={media.srcset}
            sizes={sizes}
            onLoad={() => {
                if (loaded) return;
                setLoaded(true);

                if (!imgRef.current) return;
                const rect = imgRef.current.getBoundingClientRect();


                const vw = Math.ceil((rect.width / window.innerWidth) * 100);
                setSizes(`${vw}vw`);
            }}
            className={cn("w-full object-cover object-center", className)}
            { ...props}
        />
    );
}
