import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
}

export default function Login({ status }: LoginProps) {
    return (

        <AuthLayout title="Log in to your account" description="Please enter the one-time password sent to your email">

            <Head title="Log in" />
            <Form method="post" action={route('login.confirm')} className="flex flex-col gap-6">
                {({ processing, errors, submit }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                 <Label htmlFor="otp">One-time password code</Label>
                                <InputOTP
                                    name="otp"
                                    onComplete={() => {
                                        submit();
                                    }}
                                    maxLength={6}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <InputError message={errors.email} />
                                <p className='text-muted-foreground text-xs'>
                                    Didn&apos;t get the code?{' '}
                                    <a href='#' className='text-primary hover:underline'>
                                        Resend code
                                    </a>
                                </p>

                            </div>

                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </div>
                    </>
                )}
            </Form>
            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}


            <div className="text-center text-sm text-muted-foreground">
                <TextLink href={route('login.password')} tabIndex={5}>
                    Log in using a password?{' '}
                </TextLink>
            </div>

            <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <TextLink href={route('register')} tabIndex={5}>
                    Sign up
                </TextLink>
            </div>

                   </AuthLayout>
    );
}
