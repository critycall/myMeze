<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Models\ProductRegistration;
use App\Models\ProductService;
use Illuminate\Support\Str;

class OrderService
{

    /**
     * @param Order $order
     * @return array[]
     */
    public function getOrderItems(Order $order): array
    {
        $lineItems = [];

        $currency = Str::lower($order->currency->international_code);

        foreach ($order->items as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => $currency,
                    'product_data' => [
                        'name' => $item->name,
                        'description' => $item->description,
                    ],
                    'unit_amount' => $item->price * 100,
                ],
                'quantity' => $item->quantity,

            ];
        }

        if ($order->shipping_cost) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => $currency,
                    'product_data' => [
                        'name' => 'Shipping Cost',
                    ],
                    'unit_amount' => $order->shipping_cost * 100,
                ],
                'quantity' => 1

            ];
        }

        return $lineItems;
    }

    public function handleSuccessAction(Order $order)
    {
        foreach ($order->items as $item) {

            if ($item['metadata']['item_type'] == ProductService::class) {
                $productRegistration = ProductRegistration::find($item['metadata']['product_registration_id']);
                $productService = ProductService::find($item['metadata']['item_id']);

                $productRegistration->warranty_days += $productService->warranty_days;
                $productRegistration->productService()->associate($productService);

                if ($order->items->every(fn ($item) => !empty($item->metadata['product_registration_id']))) {
                    $order->status = OrderStatus::Fulfilled;
                } else {
                    $order->status = OrderStatus::PartiallyFulfilled;
                }

                $productRegistration->save();
            }
        }

        $order->payment_status = PaymentStatus::Paid;
        $order->save();

    }
}
