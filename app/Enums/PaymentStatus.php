<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case Pending = 'pending';               // Awaiting payment
    case Authorized = 'authorized';         // Authorized but not captured
    case Paid = 'paid';                     // Captured / fully paid
    case PartiallyRefunded = 'partially_refunded';
    case Refunded = 'refunded';             // Fully refunded
    case Voided = 'voided';                 // Authorization voided or failed

    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::Authorized => 'Authorized',
            self::Paid => 'Paid',
            self::PartiallyRefunded => 'Partially Refunded',
            self::Refunded => 'Refunded',
            self::Voided => 'Voided',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Pending => 'gray',
            self::Authorized => 'blue',
            self::Paid => 'green',
            self::PartiallyRefunded => 'amber',
            self::Refunded => 'yellow',
            self::Voided => 'red',
        };
    }
}
