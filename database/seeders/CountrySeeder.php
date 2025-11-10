<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            array(
                "id" => 1,
                "name" => "UAE",
                "shortcut" => "UAE",
                "currency_id" => 155,
                "international_code" => "AE",
                "is_eu" => false
            ),
            array(
                "id" => 2,
                "name" => "Trinidad and Tobago",
                "shortcut" => "TAT",
                "currency_id" => 155,
                "international_code" => "TAT",
                "is_eu" => false
            ),
            array(
                "id" => 3,
                "name" => "Chile",
                "shortcut" => "Cl",
                "currency_id" => 155,
                "international_code" => "CL",
                "is_eu" => false
            ),
            array(
                "id" => 4,
                "name" => "Saudi Arabia",
                "shortcut" => "SA",
                "currency_id" => 155,
                "international_code" => "SA",
                "is_eu" => false
            ),
            array(
                "id" => 11,
                "name" => "Argentina",
                "shortcut" => "AR",
                "currency_id" => 47,
                "international_code" => "AR",
                "is_eu" => false
            ),
            array(
                "id" => 15,
                "name" => "Austria",
                "shortcut" => "AT",
                "currency_id" => 47,
                "international_code" => "AT",
                "is_eu" => true,
            ),
            array(
                "id" => 16,
                "name" => "South Africa",
                "shortcut" => "AS",
                "currency_id" => 155,
                "international_code" => "ZA",
                "is_eu" => false
            ),
            array(
                "id" => 22,
                "name" => "Belgium",
                "shortcut" => "BE",
                "currency_id" => 47,
                "international_code" => "BE",
                "is_eu" => true,
            ),
            array(
                "id" => 31,
                "name" => "Brazil",
                "shortcut" => "BR",
                "currency_id" => 155,
                "international_code" => "BR",
                "is_eu" => false
            ),
            array(
                "id" => 33,
                "name" => "Hong Kong",
                "shortcut" => "HK",
                "currency_id" => 344,
                "international_code" => "HK",
                "is_eu" => false
            ),
            array(
                "id" => 34,
                "name" => "Bulgaria",
                "shortcut" => "BG",
                "currency_id" => 47,
                "international_code" => "BG",
                "is_eu" => true,
            ),
            array(
                "id" => 41,
                "name" => "Switzerland",
                "shortcut" => "SUI",
                "currency_id" => 47,
                "international_code" => "CH",
                "is_eu" => false
            ),
            array(
                "id" => 44,
                "name" => "Canada",
                "shortcut" => "CA",
                "currency_id" => 124,
                "international_code" => "CA",
                "is_eu" => false
            ),
            array(
                "id" => 45,
                "name" => "China",
                "shortcut" => "CN",
                "currency_id" => 155,
                "international_code" => "CN",
                "is_eu" => false
            ),
            array(
                "id" => 47,
                "name" => "Norway",
                "shortcut" => "NOR",
                "currency_id" => 47,
                "international_code" => "NOR",
                "is_eu" => false
            ),
            array(
                "id" => 55,
                "name" => "Paraguay",
                "shortcut" => "PY",
                "currency_id" => 155,
                "international_code" => "PY",
                "is_eu" => false
            ),
            array(
                "id" => 56,
                "name" => "Croatia",
                "shortcut" => "HR",
                "currency_id" => 960,
                "international_code" => "HR",
                "is_eu" => true,
            ),
            array(
                "id" => 57,
                "name" => "Cyprus",
                "shortcut" => "CY",
                "currency_id" => 47,
                "international_code" => "CY",
                "is_eu" => true,
            ),
            array(
                "id" => 58,
                "name" => "Czechia",
                "shortcut" => "CZ",
                "currency_id" => 47,
                "international_code" => "CZ",
                "is_eu" => true,
            ),
            array(
                "id" => 59,
                "name" => "Denmark",
                "shortcut" => "DK",
                "currency_id" => 47,
                "international_code" => "DK",
                "is_eu" => true,
            ),
            array(
                "id" => 60,
                "name" => "Columbia",
                "shortcut" => "CO",
                "currency_id" => 123,
                "international_code" => "CO",
                "is_eu" => false
            ),
            array(
                "id" => 61,
                "name" => "Australia",
                "shortcut" => "AU",
                "currency_id" => 155,
                "international_code" => "AU",
                "is_eu" => false
            ),
            array(
                "id" => 62,
                "name" => "Indonesia",
                "shortcut" => "ID",
                "currency_id" => 155,
                "international_code" => "ID",
                "is_eu" => false
            ),
            array(
                "id" => 63,
                "name" => "Philippines",
                "shortcut" => "PHI",
                "currency_id" => 123,
                "international_code" => "PHI",
                "is_eu" => false
            ),
            array(
                "id" => 65,
                "name" => "Singapore",
                "shortcut" => "SG",
                "currency_id" => 155,
                "international_code" => "SG",
                "is_eu" => false
            ),
            array(
                "id" => 68,
                "name" => "Estonia",
                "shortcut" => "EE",
                "currency_id" => 47,
                "international_code" => "EE",
                "is_eu" => true,
            ),
            array(
                "id" => 73,
                "name" => "Finland",
                "shortcut" => "FI",
                "currency_id" => 47,
                "international_code" => "FI",
                "is_eu" => true,
            ),
            array(
                "id" => 74,
                "name" => "France",
                "shortcut" => "FR",
                "currency_id" => 47,
                "international_code" => "FR",
                "is_eu" => true,
            ),
            array(
                "id" => 81,
                "name" => "Germany",
                "shortcut" => "DE",
                "currency_id" => 47,
                "international_code" => "DE",
                "is_eu" => true,
            ),
            array(
                "id" => 82,
                "name" => "Japan",
                "shortcut" => "JP",
                "currency_id" => 155,
                "international_code" => "JP",
                "is_eu" => false
            ),
            array(
                "id" => 84,
                "name" => "Greece",
                "shortcut" => "EL",
                "currency_id" => 47,
                "international_code" => "EL",
                "is_eu" => true,
            ),
            array(
                "id" => 91,
                "name" => "India",
                "shortcut" => "IN",
                "currency_id" => 155,
                "international_code" => "IN",
                "is_eu" => false
            ),
            array(
                "id" => 98,
                "name" => "Hungary",
                "shortcut" => "HU",
                "currency_id" => 47,
                "international_code" => "HU",
                "is_eu" => true,
            ),
            array(
                "id" => 99,
                "name" => "Vietnam",
                "shortcut" => "VN",
                "currency_id" => 155,
                "international_code" => "VN",
                "is_eu" => false
            ),
            array(
                "id" => 104,
                "name" => "Ireland",
                "shortcut" => "IE",
                "currency_id" => 47,
                "international_code" => "IE",
                "is_eu" => true,
            ),
            array(
                "id" => 107,
                "name" => "Italy",
                "shortcut" => "IT",
                "currency_id" => 47,
                "international_code" => "IT",
                "is_eu" => true,
            ),
            array(
                "id" => 126,
                "name" => "Lithuania",
                "shortcut" => "LT",
                "currency_id" => 47,
                "international_code" => "LT",
                "is_eu" => true,
            ),
            array(
                "id" => 127,
                "name" => "Luxembourg",
                "shortcut" => "LU",
                "currency_id" => 47,
                "international_code" => "LU",
                "is_eu" => true,
            ),
            array(
                "id" => 135,
                "name" => "Malta",
                "shortcut" => "MT",
                "currency_id" => 47,
                "international_code" => "MT",
                "is_eu" => true,
            ),
            array(
                "id" => 136,
                "name" => "Montenegro",
                "shortcut" => "XM",
                "currency_id" => 123,
                "international_code" => "ME",
                "is_eu" => false
            ),
            array(
                "id" => 137,
                "name" => "Malaysia",
                "shortcut" => "MY",
                "currency_id" => 155,
                "international_code" => "MY",
                "is_eu" => false
            ),
            array(
                "id" => 153,
                "name" => "Netherlands",
                "shortcut" => "NL",
                "currency_id" => 47,
                "international_code" => "NL",
                "is_eu" => true,
            ),
            array(
                "id" => 173,
                "name" => "Peru",
                "shortcut" => "PE",
                "currency_id" => 123,
                "international_code" => "PE",
                "is_eu" => false
            ),
            array(
                "id" => 174,
                "name" => "Poland",
                "shortcut" => "PL",
                "currency_id" => 47,
                "international_code" => "PL",
                "is_eu" => true,
            ),
            array(
                "id" => 175,
                "name" => "Portugal",
                "shortcut" => "PT",
                "currency_id" => 47,
                "international_code" => "PT",
                "is_eu" => true,
            ),
            array(
                "id" => 179,
                "name" => "Romania",
                "shortcut" => "RO",
                "currency_id" => 123,
                "international_code" => "RO",
                "is_eu" => true,
            ),
            array(
                "id" => 196,
                "name" => "Slovakia",
                "shortcut" => "SK",
                "currency_id" => 47,
                "international_code" => "SK",
                "is_eu" => true,
            ),
            array(
                "id" => 197,
                "name" => "Slovenia",
                "shortcut" => "SI",
                "currency_id" => 47,
                "international_code" => "SI",
                "is_eu" => true,
            ),
            array(
                "id" => 202,
                "name" => "Spain",
                "shortcut" => "ES",
                "currency_id" => 47,
                "international_code" => "ES",
                "is_eu" => true,
            ),
            array(
                "id" => 208,
                "name" => "Sweden",
                "shortcut" => "SE",
                "currency_id" => 47,
                "international_code" => "SE",
                "is_eu" => true,
            ),
            array(
                "id" => 211,
                "name" => "Taiwan",
                "shortcut" => "TW",
                "currency_id" => 155,
                "international_code" => "TW",
                "is_eu" => false
            ),
            array(
                "id" => 212,
                "name" => "Turkey",
                "shortcut" => "TK",
                "currency_id" => 123,
                "international_code" => "TK",
                "is_eu" => false
            ),
            array(
                "id" => 213,
                "name" => "Thailand",
                "shortcut" => "TA",
                "currency_id" => 155,
                "international_code" => "TA",
                "is_eu" => false
            ),
            array(
                "id" => 228,
                "name" => "United Kingdom",
                "shortcut" => "GB",
                "currency_id" => 47,
                "international_code" => "GB",
                "is_eu" => false
            ),
            array(
                "id" => 229,
                "name" => "United States",
                "shortcut" => "US",
                "currency_id" => 155,
                "international_code" => "US",
                "is_eu" => false
            ),
            array(
                "id" => 230,
                "name" => "Ukraine",
                "shortcut" => "UA",
                "currency_id" => 155,
                "international_code" => "UA",
                "is_eu" => false
            ),
            array(
                "id" => 247,
                "name" => "Latvia",
                "shortcut" => "LAT",
                "currency_id" => 47,
                "international_code" => "LAT",
                "is_eu" => true,
            ),
            array(
                "id" => 250,
                "name" => "Russia",
                "shortcut" => "RUS",
                "currency_id" => 155,
                "international_code" => "RU",
                "is_eu" => false
            ),
            array(
                "id" => 251,
                "name" => "Moldova",
                "shortcut" => "MDA",
                "currency_id" => 47,
                "international_code" => "MD",
                "is_eu" => false
            ),
            array(
                "id" => 257,
                "name" => "Belarus",
                "shortcut" => "BLR",
                "currency_id" => 123,
                "international_code" => "BLR",
                "is_eu" => false
            ),
            array(
                "id" => 260,
                "name" => "Bangladesh",
                "shortcut" => "BGD",
                "currency_id" => 155,
                "international_code" => "BGD",
                "is_eu" => false
            ),
            array(
                "id" => 300,
                "name" => "Kazahstan",
                "shortcut" => "KAZ",
                "currency_id" => 47,
                "international_code" => "KAZ",
                "is_eu" => false
            ),
            array(
                "id" => 425,
                "name" => "Israel",
                "shortcut" => "ISR",
                "currency_id" => 155,
                "international_code" => "IL",
                "is_eu" => false
            ),
            array(
                "id" => 450,
                "name" => "South Korea",
                "shortcut" => "KOR",
                "currency_id" => 155,
                "international_code" => "KR",
                "is_eu" => false
            ),
            array(
                "id" => 451,
                "name" => "New Zealand",
                "shortcut" => "ID",
                "currency_id" => 155,
                "international_code" => "NZ",
                "is_eu" => false
            ),
            array(
                "id" => 454,
                "name" => "Armenia",
                "shortcut" => "ARM",
                "currency_id" => 47,
                "international_code" => "AM",
                "is_eu" => false
            ),
            array(
                "id" => 455,
                "name" => "Liechtenstein",
                "shortcut" => "LI",
                "currency_id" => 47,
                "international_code" => "LI",
                "is_eu" => false
            ),
            array(
                "id" => 456,
                "name" => "Bolivia",
                "shortcut" => "BOL",
                "currency_id" => 155,
                "international_code" => "BOL",
                "is_eu" => false
            ),
            array(
                "id" => 457,
                "name" => "Ecuador",
                "shortcut" => "ECU",
                "currency_id" => 155,
                "international_code" => "ECU",
                "is_eu" => false
            ),
            array(
                "id" => 458,
                "name" => "Martinique",
                "shortcut" => "MQ",
                "currency_id" => 47,
                "international_code" => "MQ",
                "is_eu" => false
            ),
            array(
                "id" => 459,
                "name" => "Mexic",
                "shortcut" => "MX",
                "currency_id" => 155,
                "international_code" => "MX",
                "is_eu" => false
            ),
            array(
                "id" => 460,
                "name" => "Costa Rica",
                "shortcut" => "CR",
                "currency_id" => 155,
                "international_code" => "CR",
                "is_eu" => false
            ),
            array(
                "id" => 461,
                "name" => "Belize",
                "shortcut" => "BZ",
                "currency_id" => 155,
                "international_code" => "BZ",
                "is_eu" => false
            ),
            array(
                "id" => 462,
                "name" => "Panama",
                "shortcut" => "PA",
                "currency_id" => 155,
                "international_code" => '',
                "is_eu" => false
            ),
            array(
                "id" => 466,
                "name" => "Iles St-Pierre et Miquelon",
                "shortcut" => "SPM",
                "currency_id" => 47,
                "international_code" => '',
                "is_eu" => false
            ),
            array(
                "id" => 467,
                "name" => "Reunion",
                "shortcut" => "RE",
                "currency_id" => 47,
                "international_code" => '',
                "is_eu" => false
            )
        ];

        Country::insert($countries);
    }
}
