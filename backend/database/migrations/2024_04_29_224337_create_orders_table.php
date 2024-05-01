<?php

use App\Models\Order;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->decimal("total_price", 8, 2);
            $table->enum("status", [Order::STATUS_PLACED, Order::STATUS_PAID, Order::STATUS_IN_PROGRESS, Order::STATUS_OUT_FOR_DELIVERY, Order::STATUS_DELIVERED])->default(Order::STATUS_PLACED);
            $table->foreignId("user_id")->constrained('users');
            $table->foreignId("restaurant_id")->constrained('restaurants');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
