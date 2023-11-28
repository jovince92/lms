<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Language;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        
        $faker = Factory::create();

        Language::create(['name'=>'English']);
        Language::create(['name'=>'Filipino']);
        for($i=0;$i<=25;$i++){
            User::create([
                'first_name'=>$faker->firstName(),
                'last_name'=>$faker->lastName(),
                'company_id'=>$faker->bothify('??#?'),
                'photo'=>'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?',
                'position'=>$faker->jobTitle(),
                'department'=>$faker->company(),
                'password'=>bcrypt('1234')
            ]);
        }

        $categories = array(
            "Programming", 
            "Web Development",
            "Mobile App Development",
            "Data Science",
            "Machine Learning",
            "Artificial Intelligence",
            "Blockchain",
            "Cybersecurity",
            "Cloud Computing",
            "Database Management",
            "Software Engineering",
            "Graphic Design",
            "Digital Marketing",
            "Content Writing",
            "Project Management",
            "Business Analysis",
            "Finance and Accounting",
            "Entrepreneurship",
            "Leadership",
            "Communication Skills",
            "Team Building",
            "Time Management",
            "Personal Development",
            "Health and Fitness",
            "Nutrition",
            "Mindfulness",
            "Language Learning",
            "Photography",
            "Music Production",
            "Video Editing",
            "Animation",
            "Game Development",
            "Virtual Reality (VR)",
            "Augmented Reality (AR)",
            "Robotics",
            "Environmental Science",
            "History",
            "Philosophy",
            "Psychology",
            "Sociology"
        );
        foreach ($categories as  $cat){
            Category::create(['category'=>$cat,'icon_map_number'=>$faker->numberBetween(1,12)]);
        }
    }
}
