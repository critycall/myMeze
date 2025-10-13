<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductService extends Model
{
    protected $fillable = [
        'product_id',
        'price',
        'name',
        'description',
        'is_active',
        'warranty_days',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}
