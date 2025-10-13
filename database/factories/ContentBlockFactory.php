<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ContentBlockFactory extends Factory
{

    public function definition(): array
    {
        return [
            'key' => Str::slug($this->faker->unique()->words(3, true)),
            'title' => $this->faker->sentence(3),
            'body' => $this->faker->paragraph,
        ];
    }


}
