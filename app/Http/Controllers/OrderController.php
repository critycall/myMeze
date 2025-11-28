<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Services\OrderService;
use App\Services\StripeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;


class OrderController extends Controller
{
    public function store(StoreOrderRequest $request, Cart $cart): RedirectResponse
    {
        $data = $request->validated();

        abort_unless(auth()->id() === $cart->user_id, 403, 'Unauthorized cart access.');

        try {

            $order = DB::transaction(function () use ($cart, $data) {
                $order = Order::create([
                    'cart_id' => $cart->id,
                    'user_id' => auth()->id(),

                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'phone' => $data['phone'],
                    'country_id' => $data['country_id'],
                    'city' => $data['city'],
                    'postal_code' => $data['postal_code'],
                    'county' => $data['county'] ?? null,
                    'address' => $data['address'],
                    'notes' => $data['notes'] ?? null,

                    'billing_first_name' => $data['billing_first_name'],
                    'billing_last_name' => $data['billing_last_name'],
                    'billing_phone' => $data['billing_phone'],
                    'billing_country_id' => $data['billing_country_id'],
                    'billing_city' => $data['billing_city'],
                    'billing_postal_code' => $data['billing_postal_code'],
                    'billing_county' => $data['billing_county'],
                    'billing_address' => $data['billing_address'],

                    'shipping_cost' => $data['shipping_cost'],
                    'weight' => $cart->weight,
                    'total' => $cart->subtotal + $data['shipping_cost'],
                    'currency_id' => auth()->user()->currency_id,
                    'status' => OrderStatus::Open,
                    'payment_status' => PaymentStatus::Pending,
                ]);

                $order->items()->createMany(
                    $cart->items->map(function (CartItem $item) {
                        $metadata = [
                            'item_type' => $item->item::class,
                            'item_id' => $item->item->id,
                        ];

                        if ($item->productRegistration) {
                            $metadata['product_registration_id'] = $item->productRegistration->id;
                        }

                        if ($item->variant) {
                            $metadata['variant_id'] = $item->variant->id;
                        }

                        return [
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'subtotal' => $item->price * $item->quantity,
                            'total' => $item->price * $item->quantity,
                            'name' => $item->name,
                            'description' => $item->description,
                            'metadata' => $metadata,
                        ];
                    })->toArray()
                );

                $cart->delete();

                return $order;
            });

            return redirect(route('orders.payment', $order->id));

        } catch (\Throwable $e) {
            Log::error('Order creation failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->back()->withErrors('message', 'An unexpected error occurred during checkout.');
        }
    }

    public function payment(Order $order, StripeService $stripeService, OrderService $orderService): Response
    {
        $session = $stripeService->createSession([
            'mode' => 'payment',
            'success_url' => route('orders.success', $order->id) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('orders.cancel', ['order' => $order->id]),
            'line_items' => $orderService->getOrderItems($order),
        ]);

        $metadata = is_array($order->metadata) ? $order->metadata : [];
        $metadata['stripe_session_id'] = $session->id;
        $metadata['stripe_payment_intent'] = $session->payment_intent;

        $order->update(['metadata' => $metadata]);

        return Inertia::location($session->url);
    }

    public function success(Order $order, OrderService $orderService): RedirectResponse
    {
        abort_if($order->metadata['stripe_session_id'] !== request('session_id'), 403);

        $orderService->handleSuccessAction($order);

        return redirect()->route('orders.show', $order);
    }

    public function show(Order $order): \Inertia\Response
    {
        abort_if($order->user_id !== auth()->id(), 403);

        $order->load('items', 'currency');

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }

    public function index(): \Inertia\Response
    {
        $orders = Order::where('user_id', auth()->id())->with('items')
            ->orderBy('created_at', 'desc')
            ->with('currency')
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }
}
