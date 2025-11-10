<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Queue\SerializesModels;

class ContactSupport extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public $topic, private readonly string $message, private readonly string $model)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Support - MyMeze Platform',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $user = auth()->user();
        return new Content(
            htmlString: new MailMessage()
                ->line('You received a new message')
                ->line('')
                ->line('**Sender details:**')
                ->line("Customer: **" . $user->last_name." ". $user->first_name . "**")
                ->line("Email: **" . $user->email . "**")
                ->line("Country: **" . $user->country->name . "**")
                ->line('')
                ->line('**Message details:**')
                ->line("Model name: **" . $this->model . "**")
                ->line("Message: " . $this->message)
                ->render(),
        );

    }
}
