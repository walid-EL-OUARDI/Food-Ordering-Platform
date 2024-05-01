<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class OrderController extends Controller
{
    public function storeOrder(Request $request)
    {
        try {
            $request->validate([
                "restaurantId" => "required|string",
                "cartItems" => "required|array",
                "cartItems.*.name" => "required|string|max:255",
                "cartItems.*.price" => "required|numeric",
                "cartItems.*.quantity" => "required|numeric",
            ]);

            $user = $request->user();
            $restaurant = Restaurant::find($request->restaurantId);
            if (!$restaurant) {
                throw new NotFoundResourceException('Restaurant not found');
            }
            DB::beginTransaction();

            $order = Order::create([
                'total_price' => 0,
                'status' => Order::STATUS_PLACED,
                'user_id' => $user->id,
                'restaurant_id' => $restaurant->id,
            ]);
            foreach ($request->cartItems as $cartItem) {
                $menu = Menu::where('name', $cartItem['name'])->first();
                $menu->orders()->attach($order->id, ['quantity' =>  $cartItem['quantity']]);
                $order->total_price += $cartItem['quantity'] * $menu->price;
            }
            $order->save();
            DB::commit();
            return response()->json(["order" => new OrderResource($order->load('menus'))]);;
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to create order',
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function markOrderAsPaid($orderId)
    {
        try {
            DB::beginTransaction();
            $order = Order::find($orderId);
            if (!$order) {
                throw new NotFoundResourceException('Order not found');
            }

            $order->status = Order::STATUS_PAID;
            $order->save();
            DB::commit();
            return response()->json(["order" => new OrderResource($order->load('menus'))]);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to create order',
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
