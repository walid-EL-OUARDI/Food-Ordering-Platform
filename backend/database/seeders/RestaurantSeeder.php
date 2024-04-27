<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\Restaurant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    private $cuisineList = [
        "American",
        "BBQ",
        "Breakfast",
        "Burgers",
        "Cafe",
        "Chinese",
        "Desserts",
        "French",
        "Greek",
        "Healthy",
        "Indian",
        "Italian",
        "Japanese",
        "Mexican",
        "Noodles",
        "Organic",
        "Pasta",
        "Pizza",
        "Salads",
        "Seafood",
        "Spanish",
        "Steak",
        "Sushi",
        "Tacos",
        "Tapas",
        "Vegan",
    ];

    private $menus = [
        ['name' => 'Cheeseburger', 'price' => 80],
        ['name' => 'French Fries', 'price' => 40],
        ['name' => 'Milkshake', 'price' => 60],
    ];

    private $moroccanCities = ['Agadir', 'Tanger', 'Casablanca', 'Essaouira'];



    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            $restaurant = [
                'name' => 'Restaurant ' . ($i + 1),
                'country' => 'Morocco',
                'city' => $this->moroccanCities[array_rand($this->moroccanCities)],
                'delivery_price' => rand(10, 80),
                'estimated_delivery_time' => rand(10, 30),
                'image_url' => 'default_restaurant_image.jpg',
                'user_id' => $i + 1
            ];

            // Randomly select 3 cuisines
            $randomCuisines = array_rand($this->cuisineList, 3);
            $restaurant['cuisines'] = array_map(function ($index) {
                return $this->cuisineList[$index];
            }, $randomCuisines);

            // Insert restaurant into the database
            Restaurant::create($restaurant);

            foreach ($this->menus as $menu) {
                Menu::create([
                    'name' => $menu['name'],
                    'price' => $menu['price'],
                    'restaurant_id' => $i + 1,
                ]);
            }
        }
    }
}
