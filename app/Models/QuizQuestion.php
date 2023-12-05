<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $appends = ['question_type'];
    public function quiz_choices(){
        return $this->hasMany(QuizChoice::class);
    }

    public function quiz_answer(){
        return $this->hasOne(QuizAnswer::class);
    }
    public function getQuestionTypeAttribute()
    {
        return $this->type==1?'Multiple Choice':'Type The Answer';
    }
}
