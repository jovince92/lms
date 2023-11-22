<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class AttachmentController extends Controller
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
        $files=$request->file('files');
        
        foreach($files as $file){
            $attachment=Attachment::create([
                'course_id'=>$course_id,
                'name'=>"",
                'attachment'=>""
            ]);
            $file_name=strval($attachment->id).'_'.$this->removeSpecialChars($file->getClientOriginalName());
            $location='uploads/courses/course_'.strval($course_id).'/attachments/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            $new_file = $location.$file_name;
            File::put(str_replace('/','\\',$path).$file_name,$file,true);
            //$request->file('file')->move($path, $new_file);
            $attachment->update([
                'name'=>$file_name,
                'attachment'=>$new_file
            ]);
        }

        return redirect()->back();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function destroy($course_id,$id)
    {
        $course=Course::findOrFail($course_id);
        if($course->user_id!=Auth::id() && Auth::user()->level!=0) abort(403);
        $attachment=Attachment::where('course_id',$course_id)->where('id',$id)->firstOrFail();
        @unlink(public_path($attachment->getAttributes()['attachment']));
        $attachment->delete();
        return redirect()->back();
    }


    private function removeSpecialChars($string) {
    // Use a regular expression to replace any character that is not a letter, a number, or a period with an empty string
    $newString = preg_replace('/[^a-zA-Z0-9.]/', '', $string);
    // Return the new string
    return $newString;
    }
}
