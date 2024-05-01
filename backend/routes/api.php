<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Order\OrderController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Restaurant\RestaurantController;
use App\Http\Controllers\YouCanPay\YouCanPayController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function () {

    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {

    Route::put('/update-user-profile', [ProfileController::class, 'updateUserInfo']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/add-restaurant', [RestaurantController::class, 'createRestaurant']);
    Route::post('/update-restaurant', [RestaurantController::class, 'updateRestaurant']);
    Route::get('/get-user-restaurant', [RestaurantController::class, 'getUserRestaurant']);

    Route::post('/store-order', [OrderController::class, 'storeOrder']);
    Route::post('/pay-order/{orderId}', [YouCanPayController::class, 'createToken']);
    Route::post('/mark-order-aspaid/{orderId}', [OrderController::class, 'markOrderAsPaid']);
});

Route::get('/get-restaurants/{country}', [RestaurantController::class, 'getRestaurants']);
Route::get('/get-restaurant/{restaurantId}', [RestaurantController::class, 'getRestaurantById']);
