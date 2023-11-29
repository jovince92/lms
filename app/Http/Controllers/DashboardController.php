<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\Progress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        $progress = Progress::where('user_id',Auth::id())->get();
        $started_chapters = Chapter::whereIn('id',$progress->pluck(['chapter_id']))->get();
        $started_courses = Course::with(['user','attachments','category','chapters'=>fn($q)=>$q->where('is_published',1)])->whereIn('id',$started_chapters->pluck(['course_id']))->get();

        $completed_courses=[];
        $ongoing_courses=[];

        foreach($started_courses as $course){
            $len = count($course->chapters);
            $sum = Progress::whereIn('chapter_id',$course->chapters->pluck(['id']))->sum('is_completed');
            if($sum==$len) array_push($completed_courses,$course);
            if($sum!=$len) array_push($ongoing_courses,$course);
        }

        return Inertia::render('Dashboard',[
            'completed_courses'=>$completed_courses,
            'ongoing_courses'=>$ongoing_courses
        ]);
    }
}
