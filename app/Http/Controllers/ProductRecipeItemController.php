<?php

namespace App\Http\Controllers;

use App\Models\ProductRecipe;
use App\Models\ProductRecipeItem;
use Illuminate\Http\Request;

class ProductRecipeItemController extends Controller
{
    public function store(ProductRecipe $productRecipe, Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => 'integer|min:1',
            'position' => 'integer|min:1',
            'product_id' => 'required|integer|exists:products,id',
            'details' => 'string|nullable',
        ]);
        $productRecipe->items()->create($validated);

        return redirect()->route('product-recipes.edit', $productRecipe);
    }

    public function destroy(ProductRecipe $productRecipe, ProductRecipeItem $item): \Illuminate\Http\RedirectResponse
    {
        $item->delete();

        return redirect()
            ->route('product-recipes.edit', $productRecipe);
    }
}
