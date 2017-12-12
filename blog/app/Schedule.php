<?php

namespace App;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $table = 'schedule';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'date_from', 'description', 'created_by', 'show', 'links', 'event_type', 'tags', 'group','assigned_to'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

     public function getMySchedule(){
         return $this->belongsTo(User::class, 'created_by', 'id');
     }
}
