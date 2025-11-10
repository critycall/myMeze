<?php

namespace App\Models;


use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


class ProductRegistration extends Model implements HasMedia
{
    use HasUuids, InteractsWithMedia;

    protected $fillable = [
        'product_id', 'user_id', 'nickname', 'serial_number', 'purchase_date', 'bought_from', 'receipt', 'first_name',
        'last_name', 'country_id', 'address', 'warranty_days', 'default_warranty_days',
    ];

    protected $casts = [
        'created_at' => 'datetime:d M Y',
        'purchase_date' => 'datetime:d M Y',
    ];

    protected $appends = [
        'can_extend_warranty',
        'remaining_warranty_days',
        'expiration_date',
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

        if ($this->purchase_date < now()->subDays(700)) {
            return false;
        }

        return true;
    }

    public function getRemainingWarrantyDaysAttribute(): int
    {
        if (!isset($this->purchase_date)) {
            return -1;
        }

        $elapsedDays = Carbon::parse($this->getRawOriginal('purchase_date'))->diffInDays(today());
        return $this->warranty_days - $elapsedDays;
    }

    public function getExpirationDateAttribute(): string
    {
        if (!isset($this->purchase_date)) {
            return '';
        }

        return Carbon::parse($this->getRawOriginal('purchase_date'))->format('d M Y');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('receipts')
            ->useDisk('private');
    }
}
