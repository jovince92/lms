<?php

use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\HRMSController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StudentCourseController;
use App\Http\Controllers\TeacherCoursesController;
use Illuminate\Foundation\Application;
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
    Route::name('dashboard.')->group(function(){
        Route::get('/', function () {
            return Inertia::render('Dashboard');
        })->name('index');
    });

    Route::prefix('search')->name('search.')->group(function(){
        Route::get('/', [SearchController::class,'index'])->name('index');
    });

    Route::prefix('teacher')->name('teacher.')->group(function(){
        
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
            return Inertia::render('TeacherAnalytics');
        })->name('analytics');
    });

    
    

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::prefix('course')->name('course.')->group(function(){        
        Route::get('/{id}', [StudentCourseController::class, 'index'])->name('index');
        Route::get('/{course_id}/chapter/{id}', [StudentCourseController::class, 'chapter'])->name('chapter');
    });

});


Route::get('/public', function () {
    return null;
})->name('public_route');

Route::get('/test', function () {
    return Inertia::render('Auth/SignUpPage');
})->name('test');


