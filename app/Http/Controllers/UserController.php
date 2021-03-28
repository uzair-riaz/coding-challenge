<?php


namespace App\Http\Controllers;


use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController
{
    public function stats(Request $request)
    {
        $skip = ($request->get('page') - 1) * $request->get('size');
        $take = $request->get('size');

        $users = json_decode(file_get_contents(storage_path('json\users.json')), true);
        $logs = json_decode(file_get_contents(storage_path('json\logs.json')), true);

        $logs = collect($logs);
        $models = collect();
        collect($users)->skip($skip)->take($take)->each(function ($attributes) use ($logs, &$models) {
            $user = new User($attributes);
            $user->id = $attributes['id'];

            $userLogs = $logs->where('user_id', $user->id);
            $user->revenue = round($userLogs->sum('revenue'), 2);
            $user->impressions = $userLogs->where('type', 'impression')->count();
            $user->conversions = $userLogs->where('type', 'conversion')->count();
            $user->chartData = $userLogs->sortBy('time')
                ->groupBy(function ($item) {
                    return (int)Carbon::parse($item['time'])->format('d');
                });

            $models->add($user);
        });

        return [
            'total' => count($users),
            'data' => $models
        ];
    }
}