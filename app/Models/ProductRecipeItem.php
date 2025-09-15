<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductRecipeItem extends Model
{
    use HasFactory;

    protected $fillable = ['product_recipe_id', 'product_id', 'quantity', 'position', 'details'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
