<?php

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->string('number');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('currency_id')->constrained()->restrictOnDelete();

            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->foreignId('country_id')->nullable()->constrained()->nullOnDelete();
            $table->string('city');
            $table->string('postal_code');
            $table->string('county')->nullable();
            $table->string('address');

            $table->string('billing_first_name')->nullable();
            $table->string('billing_last_name')->nullable();
            $table->string('billing_phone')->nullable();
            $table->string('billing_country')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_postal_code')->nullable();
            $table->string('billing_county')->nullable();
            $table->string('billing_address')->nullable();

            $table->text('notes')->nullable();
            $table->text('remarks')->nullable();

            $table->string('tracking_number')->nullable();
            $table->foreignId('carrier_id')->nullable()->constrained()->nullOnDelete();

            $table->decimal('subtotal', 12, 2)->default(0);
            $table->decimal('shipping_cost', 12, 2)->default(0);
            $table->decimal('total', 12, 2)->default(0);

            $table->string('status')->default(OrderStatus::Open->value);
            $table->string('payment_status')->default(PaymentStatus::Pending->value);

            $table->json('metadata')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
