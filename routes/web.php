<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AccountController;
use App\Models\Product;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('products', ProductController::class);
    Route::resource('cashier', TransactionController::class);
    Route::resource('account', AccountController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
