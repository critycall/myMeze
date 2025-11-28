<?php

namespace App\Models;

namespace App\Models;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'currency_id',
        'first_name',
        'last_name',
        'phone',
        'country',
        'city',
        'postal_code',
        'county',
        'address',
        'billing_first_name',
        'billing_last_name',
        'billing_phone',
        'billing_country',
        'billing_city',
        'billing_postal_code',
        'billing_county',
        'billing_address',
        'subtotal',
        'tax',
        'shipping_cost',
        'total',
        'status',
        'payment_status',
        'currency_id',
        'country_id',
        'metadata'
    ];

    protected $casts = [
        'status' => OrderStatus::class,
        'payment_status' => PaymentStatus::class,
        'metadata' => 'array',
        'created_at' => 'datetime:d M Y',
    ];

    public static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {

            $prefix = config('app.order_prefix', 'MZM');

            $lastNumber = Order::select(DB::raw('MAX(CAST(SUBSTRING_INDEX(number, "-", -1) AS UNSIGNED)) as max_number'))
                ->value('max_number');
            $next = ($lastNumber ?? 0) + 1;

            $model->number = sprintf('%s-%06d', $prefix, $next);;
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
