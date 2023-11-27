<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentCourseController extends Controller
{
    public function index($id){
        return Inertia::render('StudentCourse',[
            'course'=>Course::with(['attachments','user','chapters','category'])->where('id',$id)->firstOrFail()
        ]);
    }

    public function chapter($course_id,$id){
        $chapter = Chapter::where('id',$id)->where('course_id',$course_id)->firstOrFail();
        
        

        return Inertia::render('StudentChapter',[
            'chapter'=>$chapter->load(['course','course.attachments','course.user','course.chapters','course.category'])
        ]);
    }
}
