<?php

namespace App\Http\Controllers;

use App\Models\ProductRecipe;
use App\Models\ProductRecipeItem;
use Illuminate\Http\Request;

class ProductRecipeItemController extends Controller
{
    public function store(ProductRecipe $productRecipe, Request $request): \Illuminate\Http\RedirectResponse
    {
        $productRecipe->items()->create($request->all());

        return redirect()->route('product-recipes.edit', $productRecipe);
    }

    public function destroy(ProductRecipe $productRecipe, ProductRecipeItem $item): \Illuminate\Http\RedirectResponse
    {
        $item->delete();

        return redirect()
            ->route('product-recipes.edit', $productRecipe);
    }
}
