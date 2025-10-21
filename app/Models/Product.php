<?php

namespace App\Models;

use App\Enums\ProductStatus;
use App\Traits\FormatsMedia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Concerns\IsSorted;
use Spatie\Tags\HasTags;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, IsSorted, FormatsMedia, HasTags;

    protected $casts = [
        'status' => ProductStatus::class,
    ];

    protected $appends = [
        'thumbnail',
    ];

    protected $fillable = [
        'sku', 'name', 'barcode', 'description', 'status', 'position', 'slug', 'quantity', 'msrp',
        'product_category_id', 'product_group_id', 'msrp', 'ean', 'upc', 'material_id', 'non_eu_warranty_days',
        'eu_warranty_days', 'warranty_days',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::addGlobalScope('position', function (Builder $builder) {
            $builder->orderBy('position');
        });
    }

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

    public function services(): HasMany
    {
        return $this->hasMany(ProductService::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function latestRecipe(): HasOne
    {
        return $this->hasOne(ProductRecipe::class)
            ->where('is_active', true)
            ->ofMany('version', 'max');
    }

    public function recipes(): HasMany
    {
        return $this->hasMany(ProductRecipe::class);
    }

    public function getWarrantyDays(Country $country)
    {
        return $country->is_eu ? $this->attributes['eu_warranty_days'] : $this->attributes['non_eu_warranty_days'];
    }

}
