<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'time',
        'type',
        'revenue',
    ];

    // override this function in case of database as data source
    public static function forUserIds($userIds)
    {
        $content = file_get_contents(storage_path('json\logs.json'));
        $logs = json_decode($content, true);

        return collect($logs)->whereIn('user_id', $userIds);
    }
}
