<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\Progress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudentCourseController extends Controller
{
    

    

    public function chapter($course_id,$id){
        $progress=Progress::firstOrCreate([
            'user_id'=>Auth::id(),
            'chapter_id'=>$id
        ]);
        $chapter = Chapter::where('id',$id)->where('course_id',$course_id)->firstOrFail();        
        return Inertia::render('StudentChapter',[
            'chapter'=>$chapter->load(['course','course.attachments','course.user','course.chapters','course.category'])
        ]);
    }
}
