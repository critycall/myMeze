<?php

namespace App\Models;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $casts = [
        'status' => ProductStatus::class,
    ];

    protected $fillable = [
        'sku', 'name', 'barcode', 'description', 'status', 'position', 'slug', 'quantity', 'msrp'
    ];
}
