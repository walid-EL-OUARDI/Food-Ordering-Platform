<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\RestaurantRequest;
use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;
use App\Services\FileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    public function getRestaurantData(Request $request)
    {
        try {

            $restaurant = $request->user()->restaurant()->first();
            if (!$restaurant) {
                return response()->json([
                    'message' => "User hasn't created a restaurant yet ",
                ], Response::HTTP_OK);
            }
            return response()->json([
                'restaurantData' => new RestaurantResource($restaurant->load('menus')),
            ], Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed getting restaurant data',
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function createRestaurant(RestaurantRequest $request, FileService $fileService)
    {
        try {
            $imageUrl = $fileService->uploadRestaurantImage($request->image);
            $restaurant = $request->user()->restaurant()->create([
                'name' => $request->name,
                'country' =>  $request->country,
                'city' =>  $request->city,
                'delivery_price' =>  $request->delivery_price,
                'estimated_delivery_time' => $request->estimated_delivery_time,
                'cuisines' => json_encode($request->cuisines),
                'image_url' => $imageUrl,
            ]);

            foreach ($request->menus as $menu) {
                $restaurant->menus()->create([
                    'name' => $menu['name'],
                    'price' =>  $menu['price'],
                ]);
            }
            return response()->json([
                'message' => 'Restaurant created successfully',
                'restaurantData' => new RestaurantResource($restaurant->load('menus')),
            ], Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to create restaurant',
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateRestaurant(RestaurantRequest $request, FileService $fileService)
    {
        try {
            $restaurant = $request->user()->restaurant()->first();
            Storage::delete('public/restaurant_images/' . basename($restaurant->image_url));

            $imageUrl = $fileService->uploadRestaurantImage($request->image);
            $restaurant->update([
                'name' => $request->name,
                'country' =>  $request->country,
                'city' =>  $request->city,
                'delivery_price' =>  $request->delivery_price,
                'estimated_delivery_time' => $request->estimated_delivery_time,
                'cuisines' => json_encode($request->cuisines),
                'image_url' => $imageUrl,
            ]);

            foreach ($request->menus as $menu) {
                $restaurant->menus()->update([
                    'name' => $menu['name'],
                    'price' =>  $menu['price'],
                ]);
            }
            return response()->json([
                'message' => 'Restaurant updated successfully',
                'restaurantData' => new RestaurantResource($restaurant->load('menus')),
            ], Response::HTTP_OK);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Failed to update restaurant',
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
