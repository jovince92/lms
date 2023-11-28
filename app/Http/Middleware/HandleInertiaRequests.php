<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Language;
use App\Models\Progress;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () {
                return (new Ziggy)->toArray();
            },
            
            'full_url'=>URL::full(),
            'base_url'=>URL::current(),
            'categories'=>Category::orderBy('category','asc')->get(),
            'my_progress'=>Auth::check()?Progress::with(['chapter'])->where('user_id',$request->user()->id)->get():[],
            'languages'=>Language::all()
        ]);
    }
}
