<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
{
    $perPage = $request->get('per_page', 10);
    $search = $request->get('search', '');

    $query = Product::query();

    if ($search) {
        $query->where('product_name', 'like', "%{$search}%")
              ->orWhere('product_code', 'like', "%{$search}%");
    }

    $products = $query->orderBy('updated_at', 'desc')->paginate($perPage)->withQueryString();

    return Inertia::render('products/index', [
        'products' => $products,
        'filters' => [
            'search' => $search,
            'per_page' => (int) $perPage,
        ]
    ]);
}


    public function create()
    {
        return Inertia::render('products/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_code' => 'required|string|max:255',
            'product_name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/edit', ['product' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted.');
    }
}
