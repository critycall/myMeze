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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->nullable();
            $table->string('name');
            $table->string('barcode')->nullable();
            $table->string('ean')->nullable();
            $table->string('upc')->nullable();
            $table->double('msrp')->nullable();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('position')->nullable();
            $table->unsignedSmallInteger('eu_warranty_days')->nullable();
            $table->unsignedSmallInteger('non_eu_warranty_days')->nullable();
            $table->enum('status', ['draft', 'active' , 'archived', 'discontinued', 'published'])->default('draft');
            $table->unsignedBigInteger('material_id')->nullable();

            $table->timestamps();
            $table->index(['product_category_id', 'product_group_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
