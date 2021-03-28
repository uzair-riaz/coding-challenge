<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;

class UserController
{
    public function stats(Request $request)
    {
        $users = json_decode(file_get_contents(storage_path('json\users.json')), true);
        $logs = json_decode(file_get_contents(storage_path('json\logs.json')), true);

        return $users;
    }
}