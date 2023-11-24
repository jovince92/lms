<?php

namespace Database\Seeders;

use App\Models\Category;
use Faker\Factory;
use Illuminate\Database\Seeder;

class CategoryIconRandomizerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();
        $faker = Factory::create();

        foreach($categories as $category){
            $category->update([
                'icon_map_number'=>$faker->numberBetween(0,11)
            ]);
        }
    }
}
