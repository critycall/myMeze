<?php

namespace App\Http\Controllers;

use App\Enums\ProductStatus;
use App\Models\Country;
use App\Models\Product;
use App\Models\ProductRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductRegistrationController extends Controller
{
    public function index()
    {

    }

    public function create(): Response
    {
        $products = Product::where('status', ProductStatus::Published)->get()
            ->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->name,
                ];
            });


        $previousRegistration = auth()->user()->productRegistrations()->latest()->first();

        return Inertia::render('product-registrations/create', [
            'products' => $products,
            'previousRegistration' => $previousRegistration,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product' => 'required|exists:products,id',
            'serial_number' => 'string',
        ]);

        $productRegistration = ProductRegistration::create([
            'product_id' => $validated['product'],
            'serial_number' => $validated['serial_number'],
            'user_id' => auth()->id(),
        ]);

        return Redirect::route('product-registrations.edit', $productRegistration->id);
    }

    public function show(ProductRegistration $productRegistration): Response
    {
        $productRegistration->load('product.services', 'product.latestRecipe.items.product', 'productService');

        $tags = $productRegistration->product->tags->pluck('name')->toArray();

        $tags[] = 'Accessories';

        $accessories = Product::withAllTags($tags)
            ->where('status', ProductStatus::Active)
            ->with('variants')->get();

        return Inertia::render('product-registrations/show', [
            'productRegistration' => $productRegistration,
            'accessories' => $accessories,
        ]);
    }

    public function edit(ProductRegistration $productRegistration)
    {
        $productRegistration->load('product.services');

        $countries = Country::all()->map(function ($item) {
            return [
                'value' => $item->id,
                'label' => $item->name,
            ];
        });

        return Inertia::render('product-registrations/edit', [
            'productRegistration' => $productRegistration,
            'countries' => $countries,
        ]);
    }

    public function update(Request $request, ProductRegistration $productRegistration): RedirectResponse
    {
        if ($request->only(['nickname'])) {

            $validated = $request->validate([
                'nickname' => 'string|nullable|max:32',
            ]);

            $productRegistration->nickname = $validated['nickname'];
            $productRegistration->save();

            return Redirect::route('product-registrations.show', $productRegistration);
        }

        $validated = $request->validate([
            'purchase_date' => 'required|date',
            'bought_from' => 'required|string|max:255',
            'receipt' => 'required|file|mimes:jpeg,png,jpg,gif,webp,pdf|max:10240',
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'country_id' => 'exists:countries,id|required',
            'address' => 'required|string|max:512',
        ]);

        $country = Country::find($validated['country_id']);
        $validated['warranty_days'] = $productRegistration->product->getWarrantyDays($country);
        $validated['default_warranty_days'] = $validated['warranty_days'];
        $validated['currency_id'] = $country->getDefaultCurrencyId();
        $productRegistration->addMediaFromRequest('receipt')->toMediaCollection('receipts');
        unset($validated['receipt']);
        $productRegistration->update($validated);

        return redirect()->route('product-registrations.show', $productRegistration);
    }

    public function download(ProductRegistration $productRegistration)
    {
        return $productRegistration->media()->first();
    }
}
