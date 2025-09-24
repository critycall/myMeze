<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController
{
    public function index()
    {
        $users = User::paginate(15);

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }
}
