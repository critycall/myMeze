<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\LoginEmailCode;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    public function verify(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        $code = str_pad((string)random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $token = (string)Str::uuid();

        Cache::put(
            "login_code:{$token}",
            [
                'code' => $code,
                'user_id' => $user->id,
                'ip' => $request->ip(),
                'ua' => (string)$request->userAgent(),
            ],
            now()->addMinutes(11)
        );

        $request->session()->put('auth_token', $token);

        Mail::to($user->email)->send(new LoginEmailCode($code));

        return redirect()->route('login.confirm')->with('status', 'An one-time password code has been sent to your email.');
    }

    public function confirm(Request $request): Response
    {
        return Inertia::render('auth/otp', [
            'status' => $request->session()->get('status')
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
