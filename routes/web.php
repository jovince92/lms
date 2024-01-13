<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CourseRatingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentRestrictionController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\HRMSController;
use App\Http\Controllers\PositionRestrictionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuizQuestionController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StudentCourseController;
use App\Http\Controllers\StudentQuizController;
use App\Http\Controllers\TeacherCoursesController;
use App\Http\Controllers\TemporaryPasswordController;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Progress;
use App\Models\Quiz;
use App\Models\User;
use App\Models\UserResult;
use Faker\Factory;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::middleware('guest')->group(function () {

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login/store', [AuthenticatedSessionController::class, 'store'])->name('login.store');
    
    Route::get('signup', fn()=>redirect()->to(route('login')));
    Route::post('signup', [HRMSController::class, 'signup'])->name('signup');
    Route::post('hrms/store', [HRMSController::class, 'store'])->name('hrms.store');


});



Route::middleware(['auth'])->group(function () {


    Route::middleware(['is_admin'])->prefix('/admin')->group(function(){
        Route::name('categories.')->prefix('categories')->group(function(){
            Route::get('/', [CategoryController::class, 'index'])->name('index');
            Route::post('/store', [CategoryController::class, 'store'])->name('store');
            Route::post('/update', [CategoryController::class, 'update'])->name('update');
            Route::post('/destroy/{id}', [CategoryController::class, 'destroy'])->name('destroy');
        });

        Route::name('users.')->prefix('u')->group(function(){
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::post('/role', [UserController::class, 'set_role'])->name('set_role');
        });
    });

    


    Route::name('profile.')->prefix('profile')->group(function(){
        Route::get('/', [ProfileController::class, 'index'])->name('index');
        Route::post('/update', [ProfileController::class, 'update'])->name('update');
        Route::post('/password', [ProfileController::class, 'password'])->name('password');
    });

    Route::name('favorites.')->prefix('favorites')->group(function(){
        
        Route::get('/', [FavoritesController::class, 'index'])->name('index');
        Route::post('/store', [FavoritesController::class, 'store'])->name('store');
        Route::post('/destroy', [FavoritesController::class, 'destroy'])->name('destroy');
    });

    Route::name('dashboard.')->group(function(){
        Route::get('/', [DashboardController::class, 'index'])->name('index');
    });

    

    Route::middleware(['is_teacher'])->prefix('teacher')->name('teacher.')->group(function(){
        
        Route::get('/', fn()=>redirect()->route('teacher.courses.index'))->name('courses');
        Route::prefix('courses')->name('courses.')->group(function(){
            
            Route::get('/', [TeacherCoursesController::class, 'index'])->name('index');
            Route::get('/create', [TeacherCoursesController::class, 'create'])->name('create');
            Route::get('/{id}', [TeacherCoursesController::class, 'show'])->name('show');
            Route::post('/destroy/{id}', [TeacherCoursesController::class, 'destroy'])->name('destroy');
            Route::post('/store', [TeacherCoursesController::class, 'store'])->name('store');
            Route::post('/{id}/update', [TeacherCoursesController::class, 'update'])->name('update');


            Route::prefix('attachments')->name('attachments.')->group(function(){        
                Route::post('/{course_id}/store', [AttachmentController::class, 'store'])->name('store');
                Route::post('/{course_id}/destroy/{id}', [AttachmentController::class, 'destroy'])->name('destroy');
            });

            Route::prefix('chapters')->name('chapters.')->group(function(){        
                Route::post('/{course_id}/store', [ChapterController::class, 'store'])->name('store');
                Route::get('/{course_id}/show/{id}', [ChapterController::class, 'show'])->name('show');
                Route::post('/{course_id}/update/{id}', [ChapterController::class, 'update'])->name('update');
                
                Route::post('/{course_id}/destroy/{id}', [ChapterController::class, 'destroy'])->name('destroy');
                Route::post('/{course_id}/reorder', [ChapterController::class, 'reorder'])->name('reorder');
            });

            Route::prefix('quiz')->name('quiz.')->group(function(){
                Route::post('/{course_id}/store', [QuizController::class, 'store'])->name('store');
                Route::get('/{course_id}/show/{id}', [QuizController::class, 'show'])->name('show');
                Route::post('/{course_id}/publish_toggle/{id}', [QuizController::class, 'publish_toggle'])->name('publish_toggle');
                Route::post('/{course_id}/rename/{id}', [QuizController::class, 'rename'])->name('rename');



                Route::prefix('question')->name('question.')->group(function(){
                    Route::post('/quiz/{quiz_id}', [QuizQuestionController::class, 'store'])->name('store');
                    Route::post('/quiz/{quiz_id}/question/{id}', [QuizQuestionController::class, 'update'])->name('update');
                    Route::post('/destroy/{id}', [QuizQuestionController::class, 'destroy'])->name('destroy');
                });
            });

            Route::prefix('restrictions')->name('restrictions.')->group(function(){        
                Route::prefix('departments')->name('departments.')->group(function(){        
                    Route::post('/{course_id}/store', [DepartmentRestrictionController::class, 'store'])->name('store');
                    Route::post('/{course_id}/destroy/{id}', [DepartmentRestrictionController::class, 'destroy'])->name('destroy');
                });

                Route::prefix('positions')->name('positions.')->group(function(){        
                    Route::post('/{course_id}/store', [PositionRestrictionController::class, 'store'])->name('store');
                    Route::post('/{course_id}/destroy/{id}', [PositionRestrictionController::class, 'destroy'])->name('destroy');
                });
            });

            
        });

        Route::get('/analytics', function () {
            $user_id = Auth::id();
            

            $students = User::with(['progresses'])->has('progresses')->get();

            $student_progress=[];

            foreach($students as $student){
                $progress = Progress::where('user_id',$student->id)->get();
                $started_chapters = Chapter::whereIn('id',$progress->pluck(['chapter_id']))->get();
                $started_courses = Course::with(['user','attachments','category','chapters'=>fn($q)=>$q->where('is_published',1)])
                    ->whereIn('id',$started_chapters->pluck(['course_id']))
                    ->when(Auth::user()->level!=0,function ($q) use($user_id){
                        $q->where('user_id',$user_id);
                    })
                    ->get();
                    
                foreach($started_courses as $course){
                    $len = count($course->chapters);
                    $sum = Progress::whereIn('chapter_id',$course->chapters->pluck(['id']))->sum('is_completed');

                    $quiz=Quiz::with(['quiz_questions'])->where('course_id',$course->id)->first();
                    $result = $quiz? UserResult::where('user_id',Auth::id())->where('quiz_id',$quiz->id)->first():null;

                    array_push($student_progress,[
                        'user'=>$student,
                        'user_id'=>$student->id,
                        'course'=>$course,
                        'course_id'=>$course->id,
                        'chapter_count'=>$len,
                        'completed_chapters'=>intval($sum),
                        'score'=>$result?strval($result->score).'/'.strval(count($quiz->quiz_questions)):null,
                        'date_started'=>Progress::select(['created_at'])->whereIn('chapter_id',$course->chapters->pluck(['id']))->first()->created_at
                    ]);
                }
            }

        

            return Inertia::render('TeacherAnalytics',[
                'progress'=>$student_progress
            ]);
        })->name('analytics');
    });

    
    

    Route::prefix('search')->name('search.')->group(function(){
        Route::get('/', [SearchController::class,'index'])->name('index');
        Route::get('/course/{id}', [SearchController::class, 'course'])->name('course');
    });

    
    Route::prefix('course')->name('course.')->group(function(){
        Route::get('/{course_id}/chapter/{id}', [StudentCourseController::class, 'chapter'])->name('chapter');
        Route::post('/{course_id}/chapter/{id}/toggle-complete', [StudentCourseController::class, 'toggle'])->name('toggle');

        Route::prefix('/{course_id}/quiz')->name('quiz.')->group(function(){
            
            Route::get('/', [StudentQuizController::class, 'index'])->name('index');
            Route::post('/store', [StudentQuizController::class, 'store'])->name('store');
        });
    });

    Route::prefix('ratings')->name('ratings.')->group(function(){
        Route::post('/store/{course_id}', [CourseRatingController::class, 'store'])->name('store');        
        Route::post('/destroy/{id}', [CourseRatingController::class, 'destroy'])->name('destroy');
    });
    
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});


Route::post('temporary-password', [TemporaryPasswordController::class, 'send'])->name('send_temporary_password');

Route::get('/public', function () {
    return null;
})->name('public_route');

// Route::get('/test', function () {
//     $faker = Factory::create();
//     $positions = ["ACCOUNTING HEAD","ACCOUNTING STAFF","ACTING TEAM MANAGER 1","ACTING TEAM MANAGER 2","ACTING TEAM MANAGER 3","ACTING TEAM MANAGER 4","ADMIN STAFF","ADMINISTRATION MANAGER","ADVISOR","ADVISOR 1","AIMS HEAD","AIMS STAFF","AIRCON TECHNICIAN","ASSISTANT OPERATIONS MANAGER","ASSISTANT OPERATIONS MANAGER 1","ASSISTANT OPERATIONS MANAGER 2","ASSISTANT OPERATIONS MANAGER 3","ASSISTANT PROJECT COORDINATOR","ASSISTANT PROJECT SUPERVISOR","ASSISTANT TEAM LEADER","BACK OFFICE SUPPORT","BACK-UP PROJECT COORDINATOR","BACK-UP SUPERVISOR","BILLER","CEO AND PRESIDENT","CLERK","COMPANY DRIVER","CUSTOMER SERVICE REPRESENTATIVE","DATA ANALYST","DATA CONTROLLER","DATA ENCODER","DATA ENCOER","DATA MANAGER","DOCUMENTATION OFFICER","ENGINEERING INDEXER","EXECUTIVE ASSISTANT","FACILITIES MAINTENANCE SUPERVISOR","FINANCIAL DATA ANALYST","GENERAL MANAGER","GRAPHIC DESIGNER","GROUP TEAM LEADER","HEAD PROCESSOR","HEAD PROJECT COORDINATOR","HR MANAGER","HRD STAFF","INSIDE SALES REPRESENTATIVE","IT MANAGER","IT MONITORING","IT REMOTE SUPPORT SPECIALIST","IT STAFF","KEY ENTRY OPERATOR","LEAD QUALITY CONTROLLER","MAIN PROJECT COORDINATOR","MAINTENANCE","MEDICAL INDEXER","MESSENGER","NETSUITE ADMINISTRATOR","NETWORK ADMINISTRATOR","OPERATION CLERK","OPERATIONS MANAGER","OPERATIONS MANAGER 1","OPERATIONS MANAGER 2","OPERATIONS SUPERVISOR","PAYROLL CLERK","PC MONITORING/CLERK","PROCESSOR","PRODUCTION ANALYST","PRODUCTION ASSISTANT","PRODUCTION SUPERVISOR","PROGRAMMER","PROJECT CONSULTANT","PROJECT COORDINATOR","PROJECT COORDINATOR 2","PROJECT MANAGER","PROJECT SUPERVISOR","PURCHASING ASSISTANT","PURCHASING STAFF","QC - EDITOR","QC SUPERVISOR","QUALITY ANALYST","QUALITY ANALYST 1","QUALITY ANALYST 2","QUALITY ANALYST 3","QUALITY ANALYST 4","QUALITY ASSURANCE OFFICER","QUALITY CONTROLLER","QUALITY SUPERVISOR","R & D STAFF","RATER","REAL TIME ANALYST","RECEPTIONIST","RELIEVER","REPORTS ANALYST","REVIEWER","SENIOR TECHNICIAN","SITE MANAGER","SITE SUPERVISOR","SOCIAL MEDIA STAFF","SOFTWARE MANAGER","SUPERVISOR","SUPERVISOR 1","SUPERVISOR 2","SYSTEM ADMINISTRATOR","SYSTEM TESTER","TEAM LEADER","TEAM LEADER 1","TEAM LEADER 2","TEAM LEADER 3","TEAM LEADER 4","TEAM LEADER 5","TEAM MANAGER 1","TEAM MANAGER 2","TEAM MANAGER 3","TIMEKEEPER","TRAINER","TRAINER 1","TRAINER 2","TRAINING & LANGUAGE COACH","TRAINING & QUALITY OFFICER","UTILITY","VERIFIER","VP - FINANCE","WORKFORCE PLANNING MANAGEMENT"];
//     $depts = ["AACT","AACT, EXLA, MORAN, PITD, SEFL","ACCOUNTING","ADMIN","AIMS/PURCHASING","APAC ODC","ASGL","ASGL, DYLT, TFF","AVRT","AVRT, CTBV_FBE, PMLI, SMTL, WARD","BAKER HUGHES","BOOHOO","BR MATCHING","BR MATCHING, GB MATCHING, MY MATCHING","BROKERAGE","CA ODC","CCO","CCO - CTBV","CCO - EORI","CCO - GLS","CCO - IL200","CCO - PACE","CCO - SUTTON","CCO - TFF","CCO - VALC","CCO - WWEX","CLNI, CTBV_POD, DDXE, FRNT,IL200, PFEG, DOHRN","CMFC","CSUK","CTBV_FBE","CTBV_POD","DATA TEAM","DDXE","DOHRN","DYLT","ENGINEERING INDEXING","EU ODC","EXLA","EXLA BT","FPO","FRNT","FTSC, MTVL, OAKH, OFFEN, PMLI, RIST, RRTS, SU","GB ARCHIVE","GB ARCHIVE, GB MATCHING, MY MATC","GB MATCHING","GLS","HONORLOCK","HUMAN RESOURCES","IL200","INDEXING","IT","MANAGEMENT","MGUL","MINI PROJECT - EU ODC","MORAN","MTVL","MTVL, OAKH, RLCA,VALC","MY MATCHING","N-FPO","OAKH","OFFEN","OFFEN, SUTTON, RRTS, CMFC, RIST, TSTO","PC","PFEG","PITD","PRODUCTION","PRODUCTION - BSD ONLINE JOB","PRODUCTION - CAS","PRODUCTION - CS GLOBAL","PRODUCTION - CS US ONLINE","PRODUCTION - CS-US (QUICKBOOKS)","PRODUCTION - CSUS ONLINE/MULTI PROJECTS","PRODUCTION - DATA CONTROL","PRODUCTION - E-MARKER/MORPHEUS","PRODUCTION - E-RECEIPT/MORPHEUS","PRODUCTION - KCK GLOBAL","PRODUCTION - MEDISTREAM COMMERCIAL","PRODUCTION - MEDISTREAM ONLINE(COMMERCIAL)","PRODUCTION - MEDISTREAM ONLINE(CORRESPONDENCE","PRODUCTION - MEDISTREAM ONLINE(CROSS TRAINEE)","PRODUCTION - MEDISTREAM ONLINE(EMORY)","PRODUCTION - MEDISTREAM ONLINE(PP&PM)","PRODUCTION - MORPHEUS","PRODUCTION - MULTI PROJECTS","PRODUCTION - ROCKWELL COLLINS","PRODUCTION - TAPING","PRODUCTION - TIE","PROFILE PENSION","QC","RIST","RLCA","RRTS","SEFL","SMTL","SOFTWARE","SUON","TFF","TSTO","UPS GLOBAL MANAGEMENT","UPSG","US MATCHING","US ODC","US ODC, CA ODC","VALC","VOLKSWAGEN","WARD","WARD, CTBV, FRNT, OAKH, TSTO, DYLT, MTVL, TFF","WORKFORCE TEAM","ZA BROKERAGE","ZA BROKERAGE, ZA MATCHING"];

//     $users = User::where('company_id','<>','dnnh')->get();
//     foreach($users as $user){
//         $user->update([
//             'position'=>$faker->randomElement($positions),
//             'department'=>$faker->randomElement($depts),
//             'password'=>bcrypt('1234')
//         ]);
//     }
//     return 'done';
// })->name('test');


