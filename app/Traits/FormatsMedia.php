<?php

namespace App\Traits;

use Spatie\MediaLibrary\MediaCollections\Models\Media;

trait FormatsMedia
{
    /**
     * Format a single Media item into a frontend-friendly array.
     */
    public function formatMedia(?Media $media): ?array
    {
        if (! $media) {
            return null;
        }

        return [
            'id'        => $media->id,
            'name'      => $media->name,
            'src'       => $media->getUrl(),
            'srcset'    => $media->hasResponsiveImages() ? $media->getSrcset() : null
        ];
    }

    /**
     * Format a collection of Media items.
     *
     * @param  iterable<Media>  $mediaCollection
     */
    public function formatMediaCollection(iterable $mediaCollection): array
    {
        return collect($mediaCollection)
            ->map(fn (Media $media) => $this->formatMedia($media))
            ->values()
            ->all();
    }
}
