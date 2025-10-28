<?php

namespace App\Http\Controllers;

use App\Mail\ContactSupport;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function sendContact(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'topic'  => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            $request->validate([
                'g-recaptcha-response' => 'required|captcha',
            ]);
        } catch (ValidationException $e){
            dd($e->getMessage());
        }

        Mail::to('morar747@gmail.com')->send(new ContactSupport(
            topic: $validated['topic'],
            message: $validated['message'],
            model: $validated['model'],
        ));

        return redirect()->route('support', ['tab' => 'contact']);
    }
}
