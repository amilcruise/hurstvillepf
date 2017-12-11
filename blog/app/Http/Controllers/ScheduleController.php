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
    public function getschedule(Request $request) {
        
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
        
        public function addschedule(Request $request) {
            
            $this->validate($request, [
                'api_token' => 'required',
                'date_from' => 'required',
                'title' => 'required',
                ]);
                
                $user = User::where('api_token', $request->input('api_token'))->first();
                
                if ($user){
                    
                    $dateFrom = $request->input('date_from');
                    $title = $request->input('title');
                    $description = $request->input('description');
                    $show = true;
                    $eventType = true;
                    $createdBy = $user->id;
                    
                    try{
                        //$user = User::find(Auth::user()->id);
                        $schedule = new Schedule;
                        $schedule->title = $title;
                        $schedule->description = $description;
                        $schedule->date_from = $dateFrom;
                        $schedule->date_to = $dateFrom;
                        $schedule->show = true;
                        $schedule->event_type = $eventType;
                        $schedule->created_by = $createdBy;
                        $schedule->save();

                        return response()->json(['status' => 'success','schedules' => $request->all()]);  
                    }
                    catch(Exception $e){
                        return response(['message' => $e->getMessage(), 'success' => false],500);  
                    }
                    
                } else {
                    return response()->json(['status' => 'fail'],401);
                }
                
            }
        }
        