<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'amilcruise',
            'email' => 'amilcruise@yahoo.com',
            'password' => app('hash')->make('Aprilann1'),
            'api_token' => str_random(60),
        ]);
    }
}
