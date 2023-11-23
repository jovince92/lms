<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$course_id)
    {
        $course=Course::findOrFail($course_id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);

        $last_chapter = Chapter::where('course_id',$course_id)->orderBy('position','desc')->first();

        $position = $last_chapter?$last_chapter->position + 1 :1;

        Chapter::create([
            'course_id'=>$course_id,
            'title'=>$request->title,
            'position'=>$position
        ]);
        
        
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($course_id,$id)
    {
        $course=Course::findOrFail($course_id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);
        $chapter=Chapter::findOrFail($id);
        return Inertia::render('Chapter',[
            'chapter'=>$chapter->load(['course'])
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
    public function update(Request $request,$course_id, $id)
    {
        $request->validate([
            'video' => 'mimes:mp4'
        ]);

        $course=Course::findOrFail($course_id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);
        $chapter = Chapter::findOrFail($id);
        $video = $request->file('video') ;
        if($video){
            if($chapter->video){
                @unlink(public_path($chapter->getAttributes()['video']));
            }
            $video_name=strval($id).'_'.$this->removeSpecialChars($video->getClientOriginalName());
            $location='uploads/courses/course_'.strval($course_id).'/chapter_'.strval($id).'/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            $new_video = $location.$video_name;
            $request->file('video')->move($path, $new_video);
            $chapter->update([
                'video'=>$new_video
            ]);
        }
        
        $input = $request->except(['video']);
        $chapter->update($input);
        $course->update(['is_published'=>0]);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($course_id,$id)
    {
        $course=Course::findOrFail($course_id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);
        $chapter = Chapter::findOrFail($id);
        if($chapter->video){
            @unlink(public_path($chapter->getAttributes()['video']));
        }
        $chapter->delete();
        $course->update(['is_published'=>0]);
        return redirect()->to(route('teacher.courses.show',['id'=>$course_id]));
    }

    public function reorder(Request $request,$course_id){
        $course=Course::findOrFail($course_id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);
        
        foreach ($request->reordered_chapters as $c){
            
            $chapter=Chapter::findORfail($c['id']);
            $chapter->update(['position'=>$c['position']]);
        }
        return redirect()->back();
    }

    private function removeSpecialChars($string) {
        // Use a regular expression to replace any character that is not a letter, a number, or a period with an empty string
        $newString = preg_replace('/[^a-zA-Z0-9.]/', '', $string);
        // Return the new string
        return $newString;
    }
}
