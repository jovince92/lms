<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
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
}
