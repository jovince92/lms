<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\QuizAnswer;
use App\Models\UserAnswer;
use App\Models\UserResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StudentQuizController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($course_id)
    {
        $quiz=Quiz::with(['course','quiz_questions','quiz_questions.quiz_choices'])->where('course_id',$course_id)->firstOrFail();
        $result = UserResult::where('user_id',Auth::id())->where('quiz_id',$quiz->id)->first();
        ///dd($quiz);
        return Inertia::render('StudentQuiz',[
            'quiz'=>$quiz,
            'is_completed' => $result?1:0,
            'score'=>$result->score??0
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
    public function store(Request $request,$course_id)
    {
        
        $user_answers = $request->question_answers;
        $quiz_id = $request->id;
        $correct_answers = QuizAnswer::whereIn('quiz_question_id', collect($user_answers)->pluck('quiz_question_id'))->get()->keyBy('quiz_question_id')->pluck('answer', 'quiz_question_id');

        DB::transaction(function () use($user_answers,$correct_answers,$quiz_id) {
            $score=0;
            foreach($user_answers as $user_answer){
                $correct_answer = $correct_answers[$user_answer['quiz_question_id']];
                UserAnswer::create([
                    'user_id'=>Auth::id(),
                    'quiz_question_id'=>$user_answer['quiz_question_id'],
                    'answer'=>$user_answer['answer'],
                    'is_correct'=>$correct_answer==$user_answer['answer']?1:0
                ]);
                if($correct_answer==$user_answer['answer']) $score=$score+1;
            }

            UserResult::create([
                'user_id'=>Auth::id(),
                'quiz_id'=>$quiz_id,
                'score'=>$score
            ]);

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
}
