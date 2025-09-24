<?php

namespace App\Models;

use App\Enums\ProductStatus;
use App\Traits\FormatsMedia;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Concerns\IsSorted;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, IsSorted, FormatsMedia;

    protected $casts = [
        'status' => ProductStatus::class,
    ];

    protected $appends = [
        'thumbnail',
    ];

    protected $fillable = [
        'sku', 'name', 'barcode', 'description', 'status', 'position', 'slug', 'quantity', 'msrp',
        'product_category_id', 'product_group_id', 'msrp', 'ean', 'upc', 'material_id'
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('gallery')->withResponsiveImages();
    }

    public function gallery(): Attribute
    {
        return Attribute::get(function () {
            return $this->formatMediaCollection($this->getMedia('gallery'));
        });
    }

    protected function thumbnail(): Attribute
    {
        return Attribute::get(function () {
            $media = $this->getFirstMedia('gallery');

            return $this->formatMedia($media);
        });
    }

}
