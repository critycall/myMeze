<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $appends = ['symbol'];
    public function getSymbolAttribute(): string
    {
        return match ($this->id) {
            47 => '€',
            155 => '$',
            123 => 'RON',
            default => '',
        };
    }
}
