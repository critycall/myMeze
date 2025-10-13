<?php

namespace App\Http\Controllers;

use App\Models\ContentBlock;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(): \Inertia\Response
    {
        $productRegistrations = auth()->user()->productRegistrations;
        $productRegistrations->load('product');

        $firstRegistrationContent = ContentBlock::where('key', 'register-first-headphone')->first();
        $registerAnotherHeadphone = ContentBlock::where('key', 'register-another-headphone')->first();

        return Inertia::render('dashboard', [
            'productRegistrations' => $productRegistrations,
            'registerFirstProduct' => $firstRegistrationContent,
            'registerAnotherHeadphone' => $registerAnotherHeadphone,
        ]);
    }
}
