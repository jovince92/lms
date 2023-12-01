<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Auth/Profile');
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

    
    
    public function update(Request $request)
    {
        $user=User::find(Auth::id());

        $request->validate([
            'photo' => 'mimes:jpeg,png,jpg,webp,pdf',
            'email' => ['email','nullable', 'max:255', Rule::unique(User::class)->ignore(Auth::id())],
        ]);

        $photo = $request->file('photo') ;
        if($photo){
            if($user->photo){
                @unlink(public_path($user->getAttributes()['photo']));
            }
            $photo_name=strval(Auth::id()).'_'.Str::slug($photo->getClientOriginalName());
            $location='uploads/photos/user_'.strval($user->company_id).'/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            $new_photo = $location.$photo_name;
            $request->file('photo')->move($path, $new_photo);
            $user->update([
                'photo'=>$new_photo
            ]);
        }

        $input = $request->except(['photo','current_password','password_confirmation']);
        $user->update($input);
        return redirect()->back();
    }

    public function password(Request $request)
    {
        $user=User::find(Auth::id());

        $request->validate([
            'current_password'=>'required|current_password',
            'password'=>'required|confirmed'
        ]);

        $user->update([
            'password'=>bcrypt($request->password)
        ]);
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
        //
    }
}
