<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\HRMSController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StudentCourseController;
use App\Http\Controllers\TeacherCoursesController;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Progress;
use App\Models\User;
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
                    array_push($student_progress,[
                        'user'=>$student,
                        'user_id'=>$student->id,
                        'course'=>$course,
                        'course_id'=>$course->id,
                        'chapter_count'=>$len,
                        'completed_chapters'=>intval($sum),
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
    });
    
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});


Route::get('/public', function () {
    return null;
})->name('public_route');

Route::get('/test', function () {
    return Inertia::render('Auth/SignUpPage');
})->name('test');


