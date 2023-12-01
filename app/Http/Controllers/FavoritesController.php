<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoritesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $course_ids = Favorite::where('user_id',Auth::id())->get();
        $courses = Course::whereIn('id',$course_ids->pluck(['course_id']))->get();

        return Inertia::render('Favorites',[
            'courses'=>$courses->load(['user','category','chapters'=>fn($q)=>$q->where('is_published',1)])
        ]);

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
    public function store(Request $request)
    {
        Favorite::updateOrcreate([
            'user_id'=>Auth::id(),
            'course_id'=>$request->course_id
        ]);
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

    
    public function destroy(Request $request)
    {
        $favorite = Favorite::where('course_id',$request->course_id)->where('user_id',Auth::id())->firstOrFail();
        $favorite->delete();
        return redirect()->back();
    }
}
