<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request){

        $selected_categories = Category::whereIn('id',$request->catIds?explode(',',$request->catIds):[])->get();
        $courses = Course::where('title','like','%.'.$request->title??""."%")->where('is_published',1)->get();
        return Inertia::render('SearchPage',[
            'selected_categories'=>$selected_categories,
            'courses'=>$courses
        ]);
    }
}
