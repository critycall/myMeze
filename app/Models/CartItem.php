<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'item_type',
        'item_id',
        'variant_id',
        'quantity',
        'price',
        'product_registration_id',
        'metadata',
    ];

    protected $casts = [
        'price'    => 'decimal:2',
        'metadata' => 'array',
    ];
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function item(): MorphTo
    {
        return $this->morphTo();
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class);
    }

    public function productRegistration(): BelongsTo
    {
        return $this->belongsTo(ProductRegistration::class);
    }

    public function getTotalAttribute(): float
    {
        return $this->quantity * (float) $this->price;
    }

    public function getWeightAttribute(): float
    {
        return $this->item::class == Product::class ? $this->quantity * $this->item->weight /1000 : 0;
    }
}
