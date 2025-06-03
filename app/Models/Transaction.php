<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'total_price',
    ];

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }
}
