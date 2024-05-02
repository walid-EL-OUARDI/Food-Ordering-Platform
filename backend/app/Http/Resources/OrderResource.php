<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new AuthResource($this->whenLoaded('user')),
            'total_price' => $this->total_price,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'menus' => MenuResource::collection($this->whenLoaded('menus')),
            'restaurant' => new RestaurantResource($this->whenLoaded('restaurant')),
        ];
    }
}
