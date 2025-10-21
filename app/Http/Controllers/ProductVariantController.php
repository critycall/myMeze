<?php

namespace App\Http\Controllers;

use App\Models\ProductVariant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class ProductVariantController extends Controller
{
    public function destroy(ProductVariant $productVariant): RedirectResponse
    {
        $productId = $productVariant->product_id;

        $productVariant->delete();

        return Redirect::route('product-registration.edit', $productId);
    }
}
