<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;
    protected $guarded=[];

    public function quiz_choices(){
        return $this->hasMany(QuizChoice::class);
    }

    public function quiz_answer(){
        return $this->hasOne(QuizAnswer::class);
    }
}
