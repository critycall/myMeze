<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use App\Models\ProductGroup;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);

        return [
            'sku' => strtoupper(Str::random(12)),
            'name' => $name,
            'msrp' => $this->faker->randomFloat(2, 10, 999), // between 10 and 999
            'slug' => Str::slug($name) . '-' . Str::random(5),
            'description' => $this->faker->sentence(),
            'position' => $this->faker->numberBetween(1, 100),
            'status' => $this->faker->randomElement(['draft', 'active', 'archived', 'discontinued']),
            'material_id' => rand(1000,9999),
            'product_category_id' => ProductCategory::factory(),
            'product_group_id' => ProductGroup::factory(),
        ];
    }
}
