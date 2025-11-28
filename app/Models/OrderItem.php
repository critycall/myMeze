<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'quantity', 'name', 'description', 'price', 'subtotal', 'total', 'metadata'
    ];

    protected $casts = [
        'metadata' => 'array',
    ];
}
