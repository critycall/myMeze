<?php

namespace App\Helpers;

use Illuminate\Support\Collection;

class MezeInspiring
{
    public static function quotes(): Collection
    {
        return collect([
            [
                "quote" => "With Elite, we've created something that transcends all barriers of headphone design and engineering and moves to a new, artistic, graceful level. Following in the footsteps of a successful partnership, together with Rinaro Isodynamics we managed to exceed our expectations once again and create something for the ages. It’s not mass production; it’s the craftsmanship that sparks the magic and wonder in Elite, what makes it exciting, and these are values that we choose over any shortcuts.",
                "author" => "Antonio Meze, Lead Designer and Founder of Meze Audio",
                "image" => "https://mezeaudio.com/cdn/shop/files/Antonio-Meze-Elite_687eded2-444b-4c00-86a3-c439370f9fe3.webp?v=1727095599&width=600",
            ],
            [
                "quote" => "When we first talked about creating the second generation of Empyrean, I knew it would be far from easy. With many ideas in mind, I reached out to our community, eager to gather their feedback in any way I could. I wanted to dive into their hearts and minds, to understand their expectations, and so their input is what shaped the path toward Empyrean II. What followed was a test of patience and precision. At first, the possibilities seemed endless, but reality showed us that only a few of our plans were feasible. We made a lot of revisions to discover the right proportions and materials that would deliver the sound signature we aimed for.",
                "author" => "Alex Grigoras, Acoustic Engineer",
            ],
            [
                "quote" => "From the very beginning of our Meze Audio POET journey, we knew we wanted to create something unique — a more compact planar-magnetic open-back headphone that is every bit as capable as our flagship models. Well then, what better place to look than at the very apex? In collaboration with our friends at RINARO ISODYNAMICS, we synthesized the essence of ELITE’s driver technology and gave it new life. I believe Meze Audio POET turned out to be more than just a headphone; it’s a nod to a huge stepping stone in our development as a team and a testament to how far we’ve come.",
                "author" => "Alex Grigoras, Acoustic Engineer",
            ],
            [
                "quote" => "At the core of it all, music is an expression of emotion, a celebration of life and a token of everlasting memories. Every part of the 109 PRO, from the premium materials we used to the intricate engineering, embodies that same emotion our favorite music makes us feel.",
                "author" => "Antonio Meze, Lead Designer and Founder of Meze Audio.",
            ],
            [
                "quote" => "With the 105 SILVA, we took what we learned from the 109 PRO and the 105 AER, giving it sound characteristics from both: richness and genre versatility combined with clarity and detail. However, it is not merely a combination of both, as we’ve introduced a more expressive midrange presentation for enhanced vocal presence and a more natural-sounding representation of acoustic stringed instruments.",
                "author" => "Alex Balazsi, Acoustic Engineer",
            ],
            [
                "quote" => "105 AER carries a feeling of Art Deco opulence, almost like a piece of jewelry masked in a mechanical structure. Certain curves and surfaces are not obvious at first glance; there's an ambiguity to the three-dimensional shape inviting you to discover it over time.",
                "author" => "Alex Balazsi, Acoustic Engineer",
            ],
        ]);
    }

    public static function randomQuote(): array
    {
        $quote = self::quotes()->random();
        return [$quote["quote"], $quote['author']];
    }
}
