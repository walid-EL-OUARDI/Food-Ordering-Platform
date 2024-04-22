<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class FileService
{
    public function uploadRestaurantImage($image)
    {
        $imageName = time() . '.' . $image->extension();
        $image->storeAs('public/restaurant_images', $imageName);
        $imageUrl = Storage::url('restaurant_images/' . $imageName);
        return $imageUrl;
    }
}
