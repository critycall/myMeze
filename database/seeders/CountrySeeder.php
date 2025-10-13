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
                "international_code" => "AE"
            ),
            array(
                "id" => 2,
                "name" => "Trinidad and Tobago",
                "shortcut" => "TAT",
                "currency_id" => 155,
                "international_code" => "TAT"
            ),
            array(
                "id" => 3,
                "name" => "Chile",
                "shortcut" => "Cl",
                "currency_id" => 155,
                "international_code" => "CL"
            ),
            array(
                "id" => 4,
                "name" => "Saudi Arabia",
                "shortcut" => "SA",
                "currency_id" => 155,
                "international_code" => "SA"
            ),
            array(
                "id" => 11,
                "name" => "Argentina",
                "shortcut" => "AR",
                "currency_id" => 47,
                "international_code" => "AR"
            ),
            array(
                "id" => 15,
                "name" => "Austria",
                "shortcut" => "AT",
                "currency_id" => 47,
                "international_code" => "AT"
            ),
            array(
                "id" => 16,
                "name" => "South Africa",
                "shortcut" => "AS",
                "currency_id" => 155,
                "international_code" => "ZA"
            ),
            array(
                "id" => 22,
                "name" => "Belgium",
                "shortcut" => "BE",
                "currency_id" => 47,
                "international_code" => "BE"
            ),
            array(
                "id" => 31,
                "name" => "Brazil",
                "shortcut" => "BR",
                "currency_id" => 155,
                "international_code" => "BR"
            ),
            array(
                "id" => 33,
                "name" => "Hong Kong",
                "shortcut" => "HK",
                "currency_id" => 344,
                "international_code" => "HK"
            ),
            array(
                "id" => 34,
                "name" => "Bulgaria",
                "shortcut" => "BG",
                "currency_id" => 47,
                "international_code" => "BG"
            ),
            array(
                "id" => 41,
                "name" => "Switzerland",
                "shortcut" => "SUI",
                "currency_id" => 47,
                "international_code" => "CH"
            ),
            array(
                "id" => 44,
                "name" => "Canada",
                "shortcut" => "CA",
                "currency_id" => 124,
                "international_code" => "CA"
            ),
            array(
                "id" => 45,
                "name" => "China",
                "shortcut" => "CN",
                "currency_id" => 155,
                "international_code" => "CN"
            ),
            array(
                "id" => 47,
                "name" => "Norway",
                "shortcut" => "NOR",
                "currency_id" => 47,
                "international_code" => "NOR"
            ),
            array(
                "id" => 55,
                "name" => "Paraguay",
                "shortcut" => "PY",
                "currency_id" => 155,
                "international_code" => "PY"
            ),
            array(
                "id" => 56,
                "name" => "Croatia",
                "shortcut" => "HR",
                "currency_id" => 960,
                "international_code" => "HR"
            ),
            array(
                "id" => 57,
                "name" => "Cyprus",
                "shortcut" => "CY",
                "currency_id" => 47,
                "international_code" => "CY"
            ),
            array(
                "id" => 58,
                "name" => "Czechia",
                "shortcut" => "CZ",
                "currency_id" => 47,
                "international_code" => "CZ"
            ),
            array(
                "id" => 59,
                "name" => "Denmark",
                "shortcut" => "DK",
                "currency_id" => 47,
                "international_code" => "DK"
            ),
            array(
                "id" => 60,
                "name" => "Columbia",
                "shortcut" => "CO",
                "currency_id" => 123,
                "international_code" => "CO"
            ),
            array(
                "id" => 61,
                "name" => "Australia",
                "shortcut" => "AU",
                "currency_id" => 155,
                "international_code" => "AU"
            ),
            array(
                "id" => 62,
                "name" => "Indonesia",
                "shortcut" => "ID",
                "currency_id" => 155,
                "international_code" => "ID"
            ),
            array(
                "id" => 63,
                "name" => "Philippines",
                "shortcut" => "PHI",
                "currency_id" => 123,
                "international_code" => "PHI"
            ),
            array(
                "id" => 65,
                "name" => "Singapore",
                "shortcut" => "SG",
                "currency_id" => 155,
                "international_code" => "SG"
            ),
            array(
                "id" => 68,
                "name" => "Estonia",
                "shortcut" => "EE",
                "currency_id" => 47,
                "international_code" => "EE"
            ),
            array(
                "id" => 73,
                "name" => "Finland",
                "shortcut" => "FI",
                "currency_id" => 47,
                "international_code" => "FI"
            ),
            array(
                "id" => 74,
                "name" => "France",
                "shortcut" => "FR",
                "currency_id" => 47,
                "international_code" => "FR"
            ),
            array(
                "id" => 77,
                "name" => "Marketing EURO",
                "shortcut" => "Mk",
                "currency_id" => 47,
                "international_code" => null
            ),
            array(
                "id" => 78,
                "name" => "Marketing USD",
                "shortcut" => "Mk",
                "currency_id" => 155,
                "international_code" => null
            ),
            array(
                "id" => 81,
                "name" => "Germany",
                "shortcut" => "DE",
                "currency_id" => 47,
                "international_code" => "DE"
            ),
            array(
                "id" => 82,
                "name" => "Japan",
                "shortcut" => "JP",
                "currency_id" => 155,
                "international_code" => "JP"
            ),
            array(
                "id" => 84,
                "name" => "Greece",
                "shortcut" => "EL",
                "currency_id" => 47,
                "international_code" => "EL"
            ),
            array(
                "id" => 91,
                "name" => "India",
                "shortcut" => "IN",
                "currency_id" => 155,
                "international_code" => "IN"
            ),
            array(
                "id" => 98,
                "name" => "Hungary",
                "shortcut" => "HU",
                "currency_id" => 47,
                "international_code" => "HU"
            ),
            array(
                "id" => 99,
                "name" => "Vietnam",
                "shortcut" => "VN",
                "currency_id" => 155,
                "international_code" => "VN"
            ),
            array(
                "id" => 104,
                "name" => "Ireland",
                "shortcut" => "IE",
                "currency_id" => 47,
                "international_code" => "IE"
            ),
            array(
                "id" => 107,
                "name" => "Italy",
                "shortcut" => "IT",
                "currency_id" => 47,
                "international_code" => "IT"
            ),
            array(
                "id" => 126,
                "name" => "Lithuania",
                "shortcut" => "LT",
                "currency_id" => 47,
                "international_code" => "LT"
            ),
            array(
                "id" => 127,
                "name" => "Luxembourg",
                "shortcut" => "LU",
                "currency_id" => 47,
                "international_code" => "LU"
            ),
            array(
                "id" => 135,
                "name" => "Malta",
                "shortcut" => "MT",
                "currency_id" => 47,
                "international_code" => "MT"
            ),
            array(
                "id" => 136,
                "name" => "Montenegro",
                "shortcut" => "XM",
                "currency_id" => 123,
                "international_code" => "ME"
            ),
            array(
                "id" => 137,
                "name" => "Malaysia",
                "shortcut" => "MY",
                "currency_id" => 155,
                "international_code" => "MY"
            ),
            array(
                "id" => 153,
                "name" => "Netherlands",
                "shortcut" => "NL",
                "currency_id" => 47,
                "international_code" => "NL"
            ),
            array(
                "id" => 173,
                "name" => "Peru",
                "shortcut" => "PE",
                "currency_id" => 123,
                "international_code" => "PE"
            ),
            array(
                "id" => 174,
                "name" => "Poland",
                "shortcut" => "PL",
                "currency_id" => 47,
                "international_code" => "PL"
            ),
            array(
                "id" => 175,
                "name" => "Portugal",
                "shortcut" => "PT",
                "currency_id" => 47,
                "international_code" => "PT"
            ),
            array(
                "id" => 179,
                "name" => "Romania",
                "shortcut" => "RO",
                "currency_id" => 123,
                "international_code" => "RO"
            ),
            array(
                "id" => 196,
                "name" => "Slovakia",
                "shortcut" => "SK",
                "currency_id" => 47,
                "international_code" => "SK"
            ),
            array(
                "id" => 197,
                "name" => "Slovenia",
                "shortcut" => "SI",
                "currency_id" => 47,
                "international_code" => "SI"
            ),
            array(
                "id" => 202,
                "name" => "Spain",
                "shortcut" => "ES",
                "currency_id" => 47,
                "international_code" => "ES"
            ),
            array(
                "id" => 208,
                "name" => "Sweden",
                "shortcut" => "SE",
                "currency_id" => 47,
                "international_code" => "SE"
            ),
            array(
                "id" => 211,
                "name" => "Taiwan",
                "shortcut" => "TW",
                "currency_id" => 155,
                "international_code" => "TW"
            ),
            array(
                "id" => 212,
                "name" => "Turkey",
                "shortcut" => "TK",
                "currency_id" => 123,
                "international_code" => "TK"
            ),
            array(
                "id" => 213,
                "name" => "Thailand",
                "shortcut" => "TA",
                "currency_id" => 155,
                "international_code" => "TA"
            ),
            array(
                "id" => 228,
                "name" => "United Kingdom",
                "shortcut" => "GB",
                "currency_id" => 47,
                "international_code" => "GB"
            ),
            array(
                "id" => 229,
                "name" => "United States",
                "shortcut" => "US",
                "currency_id" => 155,
                "international_code" => "US"
            ),
            array(
                "id" => 230,
                "name" => "Ukraine",
                "shortcut" => "UA",
                "currency_id" => 155,
                "international_code" => "UA"
            ),
            array(
                "id" => 247,
                "name" => "Latvia",
                "shortcut" => "LAT",
                "currency_id" => 47,
                "international_code" => "LAT"
            ),
            array(
                "id" => 250,
                "name" => "Russia",
                "shortcut" => "RUS",
                "currency_id" => 155,
                "international_code" => "RU"
            ),
            array(
                "id" => 251,
                "name" => "Moldova",
                "shortcut" => "MDA",
                "currency_id" => 47,
                "international_code" => "MD"
            ),
            array(
                "id" => 257,
                "name" => "Belarus",
                "shortcut" => "BLR",
                "currency_id" => 123,
                "international_code" => "BLR"
            ),
            array(
                "id" => 260,
                "name" => "Bangladesh",
                "shortcut" => "BGD",
                "currency_id" => 155,
                "international_code" => "BGD"
            ),
            array(
                "id" => 300,
                "name" => "Kazahstan",
                "shortcut" => "KAZ",
                "currency_id" => 47,
                "international_code" => "KAZ"
            ),
            array(
                "id" => 425,
                "name" => "Israel",
                "shortcut" => "ISR",
                "currency_id" => 155,
                "international_code" => "IL"
            ),
            array(
                "id" => 450,
                "name" => "South Korea",
                "shortcut" => "KOR",
                "currency_id" => 155,
                "international_code" => "KR"
            ),
            array(
                "id" => 451,
                "name" => "New Zealand",
                "shortcut" => "ID",
                "currency_id" => 155,
                "international_code" => "NZ"
            ),
            array(
                "id" => 454,
                "name" => "Armenia",
                "shortcut" => "ARM",
                "currency_id" => 47,
                "international_code" => "AM"
            ),
            array(
                "id" => 455,
                "name" => "Liechtenstein",
                "shortcut" => "LI",
                "currency_id" => 47,
                "international_code" => "LI"
            ),
            array(
                "id" => 456,
                "name" => "Bolivia",
                "shortcut" => "BOL",
                "currency_id" => 155,
                "international_code" => "BOL"
            ),
            array(
                "id" => 457,
                "name" => "Ecuador",
                "shortcut" => "ECU",
                "currency_id" => 155,
                "international_code" => "ECU"
            ),
            array(
                "id" => 458,
                "name" => "Martinique",
                "shortcut" => "MQ",
                "currency_id" => 47,
                "international_code" => "MQ"
            ),
            array(
                "id" => 459,
                "name" => "Mexic",
                "shortcut" => "MX",
                "currency_id" => 155,
                "international_code" => "MX"
            ),
            array(
                "id" => 460,
                "name" => "Costa Rica",
                "shortcut" => "CR",
                "currency_id" => 155,
                "international_code" => "CR"
            ),
            array(
                "id" => 461,
                "name" => "Belize",
                "shortcut" => "BZ",
                "currency_id" => 155,
                "international_code" => "BZ"
            ),
            array(
                "id" => 462,
                "name" => "Panama",
                "shortcut" => "PA",
                "currency_id" => 155,
                "international_code" => null
            ),
            array(
                "id" => 466,
                "name" => "Iles St-Pierre et Miquelon",
                "shortcut" => "SPM",
                "currency_id" => 47,
                "international_code" => null
            ),
            array(
                "id" => 467,
                "name" => "Reunion",
                "shortcut" => "RE",
                "currency_id" => 47,
                "international_code" => null
            )
        ];

        Country::insert($countries);
    }
}
