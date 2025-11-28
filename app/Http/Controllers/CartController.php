<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Country;
use App\Models\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function addItem(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'item_type' => 'required|string',
            'item_id' => 'required|integer',
            'variant_id' => 'nullable|integer|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'product_registration_id' => 'nullable|string|exists:product_registrations,id',
        ]);

        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);

        if ($validated['item_type'] === ProductService::class) {
            if (empty($validated['product_registration_id'])) {
                return redirect()->back()->withErrors('Adding a service in cart requires a product registration.');
            }

            $existingService = $cart->items()
                ->where('item_type', ProductService::class)
                ->where('product_registration_id', $validated['product_registration_id'])
                ->first();

            if ($existingService) {
                return redirect()->back()->withErrors('A service for this product is already added to the cart. Remove the item from cart and try again.');
            }
        }

        $cart->items()->updateOrCreate(
            [
                'item_type' => $validated['item_type'],
                'item_id' => $validated['item_id'],
                'variant_id' => $validated['variant_id'] ?? null,
            ],
            [
                'quantity' => DB::raw('quantity + ' . $validated['quantity']),
                'price' => $validated['price'],
                'product_registration_id' => $validated['product_registration_id'] ?? null,
            ]
        );

        return redirect()->back()->with('success', 'Item added to your cart.');
    }


    public function data(): JsonResponse
    {
        $cart = $this->getUserCart();

        return response()->json($this->formatCart($cart));
    }

    public function update(Request $request, CartItem $cartItem): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        abort_if($cartItem->cart->user_id !== $request->user()->id, 403);

        $cartItem->update(['quantity' => $validated['quantity']]);

        $cart = $this->getUserCart();

        return response()->json([
            'success' => true,
            'message' => 'Item updated.',
            ...$this->formatCart($cart),
        ]);
    }

    public function remove(Request $request, CartItem $cartItem): JsonResponse
    {
        abort_if($cartItem->cart->user_id !== $request->user()->id, 403);

        $cartItem->delete();

        $cart = $this->getUserCart();

        return response()->json([
            'success' => true,
            'message' => 'Item removed.',
            ...$this->formatCart($cart),
        ]);
    }

    /**
     * Helper: fetch cart with relations.
     */
    protected function getUserCart(): Cart
    {
        return Cart::with('items.item', 'items.variant', 'items.productRegistration.product')
            ->firstOrCreate(['user_id' => auth()->id()]);
    }

    /**
     * Helper: standard JSON structure for cart.
     */
    protected function formatCart(Cart $cart): array
    {
        return [
            'count' => $cart->items->sum('quantity'),
            'items' => $cart->items->map(fn($item) => [
                'id' => $item->id,
                'name' => $item->item->name,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'subtotal' => $item->total,
                'thumbnail' => $item->item->thumbnail,
                'variant' => $item?->variant,
                'product_registration' => $item?->productRegistration,
            ]),
            'subtotal' => $cart->subtotal,
            'weight' => $cart->items->sum('weight'),
        ];
    }

    public function index(): Response|RedirectResponse
    {
        if ($this->getUserCart()->items->count() === 0) {
            return redirect()->route('dashboard');
        }

        $countries = Country::all(['id', 'name'])->map(function ($item) {
            return [
                'value' => $item->id,
                'label' => $item->name,
            ];
        });

        return Inertia::render('cart/index', [
            'cart_id' => $this->getUserCart()->id,
            'countries' => $countries,
        ]);
    }

    public function calculateShippingCost(Request $request)
    {
        $validated = $request->validate([
            'country_id' => 'required|integer|exists:countries,id',
            'postal_code' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ]);

        $weight = $this->getUserCart()->items->append('weight')->sum('weight');

        if ($weight) {
            $shipping = $this->getShippingRate($request , $weight);
        } else {
            $shipping = 0;
        }

        return response()->json([
            'shipping_cost' => round($shipping),
            'estimated_days' => $weight,
            'digital' => !$weight,
        ]);
    }

    private function getShippingRate(Request $request, float $weight): float
    {
        $cart = $this->getUserCart();
        if ($cart->subtotal > 1000){
            return 0;
        }

        return $weight * 10;
    }

}
