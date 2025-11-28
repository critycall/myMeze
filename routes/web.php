<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductRegistrationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'] )->name('dashboard');
    Route::get('/', [DashboardController::class, 'index'] )->name('home');

    Route::get('warranty', [DashboardController::class, 'warranty'] )->name('warranty');

    Route::get('support/{tab?}', [DashboardController::class, 'support'] )->name('support');

    Route::resource('product-registrations', ProductRegistrationController::class);

    Route::get('collections/spare-parts', [ProductController::class, 'spareParts'])->name('parts');

    Route::get('collections/accessories', [ProductController::class, 'accessories'])->name('accessories');

    Route::post('/contact', [ContactController::class, 'sendContact'])->middleware('throttle:5,1');

    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('cart.index');
        Route::get('/data', [CartController::class, 'data'])->name('cart.data');
        Route::post('/add', [CartController::class, 'addItem'])->name('cart.add');
        Route::post('/shipping-cost', [CartController::class, 'calculateShippingCost'])->name('cart.shipping-cost');
        Route::put('/item/{cartItem}', [CartController::class, 'update'])->name('cart.item.update');
        Route::delete('/item/{cartItem}', [CartController::class, 'remove'])->name('cart.item.remove');
    });

    Route::prefix('orders')->group(function () {
        Route::post('/store/{cart}', [OrderController::class, 'store'])->name('orders.store');
        Route::get('/{order}/payment', [OrderController::class, 'payment'])->name('orders.payment');
        Route::get('/{order}/success', [OrderController::class, 'success'])->name('orders.success');
        Route::get('/{order}/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');
        Route::get('/{order}', [OrderController::class, 'show'])->name('orders.show');
        Route::get('/', [OrderController::class, 'index'])->name('orders.index');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

require __DIR__ . '/management.php';
