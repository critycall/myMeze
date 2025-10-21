<?php

namespace App\Models;

use App\Traits\FormatsMedia;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ProductVariant extends Model implements HasMedia
{
    use InteractsWithMedia, FormatsMedia;

    protected $fillable = ['sku', 'name', 'price', 'option', 'material_id'];
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')
            ->withResponsiveImages()
            ->singleFile();
    }

    protected function thumbnail(): Attribute
    {
        return Attribute::get(function () {
            $media = $this->getFirstMedia('thumbnail');

            return $this->formatMedia($media);
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}
