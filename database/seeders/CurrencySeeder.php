<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $currencies = [
            array(
                "id" => 36,
                "shortcut" => "AUD",
                "name" => "Dolarul australian",
                "international_code" => "AUD",
                "visible" => 0
            ),
            array(
                "id" => 47,
                "shortcut" => "EUR",
                "name" => "Euro",
                "international_code" => "EUR",
                "visible" => 1
            ),
            array(
                "id" => 50,
                "shortcut" => "GBP",
                "name" => "Lira sterlina",
                "international_code" => "GBP",
                "visible" => 1
            ),
            array(
                "id" => 123,
                "shortcut" => "RON",
                "name" => "RON",
                "international_code" => "RON",
                "visible" => 1
            ),
            array(
                "id" => 124,
                "shortcut" => "CAD",
                "name" => "Dolarul canadian",
                "international_code" => "CAD",
                "visible" => 0
            ),
            array(
                "id" => 155,
                "shortcut" => "USD",
                "name" => "USD",
                "international_code" => "USD",
                "visible" => 1
            ),
            array(
                "id" => 203,
                "shortcut" => "CZK",
                "name" => "Coroana cehã",
                "international_code" => "CZK",
                "visible" => 0
            ),
            array(
                "id" => 208,
                "shortcut" => "DKK",
                "name" => "Coroana danezã",
                "international_code" => "DKK",
                "visible" => 0
            ),
            array(
                "id" => 250,
                "shortcut" => "CNY",
                "name" => "Chinese Yuan",
                "international_code" => "CNY",
                "visible" => 1
            ),
            array(
                "id" => 344,
                "shortcut" => "HKD",
                "name" => "Hong Kong Dollar",
                "international_code" => "HKD",
                "visible" => 1
            ),
            array(
                "id" => 348,
                "shortcut" => "HUF",
                "name" => "100 Forinþi maghiari",
                "international_code" => "HUF",
                "visible" => 0
            ),
            array(
                "id" => 356,
                "shortcut" => "INR",
                "name" => "Rupia indianã",
                "international_code" => "INR",
                "visible" => 0
            ),
            array(
                "id" => 392,
                "shortcut" => "JPY",
                "name" => "100 Yeni japonezi",
                "international_code" => "JPY",
                "visible" => 0
            ),
            array(
                "id" => 410,
                "shortcut" => "KRW",
                "name" => "100 Woni sud-coreeni",
                "international_code" => "KRW",
                "visible" => 0
            ),
            array(
                "id" => 498,
                "shortcut" => "MDL",
                "name" => "Leul moldovenesc",
                "international_code" => "MDL",
                "visible" => 0
            ),
            array(
                "id" => 643,
                "shortcut" => "RUB",
                "name" => "Rubla ruseascã",
                "international_code" => "RUB",
                "visible" => 0
            ),
            array(
                "id" => 752,
                "shortcut" => "SEK",
                "name" => "Coroana suedezã",
                "international_code" => "SEK",
                "visible" => 0
            ),
            array(
                "id" => 756,
                "shortcut" => "CHF",
                "name" => "Francul elveþian",
                "international_code" => "CHF",
                "visible" => 0
            ),
            array(
                "id" => 784,
                "shortcut" => "AED",
                "name" => "Dirhamul Emiratelor Arabe",
                "international_code" => "AED",
                "visible" => 0
            ),
            array(
                "id" => 818,
                "shortcut" => "EGP",
                "name" => "Lira egipteana",
                "international_code" => "EGP",
                "visible" => 0
            ),
            array(
                "id" => 959,
                "shortcut" => "XAU",
                "name" => "Gramul de aur",
                "international_code" => "XAU",
                "visible" => 0
            ),
            array(
                "id" => 960,
                "shortcut" => "HRK",
                "name" => "Kuna",
                "international_code" => "HRK",
                "visible" => 0
            )
        ];

        DB::table('currencies')->insert($currencies);
    }
}
