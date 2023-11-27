<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        $titles = [
            "Introduction to Web Development",
            "Data Science Fundamentals",
            "Digital Marketing Essentials",
            "Mobile App Development with React Native",
            "Artificial Intelligence and Machine Learning",
            "Graphic Design for Beginners",
            "Cryptocurrency and Blockchain Basics",
            "Business Analytics with Python",
            "Social Media Marketing Mastery",
            "Cybersecurity Fundamentals",
            "UX/UI Design Principles",
            "Introduction to Cloud Computing",
            "Video Game Development with Unity",
            "Photography 101",
            "Data Visualization with Tableau",
            "E-commerce Strategies for Success",
            "Python Programming for Beginners",
            "Content Writing and Blogging",
            "Java Programming Masterclass",
            "3D Animation with Blender",
            "Introduction to Project Management",
            "Digital Illustration Techniques",
            "Database Design and SQL Fundamentals",
            "SEO Optimization Strategies",
            "Responsive Web Design with HTML and CSS",
            "Network Security and Ethical Hacking",
            "Agile Methodology in Software Development",
            "Adobe Photoshop Essentials",
            "Financial Literacy and Investment Basics",
            "JavaScript for Web Developers",
            "Machine Learning for Business",
            "Public Speaking and Presentation Skills",
            "Advanced Excel Techniques",
            "Game Design Principles",
            "Angular Framework for Web Development",
            "Introduction to Virtual Reality",
            "Data Ethics and Privacy",
            "Video Editing with Adobe Premiere Pro",
            "Effective Time Management Strategies",
            "TensorFlow for Deep Learning",
            "Creative Writing Workshop",
            "Android App Development with Kotlin",
            "Digital Art and Illustration",
            "Advanced CSS Styling Techniques",
            "IoT (Internet of Things) Fundamentals",
            "Spanish Language Basics",
            "Introduction to Astrophysics",
            "Social Psychology Fundamentals",
            "Cloud Security Best Practices",
            "Flutter for Cross-Platform App Development",
            "Introduction to Robotics",
            "User Research and Usability Testing",
            "Data Warehousing and Business Intelligence",
            "C# Programming for Beginners",
            "Music Production and Composition",
            "Introduction to Quantum Computing",
            "Leadership and Team Management",
            "Raspberry Pi Projects",
            "Content Marketing Strategies",
            "Swift Programming for iOS Development",
            "Conflict Resolution in the Workplace",
            "Vue.js Framework for Frontend Development",
            "Japanese Language Essentials",
            "Financial Modeling with Excel",
            "AR (Augmented Reality) Development",
            "Introduction to Game Theory",
            "TensorFlow for Natural Language Processing",
            "Advanced Java Concepts",
            "Animation for Beginners",
            "Behavioral Economics",
            "AngularJS for Web Development",
            "Introduction to Geographical Information Systems (GIS)",
            "Data Engineering with Apache Spark",
            "Digital Citizenship and Online Safety",
            "Unity Game Development for VR",
            "Kotlin Programming for Android Development",
            "Graphic Design with Adobe Illustrator",
            "Introduction to Meditation and Mindfulness",
            "Python for Data Analysis",
            "Blockchain and Cryptocurrency Regulations",
            "Web Scraping with Python",
            "Creative Problem Solving",
            "Interactive Web Design with JavaScript",
        ];      

        foreach ($titles as $title){
            $course = Course::create([
                'user_id'=>User::all()->random()->id,
                'category_id'=>Category::all()->random()->id,
                'title'=>$title,
                'description'=>$faker->sentence(),
                'image'=>'https://picsum.photos/800/450',
                'is_published'=>1
            ]);

            $limit = intval($faker->numberBetween(5,12));

            for($i=1;$i<=$limit;$i++){
                Chapter::create([
                    'course_id'=>$course->id,
                    'title'=>'Chapter '.strval($i),
                    'description'=>$faker->sentence(),
                    'video'=>'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
                    'position'=>$i,
                    'is_published'=>1
                ]);
            }
        }


    }
}
