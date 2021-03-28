<?php


namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;

class UserController
{
    public function stats(Request $request)
    {
        $users = json_decode(file_get_contents(storage_path('json\users.json')), true);
        $logs = json_decode(file_get_contents(storage_path('json\logs.json')), true);

        $logs = collect($logs);
        $models = collect();
        foreach ($users as $attributes) {
            $user = new User($attributes);
            $user->id = $attributes['id'];

            $userLogs = $logs->where('user_id', $user->id);
            $user->revenue = $userLogs->sum('revenue');
            $user->impressions = $userLogs->where('type', 'impression')->count();
            $user->conversions = $userLogs->where('type', 'conversion')->count();

            $models->add($user);
        }

        return $models;
    }
}