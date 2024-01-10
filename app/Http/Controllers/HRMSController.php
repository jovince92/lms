<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class HRMSController extends Controller
{
    public function signup(Request $request){

        // $request->validate([
        //     'company_id' => ['required','unique:users']
        // ],[
        //     'company_id.unique'=>'This ID# is already registered to LMS. Proceed to Log In Page'
        // ]);

        $company_id=$request->company_id;
        $password=$request->password;



        $response = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/sso.php',[
            'username' => $company_id,
            'password' => $password
        ]);

        if($response['code']!="0"){
            throw ValidationException::withMessages(['company_id'=>$response['message']??'Invalid Credentials']);
        }

        
        
        
        $hrms_response = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[
            'idno' => $company_id,
            'what' => 'getinfo',
            'field' => 'personal',
            'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
        ]);

        
        
        $message= $hrms_response['message'];
        $imageContent = file_get_contents($message['picture_location']);
        $location='uploads/photos/user_'.$company_id.'/';
        $path=public_path($location);
        if (!file_exists($path)) {
            File::makeDirectory($path,0777,true);
        }
        
        File::put(str_replace('/','\\',$path).$company_id,$imageContent,true);
        $user=User::firstOrCreate(
        ['company_id'=>$company_id],
        [
            'first_name'=>$message['first_name'],
            'last_name'=>$message['last_name'],
            'photo'=>$location.$company_id,
            'password'=>bcrypt('password'),
            'position'=>$message['job_job_title'],
            'department'=>$message['project'],
        ]);
        

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);

    }

    public function store(Request $request){
        $request->validate([
            'password'=>'required|confirmed',
            // 'first_name'=>'required|min:3|max:100',
            // 'last_name'=>'required|min:3|max:100'
        ]);
        $company_id=$request->company_id;
        $hrms_response = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[
            'idno' => $company_id,
            'what' => 'getinfo',
            'field' => 'personal',
            'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
        ]);

        $message= $hrms_response['message'];
        $imageContent = file_get_contents($message['picture_location']);
        $location='uploads/photos/user_'.$company_id.'/';
        $path=public_path($location);
        if (!file_exists($path)) {
            File::makeDirectory($path,0777,true);
        }
        
        File::put(str_replace('/','\\',$path).$company_id,$imageContent,true);
        $user=User::create([
            'first_name'=>$request['first_name'],
            'last_name'=>$request['last_name'],
            'company_id'=>$company_id,
            'photo'=>$location.$company_id,
            'position'=>$request['position'],
            'department'=>$request['department'],
            'password'=>bcrypt($request['password'])
        ]);
        

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }
}
