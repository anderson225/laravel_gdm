<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDisqueTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('disques', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('nom');
            $table->string('img');
            $table->longText('description');
            $table->unsignedBigInteger('categorie_id');
            $table->unsignedBigInteger('realisateur_id');
            $table->date('date_sortie');
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
        Schema::dropIfExists('disques');
    }
}
