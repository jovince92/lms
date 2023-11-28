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
        Progress::firstOrCreate([
            'user_id'=>Auth::id(),
            'chapter_id'=>$id
        ]);
        
        $chapter = Chapter::where('id',$id)->where('course_id',$course_id)->firstOrFail();
        $next_position  = intval($chapter->position)+1;
        $next_chapter_id=Chapter::select(['id'])->where('position',$next_position)->first();
        $last_chapter = Chapter::where('course_id',$course_id)->orderBy('position','desc')->first();
        $is_last_chapter=$chapter->id==$last_chapter->id?1:0;
        return Inertia::render('StudentChapter',[
            'chapter'=>$chapter->load(['course','course.attachments','course.user','course.chapters','course.category']),
            'is_last_chapter'=>$is_last_chapter,
            'next_chapter_id'=>$is_last_chapter==0?$next_chapter_id:['id'=>0]
        ]);
    }

    public function toggle($course_id,$id,Request $request){
        Chapter::where('id',$id)->where('course_id',$course_id)->firstOrFail();
        $progress = Progress::firstOrCreate([
            'user_id'=>Auth::id(),
            'chapter_id'=>$id
        ]);

        $progress->update(['is_completed'=>$request->is_completed]);
        return redirect()->back();
    }
}
