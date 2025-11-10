<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_registrations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('serial_number')->index();
            $table->string('nickname')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('address', 512)->nullable();
            $table->string('bought_from')->nullable();
            $table->date('purchase_date')->nullable();
            $table->unsignedInteger('default_warranty_days')->nullable();
            $table->unsignedInteger('warranty_days')->nullable();
            $table->foreignId('country_id')->nullable()->constrained();
            $table->foreignId('currency_id')->nullable()->constrained();
            $table->foreignId('product_id')->constrained();
            $table->foreignId('product_service_id')->nullable()->constrained();
            $table->boolean('has_warranty')->default(false);
            $table->boolean('checked')->default(false);
            $table->boolean('validated')->default(false);
            $table->softDeletes();
            $table->timestamps();

            $table->unique(['product_id', 'serial_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_registrations');
    }
};
