<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i <10 ; $i++) { 
            User::create([
                'name'=>'walid'.$i,
                'email'=>'walid'.$i.'@gmail.com',
                'password'=>Hash::make('123456789')
            ]);
        }
    }
}
