<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function get_all_products()
    {
        $products = Product::all();
        return response()->json([
            'products' => $products
        ], 200);
    }

    public function add_new(Request $request)
    {
        $product = new Product();

        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();
    }

    public function get_edit_product($id)
    {
        $product = Product::find($id);
        return response()->json([
            'product' => $product
        ], 200);
    }

    public function update_product(Request $request, $id)
    {
        $product = Product::find($id);
        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();
    }

    public function delete_product($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
    }
}
