<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductRecipeStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'string|required',
            'description' => 'string|nullable',
            'product_id' => 'integer|required|exists:products,id',
            'version' => 'string|required',
        ];
    }
}
