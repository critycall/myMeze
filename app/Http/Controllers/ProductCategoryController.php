<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductCategoryController extends Controller
{
    public function index(): Response
    {
        $productCategories = ProductCategory::when(request()->search, function ($query) {
            return $query->where('name', 'like', '%' . request()->search . '%');
        })->orderBy('position')
            ->paginate(10);

        return Inertia::render('product-categories/index', [
            'productCategories' => $productCategories,
            'search' => request()->search,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('product-categories/create', []);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|unique:product_categories,name',
            'position' => 'required|numeric|unique:product_categories,position',
        ]);

        ProductCategory::create([
            'name' => $request->get('name'),
            'position' => $request->get('position'),
        ]);

        return Redirect::route('product-categories.index',[
            'search' => $request->get('name'),
        ]);
    }

    public function destroy(ProductCategory $productCategory): RedirectResponse
    {
        $productCategory->delete();

        return Redirect::route('product-categories.index');
    }

    public function update(Request $request, ProductCategory $productCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|integer',
        ]);

        $productCategory->update($validated);

        return Redirect::route('product-categories.index', [
            'search' => $productCategory->name,
        ]);
    }
}
