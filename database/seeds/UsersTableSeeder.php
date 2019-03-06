<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Errol Mark Tudio',
            'email' => 'errol@tbstdigital.com.au',
            'password' => bcrypt('password'),
            'type' => ('admin'),
            'bio' => (''),
        ]);
    }
}