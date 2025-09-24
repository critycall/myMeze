<?php

namespace App\Http\Requests\Product;

use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Enums\ProductStatus;

class ProductStoreRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'sku' => 'string|required|unique:products,sku',
            'name' => 'string|required',
        ];
    }

    public function validated($key = null, $default = null): array
    {
        $data = parent::validated($key, $default);

        $data['slug'] = $this->generateSlug($data['name']);

        return $data;
    }

    private function generateSlug(string $name, int $index = 0): string
    {
        $baseSlug = strtolower(
            trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name), '-')
        );

        $slug = $index > 0 ? "{$baseSlug}-{$index}" : $baseSlug;

        if (Product::where('slug', $slug)->exists()) {
            return $this->generateSlug($name, $index + 1);
        }

        return $slug;
    }

}
