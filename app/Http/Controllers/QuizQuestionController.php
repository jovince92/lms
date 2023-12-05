<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\QuizChoice;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuizQuestionController extends Controller
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
    public function store(Request $request,$quiz_id)
    {
        
        DB::transaction(function () use($quiz_id,$request) {
            $question = QuizQuestion::create([
                'quiz_id'=>$quiz_id,
                'question'=>trim($request->question),
                'type'=>$request->type,
            ]);
    
            QuizAnswer::create([
                'quiz_question_id'=>$question->id,
                'answer'=>trim($request->answer)
            ]);

            if(strval($request->type)=='1'){
                foreach($request->choices as $choice){
                    QuizChoice::create([
                        'quiz_question_id'=>$question->id,
                        'choice'=>trim($choice)
                    ]);
                }
            }

            $quiz=Quiz::findOrFail($quiz_id);
            $quiz->update(['is_published'=>0]);

            
        });
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
    public function update(Request $request,$quiz_id, $id)
    {
        DB::transaction(function () use($quiz_id,$request,$id) {
            $question = QuizQuestion::findOrFail($id);
            $question->update([
                'quiz_id'=>$quiz_id,
                'question'=>trim($request->question),
                'type'=>$request->type,
            ]);
    
            QuizAnswer::updateOrCreate([
                'quiz_question_id'=>$id
            ],[
                'answer'=> trim( $request->answer)
            ]);

            $choices = QuizChoice::where('quiz_question_id',$id)->get();
            $choices->each->delete();

            if(strval($request->type)=='1'){
                
                foreach($request->choices as $choice){
                    QuizChoice::create([
                        'quiz_question_id'=>$question->id,
                        'choice'=>trim($choice)
                    ]);
                }
            }

            $quiz=Quiz::findOrFail($quiz_id);
            $quiz->update(['is_published'=>0]);
        });
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
        $question = QuizQuestion::findOrFail($id);
        $question->delete();
        return redirect()->back();
    }
}
