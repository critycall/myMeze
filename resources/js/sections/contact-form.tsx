import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { CheckCircle2Icon, LoaderCircle } from 'lucide-react';
import React from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const FormContact = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const { data, setData, processing, post, errors, wasSuccessful, reset, transform } = useForm({
        model: '',
        topic: '',
        message: '',
        'g-recaptcha-response': '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (executeRecaptcha) {
            const token = await executeRecaptcha('contact_form');

            transform((data) => ({
                ...data,
                'g-recaptcha-response': token,
            }));

            post('/contact', {
                onSuccess: () => {
                    reset('message', 'topic', 'model');
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            {wasSuccessful && (
                <Alert className="bg-green-600/20 border-[#788F46] text-green-800">
                    <CheckCircle2Icon className="text-green-800"/>
                    <AlertTitle className="mt-1">Your message has been sent.</AlertTitle>
                </Alert>
            )}

            {!wasSuccessful && (
                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <label htmlFor="model">Model name</label>
                        <Input
                            id="model"
                            name="model"
                            type="text"
                            required
                            autoComplete="off"
                            placeholder="E.g.: 109 Pro"
                            value={data.model}
                            onChange={(e) => setData('model', e.target.value)}
                        />
                        {errors.model && <div className="text-sm text-destructive">{errors.model}</div>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="topic">Subject</label>
                        <Input
                            id="topic"
                            name="topic"
                            type="text"
                            required
                            autoComplete="off"
                            placeholder="E.g.: Warranty request"
                            value={data.topic}
                            onChange={(e) => setData('topic', e.target.value)}
                        />
                        {errors.topic && <div className="text-sm text-destructive">{errors.topic}</div>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="message">Message</label>
                        <Textarea
                            id="message"
                            name="message"
                            required
                            autoComplete="off"
                            placeholder="Type your message..."
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                        />
                        {errors.message && <div className="text-sm text-destructive">{errors.message}</div>}
                    </div>

                    {errors['g-recaptcha-response'] && <div className="text-sm text-destructive">{errors['g-recaptcha-response']}</div>}

                    <div className="grid gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Send message
                        </Button>
                    </div>
                </div>
            )}


        </form>
    );
};

const ContactForm = () => (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
        <FormContact />
    </GoogleReCaptchaProvider>
);

export default ContactForm;
