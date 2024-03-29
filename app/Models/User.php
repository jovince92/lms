<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;


class User extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $appends = ['role'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded=[];

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

    public function getPhotoAttribute($value){
        if($value && str_contains( strtolower($value),'http')){return $value;}
        if(!$value){return null;}
        return url('/').'/public/'. $value;
    }

    public function progresses(){
        return $this->hasMany(Progress::class);
    }

    public function getFirstNameAttribute($value)
    {
        return ucfirst(Str::of($value)->lower());
    }

    public function getLastNameAttribute($value)
    {
        return ucfirst(Str::of($value)->lower());
    }

    public function getCompanyIdAttribute($value)
    {
        return Str::of($value)->upper();
    }

    public function getRoleAttribute()
    {
        // Use a switch statement to return the role name based on the level value
        switch ($this->level) {
            case 0:
            return 'Admin';
            case 3:
            return 'Student';
            default:
            return 'Instructor';
        }
    }

    public function favorites(){
        return $this->belongsToMany(Course::class,Favorite::class);
    }

    public function results(){
        return $this->hasMany(UserResult::class);
    }

    public function user_answers(){
        return $this->hasMany(UserAnswer::class);
    }
}
