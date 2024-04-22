<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'country' => $this->country,
            'city' => $this->city,
            'delivery_price' => $this->delivery_price,
            'estimated_delivery_time' => $this->estimated_delivery_time,
            'cuisines' => json_decode($this->cuisines),
            'menus' => MenuResource::collection($this->whenLoaded('menus')),
            'image_url' => $this->image_url,
        ];
    }
}
