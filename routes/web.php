<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', []);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', []);
    })->name('dashboard');

    Route::resource('product-categories', App\Http\Controllers\ProductCategoryController::class)
        ->except(['edit', 'show']);

    Route::resource('product-groups', \App\Http\Controllers\ProductGroupController::class)
        ->except(['edit', 'show']);

    Route::resource('product-recipes', \App\Http\Controllers\ProductRecipeController::class)
        ->except(['show']);

    Route::resource('product-recipes.items', \App\Http\Controllers\ProductRecipeItemController::class);

    Route::resource('products', \App\Http\Controllers\ProductController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
