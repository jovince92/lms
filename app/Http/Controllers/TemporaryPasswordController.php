<?php

namespace App\Http\Controllers;

use App\Mail\TemporaryPassword;
use App\Models\User;
use Faker\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class TemporaryPasswordController extends Controller
{
    public function send(Request  $request)
    {
        $faker = Factory::create();
        $user = User::where('company_id',$request->company_id)->first();

        if(!$user) throw ValidationException::withMessages(['company_id' => 'This Company ID Is Not Yet Registered']);
        if(!$user->email || strlen($user->email)<5) throw ValidationException::withMessages(['company_id' => 'Email Not Set or User Email Is Not Valid.']);

        $temp_password = $faker->bothify('??#?#??#?');

        $user->update([
            'password'=>bcrypt($temp_password)
        ]);

        Mail::to($user->email)
            ->send(new TemporaryPassword($temp_password,$user->first_name.' '.$user->last_name)
        );

        return redirect()->back();
    }
}
