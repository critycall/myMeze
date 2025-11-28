<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }


    public function rules(): array
    {
        return [
            // Shipping
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'phone' => 'required|string|max:30',
            'country_id' => 'required|integer|exists:countries,id',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'county' => 'nullable|string|max:100',
            'address' => 'required|string|max:255',

            // Billing
            'billing_first_name' => 'nullable|string|max:100',
            'billing_last_name' => 'nullable|string|max:100',
            'billing_phone' => 'nullable|string|max:30',
            'billing_country_id' => 'nullable|integer|exists:countries,id',
            'billing_city' => 'nullable|string|max:100',
            'billing_postal_code' => 'nullable|string|max:20',
            'billing_county' => 'nullable|string|max:100',
            'billing_address' => 'nullable|string|max:255',
            'shipping_cost' => 'required|numeric|min:0',

            // Misc
            'notes' => 'nullable|string|max:1000',
        ];


    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'Please enter your first name.',
            'last_name.required'  => 'Please enter your last name.',
            'country_id.required' => 'Please select your country.',
            'address.required'    => 'Please enter your address.',
        ];
    }

    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);

        foreach ([
                     'first_name', 'last_name', 'phone', 'country_id',
                     'city', 'postal_code', 'county', 'address',
                 ] as $field) {
            $billingKey = 'billing_' . $field;
            if (empty($validated[$billingKey]) && isset($validated[$field])) {
                $validated[$billingKey] = $validated[$field];
            }
        }

        return $validated;
    }

}
