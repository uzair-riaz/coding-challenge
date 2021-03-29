<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'occupation',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // override this function in case of database as data source
    public static function paginate($skip, $take, $sortBy = null)
    {
        $content = file_get_contents(storage_path('json\users.json'));
        $users = collect(json_decode($content, true));
        $grouped = UserLog::forUserIds($users->pluck('id'))->groupBy('user_id');

        $models = collect();
        collect($users)->when($sortBy, function ($collection) use ($grouped, $sortBy) {
            return $collection->sortBy(function ($user) use ($grouped, $sortBy) {
                $userLogs = $grouped->get($user['id']);

                switch ($sortBy) {
                    case 'impressions':
                        return $userLogs->where('type', 'impression')->count();
                    case 'conversions':
                        return $userLogs->where('type', 'conversion')->count();
                    case 'revenue':
                        return round($userLogs->sum('revenue'), 2);
                }

                return $user['name'];

            }, SORT_REGULAR, $sortBy !== 'name');
        })
            ->skip($skip)
            ->take($take)
            ->each(function ($attributes) use ($grouped, &$models) {
                $user = new User($attributes);
                $user->id = $attributes['id'];

                $userLogs = $grouped->get($user->id);
                $user->revenue = round($userLogs->sum('revenue'), 2);
                $user->impressions = $userLogs->where('type', 'impression')->count();

                $conversions = $userLogs->where('type', 'conversion');
                $user->conversions = $conversions->count();

                $chartData = [];
                $conversions->sortBy('time')
                    ->groupBy(function ($item) {
                        return Carbon::parse($item['time'])->format('d/m');
                    })
                    ->each(function ($item, $date) use (&$chartData) {
                        $chartData[$date] = collect($item)->count();
                    });
                $user->chartData = $chartData;

                $models->add($user);
            });

        return [
            'total' => $users->count(),
            'data' => $models
        ];
    }
}
