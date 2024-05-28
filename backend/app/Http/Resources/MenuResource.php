<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($request->path() === 'api/get-user-orders' || $request->path() === 'api/get-restaurant-orders') {
            return [
                'name' => $this->name,
                'price' => $this->price,
                'quantity' => $this->pivot->quantity,
            ];
        } else {
            return [
                'name' => $this->name,
                'price' => $this->price,
            ];
        }
    }
}
