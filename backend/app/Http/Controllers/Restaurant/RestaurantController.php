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
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    public function getUserRestaurant(Request $request): JsonResponse
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
    public function createRestaurant(RestaurantRequest $request, FileService $fileService): JsonResponse
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

    public function updateRestaurant(RestaurantRequest $request, FileService $fileService): JsonResponse
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

    public  function getRestaurants(Request $request, string $country)

    {
        try {
            $searchParams = $request->all();
            $restaurants = Restaurant::query()->where('country', $country);
            $city = Arr::get($searchParams, 'searchQuery', '');
            $cuisines = Arr::get($searchParams, 'cuisines', '');
            $sortOption = Arr::get($searchParams, 'sortOption', '');

            if ($city) {
                $restaurants->where('city', $city);
            }

            if ($sortOption) {
                $restaurants->orderBy($sortOption);
            }

            if ($cuisines) {
                $cuisines = explode(',', $request->cuisines);
                $restaurants->whereJsonContains('cuisines', $cuisines);
            }
            $restaurants = $restaurants->paginate(5);

            return response()->json([
                "restaurants" => RestaurantResource::collection($restaurants),
                "meta" => [
                    "total" => $restaurants->total(),
                    "pages" => $restaurants->lastPage(),
                    "page" => $restaurants->currentPage(),
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getRestaurantById(int $restaurantId)
    {
        try {
            $restaurant = Restaurant::find($restaurantId);
            if ($restaurant) {
                return response()->json([
                    "restaurant" => new RestaurantResource($restaurant->load('menus')),
                ]);
            }
            return response()->json([
                "restaurant" => [],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
