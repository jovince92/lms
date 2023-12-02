<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request){

        $per_page=$request->perPage?intval($request->perPage):10;
        $order=$request->order ?? 'desc' ;
        $role=$request->role ==0 ?'':$request->role ;
        $sort=$request->sort ?? 'company_id';
        $filter=$request->filter ?? '';
        $users=User::where(function($q) use($filter){
                $q->orWhere('first_name','like','%'.$filter.'%')->orWhere('last_name','like','%'.$filter.'%')->orWhere('company_id','like','%'.$filter.'%');
            })
            ->where('level','like','%'.$role.'%')
            ->where('level','<>',0)
            ->orderBy($sort,$order)
            ->paginate($per_page)->withQueryString();
        return Inertia::render('AdminAllUsers',[
            'users'=>$users,
            'per_page'=>strval($per_page),
            'sort'=>$sort,
            'order'=>$order,
            'filter'=>$filter,
            'role'=>$role
        ]);
    }

    public function set_role(Request $request){
        $user=User::findOrFail($request->id);
        $user->update([
            'level'=>$request->level
        ]);

        return redirect()->back();
    }
}
