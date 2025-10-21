import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Tag } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getVisibleTags(tags: Tag[]) {
    return tags.filter(tag =>
        tag.name['en'] !== 'Accessories' && tag.name['en'] !== 'Spare Parts'
    );
}
