<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 100);
            $table->date('date_from');
            $table->date('date_to')->nullable();
            $table->longText('description')->nullable();
            $table->integer('created_by');
            $table->boolean('show');
            $table->integer('event_type')->nullable();
            $table->enum('links',[])->nullable();
            $table->enum('tags',[])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule');
    }
}
