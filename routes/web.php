<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductRegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', []);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'] )->name('dashboard');

    Route::get('warranty', [DashboardController::class, 'warranty'] )->name('warranty');

    Route::get('support/{tab?}', [DashboardController::class, 'support'] )->name('support');

    Route::resource('product-registrations', ProductRegistrationController::class);

    Route::get('collections/spare-parts', [ProductController::class, 'spareParts'])->name('parts');

    Route::get('collections/accessories', [ProductController::class, 'accessories'])->name('accessories');

    Route::post('/contact', [ContactController::class, 'sendContact'])->middleware('throttle:5,1');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

require __DIR__ . '/management.php';
