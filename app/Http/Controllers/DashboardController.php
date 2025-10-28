<?php

namespace App\Http\Controllers;

use App\Models\ContentBlock;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
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

    public function warranty(): Response
    {
        return Inertia::render('warranty', []);
    }

    public function support(string $tab = 'FAQ'): Response
    {
        $selfServiceContent = ContentBlock::whereHas('tags')->get();

        $selfServiceContent = $selfServiceContent->groupBy(fn($contentBlock) => $contentBlock->tags->first()->name);

        return Inertia::render('support', [
            'tab' => $tab,
            'selfServiceContent' => $selfServiceContent,
        ]);
    }
}
