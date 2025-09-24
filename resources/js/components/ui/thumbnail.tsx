import * as React from "react";
import { Media } from "@/types";
import { cn } from "@/lib/utils";
import ResponsiveImage from '@/components/ui/image';

type ThumbnailProps = {
    media?: Media | null;
    name: string; // used for initials fallback
    className?: string;
};

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
        .slice(0, 2); // max 2 letters
}

export function Thumbnail({ media, name, className }: ThumbnailProps) {
    const [error, setError] = React.useState(false);

    if (media && !error) {
        return (
            <ResponsiveImage
                media={media}
                className={className}
                onError={() => setError(true)}
            />
        );
    }

    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-full bg-secondary text-sm font-medium text-black dark:bg-neutral-700 dark:text-white",
                className
            )}
        >
            {getInitials(name)}
        </div>
    );
}
