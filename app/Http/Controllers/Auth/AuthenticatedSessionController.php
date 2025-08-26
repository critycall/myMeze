<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\OtpLoginRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\LoginEmailCode;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use function Laravel\Prompts\error;

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

    public function verify(OtpLoginRequest $request): RedirectResponse
    {
        try {
            $status = $request->verify();
        } catch (ValidationException $exception) {
            throw $exception;
        } catch (\Exception $exception) {

            Log::error('OTP verification failed', [
                'message' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
            return redirect()->route('login.password')->with('status', 'Authentication by OTP is currency unavailable please log in using email and password.');
        }

        return redirect()->route('login.confirm')->with('status', $status);
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
