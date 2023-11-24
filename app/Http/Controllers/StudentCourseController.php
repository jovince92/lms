<?php

namespace App\Http\Controllers;

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
}
