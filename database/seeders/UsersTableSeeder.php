<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {


        \DB::table('users')->delete();

        \DB::table('users')->insert(array (
            0 =>
            array (
                'id' => 1,
                'name' => 'Anderson Ble',
                'email' => 'esolinble@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$oSktjLOoYzhI5WLs5ak1.eajZEIlvHN2mRRef.L1EgPAKqJVeQX9G',
                'remember_token' => NULL,
                'created_at' => '2021-04-01 21:49:52',
                'updated_at' => '2021-04-01 21:49:52',
            ),
        ));


    }
}
