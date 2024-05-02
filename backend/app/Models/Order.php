<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    const STATUS_PLACED = 'placed';
    const STATUS_PAID = 'paid';
    const STATUS_IN_PROGRESS = 'inProgress';
    const STATUS_OUT_FOR_DELIVERY = 'outForDelivery';
    const STATUS_DELIVERED = 'delivered';

    protected $guarded = [];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function menus()
    {
        return $this->belongsToMany(Menu::class)->withPivot('quantity');
    }
}
