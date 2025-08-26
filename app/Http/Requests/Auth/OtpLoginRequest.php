<?php

namespace App\Http\Requests\Auth;

use App\Mail\LoginEmailCode;
use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OtpLoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'exists:users,email'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function verify(): string
    {
        $this->ensureIsNotRateLimited();

        RateLimiter::hit($this->throttleKey());

        $user = User::where('email', $this->email)->firstOrFail();

        $code = str_pad((string)random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $token = (string)Str::uuid();

        Cache::put(
            "login_code:{$token}",
            [
                'code' => $code,
                'user_id' => $user->id,
                'ip' => $this->ip(),
                'ua' => (string)$this->userAgent(),
                'remember' => $this->boolean('remember'),
            ],
            now()->addMinutes(11)
        );

        $this->session()->put('auth_token', $token);

        Mail::to($user->email)->send(new LoginEmailCode($code));

        return 'An one-time password code has been sent to your email.';
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 2)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return $this->string('email')
            ->lower()
            ->append('|'.$this->ip())
            ->transliterate()
            ->value();
    }
}
