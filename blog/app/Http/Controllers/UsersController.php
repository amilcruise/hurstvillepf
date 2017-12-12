<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

use App\User;

class UsersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    //
    public function authenticate(Request $request)
    
      {
    
          $this->validate($request, [
    
          'email' => 'required',
    
          'password' => 'required'
    
           ]);
    
         $user = User::where('email', $request->input('email'))->first();
    
        if (Hash::check($request->input('password'), $user->password)){
    
             $apikey = base64_encode(str_random(60));
    
             User::where('email', $request->input('email'))->update(['api_token' => "$apikey"]);;
    
             return response()->json(['status' => 'success','group' => $user->group,'api_token' => substr($apikey, 0, 60)]);
    
         } else {
    
             return response()->json(['status' => 'fail'],401);
    
         }
    
      }
}
