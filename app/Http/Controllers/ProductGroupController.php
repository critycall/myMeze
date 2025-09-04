<?php

namespace App\Http\Controllers;

use App\Models\ProductGroup;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use function Laravel\Prompts\error;

class ProductGroupController extends Controller
{
    public function index(): Response
    {
        $productGroups = ProductGroup::query()->when(request()->search, function ($query) {
            return $query->where('name', 'like', '%' . request()->search . '%');
        })->orderBy('position')
            ->paginate(10);

        return Inertia::render('product-groups/index', [
            'productGroups' => $productGroups,
            'search' => request()->search,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('product-groups/create', []);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|unique:product_categories,name',
            'position' => 'required|numeric|unique:product_categories,position',
        ]);

        ProductGroup::query()->create([
            'name' => $request->get('name'),
            'position' => $request->get('position'),
        ]);

        return Redirect::route('product-groups.index', [
            'search' => $request->get('name'),
        ]);
    }

    public function destroy(ProductGroup $productGroup): RedirectResponse
    {
        try {
            $productGroup->delete();
        } catch (QueryException $exception) {
            error($exception->getMessage());
            return Redirect::route('product-groups.index')
                ->withErrors($productGroup->name . __(' is linked to a product.'));
        }

        return Redirect::route('product-groups.index');
    }

    public function update(Request $request, ProductGroup $productGroup): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|integer',
        ]);

        $productGroup->update($validated);

        return Redirect::route('product-groups.index', [
            'search' => $productGroup->name,
        ]);
    }
}
