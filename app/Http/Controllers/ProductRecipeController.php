<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\ProductRecipeStoreRequest;
use App\Http\Requests\Product\ProductRecipeUpdateRequest;
use App\Models\Product;
use App\Models\ProductRecipe;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductRecipeController extends Controller
{
    public function index(): Response
    {
        $recipes = ProductRecipe::with('product')
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%');
                $query->orWhereHas('product', function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%');
                });
            })->paginate(10);

        $products = Product::all(['id', 'name'])->map(function ($item) {
            return [
                'value' => $item->id,
                'label' => $item->name,
            ];
        });

        return Inertia::render('product-recipes/index', [
            'search' => request('search'),
            'productRecipes' => $recipes,
            'products' => $products,
        ]);
    }

    public function store(ProductRecipeStoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active');

        $productRecipe = ProductRecipe::create($validated);

        return redirect()->route('product-recipes.edit', $productRecipe->id);
    }

    public function edit(ProductRecipe $productRecipe): Response
    {
        $products = Product::all(['id', 'name'])->map(function ($item) {
            return [
                'value' => $item->id,
                'label' => $item->name,
            ];
        });

        $productRecipe->load('items.product', 'product');

        return Inertia::render('product-recipes/edit', [
            'recipe' => $productRecipe,
            'products' => $products,
        ]);
    }

    public function destroy(ProductRecipe $productRecipe): RedirectResponse
    {
        $productRecipe->delete();

        return redirect()->route('product-recipes.index');
    }

    public function update(ProductRecipeUpdateRequest $request, ProductRecipe $productRecipe): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active');

        $productRecipe->update($validated);

        return redirect()->route('product-recipes.edit', $productRecipe);

    }
}
