<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Illuminate\Support\Str;


class TeacherCoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $level=Auth::user()->level;
        $user_id=Auth::id();
        return Inertia::render('TeacherCourses',[
            'courses'=>Course::with(['user','category'])->when($level==0,function($q) use($user_id) {
                $q->where('user_id',$user_id);
            })->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('TeacherCoursesCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $new_course=Course::create([
            'user_id'=>Auth::id(),
            'title'=>$request->title
        ]);

        return redirect()->route('teacher.courses.show',['id'=>$new_course->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $course=Course::findOrFail($id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);
        return Inertia::render('TeacherCoursesShow',[
            'course'=>$course->load(['category','attachments','chapters'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $request->validate([
            'image' => 'mimes:jpeg,png,jpg,webp,pdf'
        ]);

        $course=Course::findOrFail($id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);
        $image = $request->file('image') ;
        if($image){
            if($course->image){
                @unlink(public_path($course->getAttributes()['image']));
            }
            $image_name=strval($id).'_'.Str::slug($image->getClientOriginalName());
            $location='uploads/courses/course_'.strval($id).'/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            $new_image = $location.$image_name;
            $request->file('image')->move($path, $new_image);
            $course->update([
                'image'=>$new_image
            ]);
        }

        $input = $request->except(['image']);
        $course->update($input);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $course=Course::findOrFail($id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);

        DB::transaction(function() use ($id,$course){
            $attachments = Attachment::where('course_id',$id)->whereNotNull('attachment')->get();
            $chapters = Chapter::where('course_id',$id)->whereNotNull('video')->get();
            foreach($attachments as $attachment){
                if($attachment->attachment){
                    @unlink(public_path($attachment->getAttributes()['attachment']));
                }
            }
            foreach($chapters as $chapter){
                if($chapter->video){
                    @unlink(public_path($chapter->getAttributes()['video']));
                }
            }
            if($course->image){
                @unlink(public_path($course->getAttributes()['image']));
            }
            $course->delete();
        });
        
        return redirect()->to(route('teacher.courses.index'));
    }
}
