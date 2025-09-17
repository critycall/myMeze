<?php

namespace App\Models;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $casts = [
        'status' => ProductStatus::class,
    ];

    protected $fillable = [
        'sku', 'name', 'barcode', 'description', 'status', 'position', 'slug', 'quantity', 'msrp'
    ];
}
