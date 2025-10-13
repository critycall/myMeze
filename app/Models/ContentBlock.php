<?php

namespace App\Models;

use App\Traits\FormatsMedia;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ContentBlock extends Model implements HasMedia
{
    use InteractsWithMedia, FormatsMedia, HasFactory;

    protected $fillable = ['key', 'title', 'body', 'action', 'action_name'];

    protected $appends = ['background', 'mobileBackground'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('background')
            ->withResponsiveImages()
            ->singleFile();

        $this->addMediaCollection('mobileBackground')
            ->withResponsiveImages()
            ->singleFile();
    }

    protected function background(): Attribute
    {
        return Attribute::get(function () {
            $media = $this->getFirstMedia('background');
            return $this->formatMedia($media);
        });
    }

    protected function getMobileBackgroundAttribute(): array
    {
        $media = $this->getFirstMedia('mobileBackground');
        return $this->formatMedia($media) ?? [];
    }

}
