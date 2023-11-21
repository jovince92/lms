<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class HRMSController extends Controller
{
    public function store(Request $request){
        $company_id=$request->company_id;
        $password=$request->password;
        $response = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/sso.php',[
            'username' => $company_id,
            'password' => $password
        ]);

        if($response['code']!="0"){
            throw ValidationException::withMessages(['company_id'=>$response['message']??'Invalid Credentials']);
        }

        $user=User::where('company_id',$company_id)->first();

        if(!$user){
            $response = Http::asForm()->post('idcsi-officesuites.com:8080/hrms/api.php',[
                'idno' => $company_id,
                'what' => 'getinfo',
                'field' => 'personal',
                'apitoken' => 'IUQ0PAI7AI3D162IOKJH'
            ]);
            $message= $response['message'];
            $imageContent = file_get_contents($message['picture_location']);
            $location='uploads/photos/user_'.$company_id.'/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            
            File::put(str_replace('/','\\',$path).$company_id,$imageContent,true);
            $user=User::create([
                'first_name'=>$message['first_name'],
                'last_name'=>$message['last_name'],
                'company_id'=>$company_id,
                'photo'=>$location.$company_id,
                'password'=>bcrypt('password')
            ]);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }
}
