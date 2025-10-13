<?php

namespace App\Http\Controllers;

use App\Models\Product;

use App\Models\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductServiceController extends Controller
{
    public function index(): Response
    {
        $services = ProductService::with('product')
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

        return Inertia::render('product-services/index', [
            'search' => request('search'),
            'productServices' => $services,
            'products' => $products,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        $validated['is_active'] = $request->boolean('is_active');

        $productService = ProductService::create($validated);

        return redirect()->route('product-services.index');
    }

    public function destroy(ProductService $productService): RedirectResponse
    {
        $productService->delete();

        return redirect()->route('product-services.index');
    }

    public function update(Request $request, ProductService $productService): RedirectResponse
    {
        $validated = $request->validate($this->rules());
        $validated['is_active'] = $request->boolean('is_active');

        $productService->update($validated);

        return redirect()->route('product-services.index', $productService);

    }

    protected function rules(): array
    {
        return [
            'product_id' => 'required|integer|exists:products,id',
            'price' => 'required|numeric|min:0',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'warranty_days' => 'required|integer|min:0',
        ];
    }
}
