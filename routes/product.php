<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::middleware('auth')->group(function () {
    Route::redirect('products', 'products/index');
});
