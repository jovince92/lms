<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseRating;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class CourseRatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $courses = Course::where('is_published',1)->get();
        $faker = Factory::create();
        $feedback = array(
            "Excellent course! The content is well-organized and easy to follow.",
            "I appreciate the hands-on exercises. They really helped solidify my understanding of PHP.",
            "The instructor is knowledgeable and explains complex concepts in a clear and concise manner.",
            "I've taken other PHP courses before, but this one stands out for its depth and practical examples.",
            "The quizzes at the end of each section are a great way to reinforce learning. Thumbs up!",
            "The course covers a wide range of PHP topics, making it a comprehensive learning experience.",
            "The real-world projects are a fantastic addition. They give a taste of what it's like to work on PHP projects in the industry.",
            "The support from the community forum is valuable. It's great to connect with other learners and get help when needed.",
            "The video quality is excellent, and the code examples are easy to read and understand.",
            "I appreciate the regular updates to the course content. It shows a commitment to keeping the material current.",
            "This course exceeded my expectations. I feel confident in my PHP skills after completing it.",
            "The pacing of the course is just right. It's challenging enough to keep you engaged but not overwhelming."
        );
        foreach($courses as $course){
            foreach($users as $user){
                if($course->user_id==$user->id) continue;
                CourseRating::create([
                    'course_id'=>$course->id,
                    'user_id'=>$user->id,
                    'feedback'=>$faker->randomElement($feedback),
                    'rating'=>rand(1,5)
                ]);
            }
        }
    }
}
