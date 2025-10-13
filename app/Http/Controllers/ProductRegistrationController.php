<?php

namespace App\Http\Controllers;

use App\Enums\ProductStatus;
use App\Models\Country;
use App\Models\Product;
use App\Models\ProductRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductRegistrationController extends Controller
{
    public function index()
    {

    }

    public function create(): \Inertia\Response
    {
        $products = Product::where('status', ProductStatus::Active)->get()
            ->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->name,
                ];
            });

        $countries = Country::orderBy('name')->get()
            ->map(function ($item) {
                return [
                    'value' => $item->id,
                    'label' => $item->name,
                ];
            });

        $previousRegistration = auth()->user()->productRegistrations()->latest()->first();

        return Inertia::render('product-registrations/create', [
            'products' => $products,
            'countries' => $countries,
            'previousRegistration' => $previousRegistration,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product' => 'required|exists:products,id',
            'serial_number' => 'string',
            'nickname' => 'nullable|string',
        ]);

        $productRegistration = ProductRegistration::create([
            'product_id' => $validated['product'],
            'serial_number' => $validated['serial_number'],
            'nickname' => $validated['nickname'],
            'user_id' => auth()->id(),
        ]);

        return Redirect::route('product-registration.show', $productRegistration->id);
    }

    public function show(ProductRegistration $productRegistration): \Inertia\Response
    {
        $productRegistration->load('product.services', 'product.latestRecipe.items.product');

        return Inertia::render('product-registrations/show', [
            'productRegistration' => $productRegistration,
        ]);
    }
}
