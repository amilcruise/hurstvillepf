<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;

use App\User;
use App\Schedule;

class ScheduleController extends Controller
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
    public function getschedule(Request $request)
    
      {
    
          $this->validate($request, [
          'api_token' => 'required',
          'start_date' => 'required',
          'end_date' => 'required',
           ]);
    
        $user = User::where('api_token', $request->input('api_token'))->first();
    
        if ($user){
             
            $from = $request->input('start_date');
            $till = $request->input('end_date');
            
            // then simply

            $schedules = Schedule::where('date_from', '>=', $from)
            ->where('date_from', '<=', $till)
            ->get();
    
            return response()->json(['status' => 'success','schedules' => $schedules]);
    
         } else {
             return response()->json(['status' => 'fail'],401);
         }
    
      }
}
