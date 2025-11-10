<?php

namespace App\Http\Requests\Product;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use App\Enums\ProductStatus;

class ProductUpdateRequest extends FormRequest
{

    public function rules(): array
    {
        $productId = $this->route('product')?->id;
        $activeRequired = 'required_if:status,' . ProductStatus::Active->value . ',' . ProductStatus::Published->value;

        return [
            'sku' => ['string', 'required', Rule::unique('products', 'sku')->ignore($productId)],
            'name' => ['string', 'required'],
            'status' => ['string', 'required'],
            'ean' => ['string', 'nullable'],
            'upc' => ['string', 'nullable'],
            'eu_warranty_days' => ['integer', 'nullable', $activeRequired],
            'non_eu_warranty_days' => ['integer', 'nullable', $activeRequired],
            'description' => ['string', 'nullable'],
            'position' => ['integer', 'nullable', $activeRequired],
           // 'product_category_id' => ['integer', 'nullable', 'exists:product_categories,id'],
           // 'product_group_id' => ['integer', 'nullable', 'exists:product_groups,id'],
            'material_id' => ['integer', 'nullable', $activeRequired],
            'msrp' => ['integer', 'nullable', $activeRequired],
            'media_files' => ['nullable', 'array'],
            'media_files.*' => ['file', 'mimes:jpg,jpeg,png,gif,webp', 'max:10240'],
            'media_order' => ['nullable', 'array'],
            'weight' => ['integer', 'nullable', $activeRequired],
        ];
    }

}
