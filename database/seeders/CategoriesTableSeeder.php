<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {


        \DB::table('categories')->delete();

        \DB::table('categories')->insert(array (
            0 =>
            array (
                'id' => 1,
                'slug' => 'livre',
                'nom' => 'Livre',
                'created_at' => '2021-04-02 03:22:07',
                'updated_at' => '2021-04-02 05:52:25',
            ),
        ));


    }
}
