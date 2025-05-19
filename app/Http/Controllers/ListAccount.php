<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class ListAccount extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index(): Response
    {
        $users = User::all(); // Bisa dioptimasi dengan pagination atau select kolom tertentu

        return Inertia::render('list-account', [
            'users' => $users,
        ]);
    }
}
