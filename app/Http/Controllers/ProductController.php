<?php

namespace App\Http\Controllers;

use App\Enums\ProductStatus;
use App\Http\Requests\Product\ProductStoreRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $search = request('search');

        $products = Product::when($search, function ($query, $search) {
            $query->whereAny(['name', 'sku', 'price'], 'like', "%{$search}%");
        })->paginate(10);

        return Inertia::render('products/index', [
            'products' => $products,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $categories = ProductCategory::all(['id', 'name'])->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        });
        $groups = ProductGroup::all(['id', 'name'])->map(function ($group) {
            return [
                'value' => $group->id,
                'label' => $group->name,
            ];
        });

        $statuses = collect(ProductStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => $status->name,
            ];
        });

        return Inertia::render('products/create', [
            'categories' => $categories,
            'groups' => $groups,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request)
    {
        $validated = $request->validated();

        $product = Product::create($validated);

        return redirect()->route('products.edit', $product->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): Response
    {
        $categories = ProductCategory::all(['id', 'name'])->map(function ($category) {
            return [
                'value' => $category->id,
                'label' => $category->name,
            ];
        });
        $groups = ProductGroup::all(['id', 'name'])->map(function ($group) {
            return [
                'value' => $group->id,
                'label' => $group->name,
            ];
        });

        $statuses = collect(ProductStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => $status->name,
            ];
        });

        return Inertia::render('products/edit', [
            'product' => $product,
            'categories' => $categories,
            'groups' => $groups,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}
