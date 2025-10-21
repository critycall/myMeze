<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'can:manage-app'])->group(function () {
    Route::resource('product-categories', App\Http\Controllers\ProductCategoryController::class)
        ->except(['edit', 'show']);

    Route::resource('product-groups', \App\Http\Controllers\ProductGroupController::class)
        ->except(['edit', 'show']);

    Route::resource('product-services', \App\Http\Controllers\ProductServiceController::class)
        ->except(['edit', 'show']);

    Route::resource('product-recipes', \App\Http\Controllers\ProductRecipeController::class)
        ->except(['show']);

    Route::resource('product-recipes.items', \App\Http\Controllers\ProductRecipeItemController::class)
        ->only(['store', 'destroy']);

    Route::resource('products', \App\Http\Controllers\ProductController::class)
        ->except(['create']);

    Route::resource('products.variants', \App\Http\Controllers\ProductVariantController::class);

    Route::resource('product-services', \App\Http\Controllers\ProductServiceController::class)
        ->except(['edit', 'show']);

    Route::resource('content-blocks', \App\Http\Controllers\ContentBlockController::class)
        ->except(['show']);

    Route::resource('tags', \App\Http\Controllers\TagController::class)
        ->except(['edit', 'show']);
});
