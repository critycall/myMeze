<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', []);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'] )->name('dashboard');

    Route::resource('product-registrations', \App\Http\Controllers\ProductRegistrationController::class);

    Route::get('collections/spare-parts', [\App\Http\Controllers\ProductController::class, 'spareParts'])->name('parts');

    Route::get('collections/accessories', [\App\Http\Controllers\ProductController::class, 'accessories'])->name('accessories');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

require __DIR__ . '/management.php';
