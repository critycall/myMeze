<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class ProductRegistration extends Model
{
    use HasUuids;

    protected $fillable = [
        'product_id', 'user_id', 'nickname', 'serial_number',
    ];

    protected $casts = [
        'created_at' => 'datetime:d M Y',
    ];

    protected $appends = [
        'can_extend_warranty',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getCanExtendWarrantyAttribute(): bool
    {
        if (isset($this->material_service_id)) {
            return false;
        }

        if (!isset($this->purchase_date)) {
            return false;
        }

        if ($this->purchase_date < now()->subDays(0)) {
            return false;
        }

        return true;
    }
}
