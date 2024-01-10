<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $with=['language','quiz','department_restrictions','position_restrictions'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function language(){
        return $this->belongsTo(Language::class);
    }

    public function attachments(){
        return $this->hasMany(Attachment::class);
    }

    public function chapters(){
        return $this->hasMany(Chapter::class);
    }

    public function quiz(){
        return $this->hasOne(Quiz::class);
    }

    public function getImageAttribute($value){
        if($value && str_contains( strtolower($value),'http')){return $value;}
        if(!$value){return null;}
        return url('/').'/public/'. $value;
    }

    public function department_restrictions(){
        return $this->hasMany(CourseDepartmentRestriction::class);
    }


    public function position_restrictions(){
        return $this->hasMany(CoursePositionRestriction::class);
    }
}
