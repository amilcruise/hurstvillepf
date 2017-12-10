<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ScheduleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $today = date('Y-m-d');

        DB::table('schedule')->insert([
            'title' => 'Test schedule',
            'date_from' => $today,
            'date_to' => $today,
            'description' => 'This is a test description with a not that long content',
            'created_by' => 1,
            'show' => true,
            'event_type' => 1,
        ]);
    }
}
