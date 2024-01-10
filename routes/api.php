<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/*
$departments = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[            
    'what' => 'getdepts',
    'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
]);

$positions = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[            
    'what' => 'getpositions',
    'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
]);
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/departments', function (Request $request) {
    $departments = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[            
        'what' => 'getdepts',
        'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
    ]);
    return $departments['message'];
})->name('api.departments');

Route::get('/positions', function (Request $request) {
    $positions = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[            
        'what' => 'getpositions',
        'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
    ]);
    return $positions['message'];
})->name('api.positions');
