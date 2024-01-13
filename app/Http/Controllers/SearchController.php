<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\Progress;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request){

        $user_id=$request->user_id;
        $current_user = Auth::id();
        $selected_categories = Category::whereIn('id',$request->catIds?explode(',',$request->catIds):[])->get();
        $courses = Course::where('title','like','%'.$request->title."%")->where('is_published',1)
            ->when($request->catIds,function($q) use($selected_categories){
                $q->whereIn('category_id',$selected_categories->pluck('id'));
            })
            ->when($user_id,function($q) use($user_id){
                $q->where('user_id',$user_id);
            })
            ->when(!$user_id,function($q) use($current_user){
                $q->where('user_id','<>',$current_user);
            })            
            ->get();
        return Inertia::render('SearchPage',[
            'selected_categories'=>$selected_categories,
            'courses'=>$courses->load(['user','category','chapters'=>fn($q)=>$q->where('is_published',1)]),
            'user'=>$user_id?User::findOrFail($user_id):null
        ]);
    }

    public function course($id){
        $user = Auth::user();
        $course =Course::with(['chapters'])->where('id',$id)->firstOrFail();
        if($course->user_id==Auth::id()) abort(403,'You own this course');

        if(count($course->department_restrictions)>0){
            if(!$course->department_restrictions->contains('department',$user->department)){
                abort(403,'You are not allowed to view this course');
            }
        }

        if(count($course->position_restrictions)>0){
            if(!$course->position_restrictions->contains('position',$user->position)){
                abort(403,'You are not allowed to view this course');
            }
        }

        return Inertia::render('StudentCourse',[
            'course'=>$course->load(['attachments','user','category','quiz'=>fn($q)=>$q->where('is_published',1),'quiz.quiz_questions'])
        ]);
    }

    
}
