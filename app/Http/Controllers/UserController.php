<?php


namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;

class UserController
{
    public function stats(Request $request)
    {
        $skip = ($request->get('page') - 1) * $request->get('size');
        $take = $request->get('size');

        return User::paginate($skip, $take, $request->get('sortBy'));
    }
}