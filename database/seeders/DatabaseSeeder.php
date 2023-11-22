<?php

namespace Database\Seeders;

use App\Models\Category;
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
            Category::create(['category'=>$cat]);
        }
    }
}
