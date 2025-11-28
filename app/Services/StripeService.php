<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function createSession(array $data)
    {
        return Session::create($data);
    }
}
