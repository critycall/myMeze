<?php

namespace App\Enums;

enum OrderStatus: string
{
    case Open = 'open';
    case Confirmed = 'confirmed';
    case Fulfilled = 'fulfilled';
    case PartiallyFulfilled = 'partially_fulfilled';
    case Cancelled = 'cancelled';
    case Refunded = 'refunded';
    case Archived = 'archived';

    public function label(): string
    {
        return match ($this) {
            self::Open => 'Open',
            self::Confirmed => 'Confirmed',
            self::Fulfilled => 'Fulfilled',
            self::PartiallyFulfilled => 'Partially Fulfilled',
            self::Cancelled => 'Cancelled',
            self::Refunded => 'Refunded',
            self::Archived => 'Archived',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Open => 'gray',
            self::Confirmed => 'blue',
            self::Fulfilled => 'green',
            self::PartiallyFulfilled => 'amber',
            self::Cancelled => 'red',
            self::Refunded => 'yellow',
            self::Archived => 'slate',
        };
    }
}
