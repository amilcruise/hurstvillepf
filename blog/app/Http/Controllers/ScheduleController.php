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
            $group = $request->input('group');
            $assignedTo = $request->input('assigned_to');
            
            // then simply
            if ($group) {
                $schedules = Schedule::where('date_from', '>=', $from)
                ->where('date_from', '<=', $till)
                ->where('date_from', '<=', $till)
                ->where(function ($query) use ($group) {
                    $query->where('group', '=', $group)
                          ->orWhere('group', '=', null);
                })
                ->get();
            } else if ($assignedTo) {
                $schedules = Schedule::where('date_from', '>=', $from)
                ->where('date_from', '<=', $till)
                ->where('date_from', '<=', $till)
                ->where(function ($query) use ($assignedTo) {
                    $query->where('assigned_to', '=', $assignedTo)
                          ->orWhere('assigned_to', '=', null);
                })
                ->get();
            }
            
            
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
        'group' => 'required',
        ]);
        
        $user = User::where('api_token', $request->input('api_token'))->first();
        
        if ($user){
            
            $dateFrom = $request->input('date_from');
            $title = $request->input('title');
            $description = $request->input('description');
            $group = $request->input('group');
            $assignedTo = $request->input('assigned_to');
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
                $schedule->group = $group;
                $schedule->assigned_to = $assignedTo;
                $schedule->save();
                
                return response()->json(['status' => 'success','schedule' => $schedule]);  
            }
            catch(Exception $e){
                return response(['message' => $e->getMessage(), 'success' => false],500);  
            }
            
        } else {
            return response()->json(['status' => 'fail'],401);
        }
        
    }

    public function updateschedule(Request $request) {
        
        $this->validate($request, [
        'api_token' => 'required',
        'date_from' => 'required',
        'title' => 'required',
        'schedule_id' => 'required',
        ]);
        
        $user = User::where('api_token', $request->input('api_token'))->first();
        
        if ($user){
            
            $dateFrom = $request->input('date_from');
            $title = $request->input('title');
            $description = $request->input('description');
            $createdBy = $user->id;
            $scheduleId = $request->input('schedule_id');
            $group = $request->input('group');
            $assignedTo = $request->input('assigned_to');
            
            try{
                $schedule = Schedule::find($scheduleId);
                $schedule->update([
                    'date_from' => $dateFrom,
                    'title' => $title,
                    'description' => $description,
                    'group' => $group,
                    'assigned_to' => $assignedTo,
                    ]);
                
                return response()->json(['status' => 'success','schedule' => $schedule]);  
            }
            catch(Exception $e){
                return response(['message' => $e->getMessage(), 'success' => false],500);  
            }
            
        } else {
            return response()->json(['status' => 'fail'],401);
        }
        
    }

    public function deleteschedule(Request $request) {
        
        $this->validate($request, [
        'api_token' => 'required',
        'schedule_id' => 'required',
        ]);
        
        $user = User::where('api_token', $request->input('api_token'))->first();
        
        if ($user){
            
            $dateFrom = $request->input('date_from');
            $id = $request->input('schedule_id');
            
            try{
                $schedule = Schedule::where([['created_by', '=', $user->id], ['id', '=', $id]])->first();
                $deletedSchedule = $schedule->replicate();
                $schedule->delete();
                return response(['status' => 'success', 'schedule' => $deletedSchedule]);
            } catch(Exception $e){
               return response(['message' => $e->getMessage(), 'success' => false],500);  
            }
            
        } else {
            return response()->json(['status' => 'fail'],401);
        }
        
    }
}
        