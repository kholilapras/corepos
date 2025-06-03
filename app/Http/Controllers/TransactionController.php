<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('cashier/index', compact('products'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        // Ambil semua produk dalam satu query
        $productIds = collect($data['items'])->pluck('product_id')->all();
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        // Hitung total dan validasi stok
        $total = 0;
        foreach ($data['items'] as $item) {
            $product = $products[$item['product_id']];
            $quantity = $item['quantity'];

            if ($product->stock < $quantity) {
                return back()->withErrors([
                    'stock' => "Stock tidak mencukupi untuk produk: {$product->name}",
                ]);
            }

            $total += $product->price * $quantity;
        }

        // Simpan transaksi secara atomic
        DB::transaction(function () use ($data, $products, $total) {
            $transaction = Transaction::create([
                'invoice_number' => 'INV-' . now()->timestamp,
                'total_price' => $total,
            ]);

            foreach ($data['items'] as $item) {
                $product = $products[$item['product_id']];
                $quantity = $item['quantity'];

                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'subtotal' => $product->price * $quantity,
                ]);

                $product->decrement('stock', $quantity);
            }
        });

        return redirect()->route('cashier.index')->with('success', 'Transaction completed');
    }
}
