<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::post('/add_new', [ProductController::class, 'add_new']);
Route::get('/get_all_products', [ProductController::class, 'get_all_products']);
Route::get('/get_edit_product/{id}', [ProductController::class, 'get_edit_product']);
Route::put('/update_product/{id}', [ProductController::class, 'update_product']);
Route::delete('/delete_product/{id}', [ProductController::class, 'delete_product']);
