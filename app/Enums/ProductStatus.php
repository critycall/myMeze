<?php

namespace App\Enums;

enum ProductStatus: string
{
    case Draft = 'draft';
    case Active = 'active';
    case Published = 'published';
    case Archived = 'archived';
    case Discontinued = 'discontinued';

}
