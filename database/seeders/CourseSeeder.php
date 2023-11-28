<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Chapter;
use App\Models\Course;
use App\Models\Language;
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
        $titles =[
            "Introduction to Web Development",
            "Data Science Fundamentals",
            "Graphic Design for Beginners",
            "Python Programming Masterclass",
            "Digital Marketing Strategies",
            "Artificial Intelligence Basics",
            "Java Programming for Beginners",
            "Photography Essentials",
            "Mobile App Development with React Native",
            "Cybersecurity Fundamentals",
            "Machine Learning in Practice",
            "User Experience (UX) Design",
            "Blockchain Technology Explained",
            "Social Media Marketing Strategies",
            "JavaScript for Front-End Development",
            "Introduction to Cloud Computing",
            "Game Development with Unity",
            "Creative Writing Workshop",
            "SQL Database Management",
            "Responsive Web Design",
            "Introduction to Internet of Things (IoT)",
            "Project Management Essentials",
            "Video Editing Basics",
            "Networking Fundamentals",
            "E-commerce Strategies",
            "C++ Programming for Beginners",
            "UI/UX Design Principles",
            "Data Visualization with Tableau",
            "Android App Development",
            "Advanced Excel Techniques",
            "Fundamentals of 3D Printing",
            "Ethical Hacking Techniques",
            "Content Marketing Fundamentals",
            "PHP Web Development",
            "Introduction to Virtual Reality (VR)",
            "Angular Framework Basics",
            "Creative Problem Solving",
            "iOS App Development with Swift",
            "Machine Learning for Business",
            "Introduction to Robotics",
            "Business Analytics with Python",
            "SEO Strategies and Best Practices",
            "C# Programming for Beginners",
            "WordPress Website Development",
            "Big Data Analytics",
            "Artificial Intelligence in Healthcare",
            "Advanced CSS Styling",
            "Digital Illustration Techniques",
            "Data Warehousing Concepts",
            "React.js for Front-End Development",
            "Social Media Analytics",
            "Network Security Fundamentals",
            "Game Design Principles",
            "Business Communication Skills",
            "Adobe Photoshop Mastery",
            "Cloud Security Best Practices",
            "Vue.js Framework Basics",
            "Creative Entrepreneurship",
            "Data Ethics and Privacy",
            "Swift Programming for iOS Development",
            "Web Accessibility Standards",
            "Human-Computer Interaction (HCI)",
            "Financial Literacy for Entrepreneurs",
            "Augmented Reality Development",
            "Advanced Java Programming",
            "Data Mining Techniques",
            "Adobe Illustrator Essentials",
            "DevOps Practices and Tools",
            "Content Writing Strategies",
            "Introduction to Quantum Computing",
            "Flutter App Development",
            "Advanced Data Analysis with R",
            "Business Intelligence Concepts",
            "Interactive Web Design",
            "Raspberry Pi Projects",
            "User Interface (UI) Design Principles",
            "Database Administration",
            "TensorFlow for Machine Learning",
            "Digital Art and Animation",
            "Microsoft Azure Fundamentals",
            "Advanced PHP Development",
            "Business Process Modeling",
            "Unity Game Development",
            "Internet Security Fundamentals",
            "Vue.js for Front-End Development",
            "Digital Citizenship",
            "Data Science for Social Good",
            "Responsive Email Design",
            "Business Negotiation Skills",
            "3D Modeling with Blender",
            "Social Entrepreneurship",
            "WordPress Theme Development",
            "Data Engineering Basics",
            "Mobile Game Development",
            "Creative Leadership",
            "Elasticsearch Fundamentals",
            "Content Management Systems (CMS)",
            "Data Governance Principles",
            "Adobe Premiere Pro Mastery",
            "Artificial Intelligence in Finance",
            "Node.js for Back-End Development",
            "Project Risk Management",
            "Video Game Design Principles",
            "Effective Time Management",
            "Vue.js for Front-End Development",
            "Emotional Intelligence in the Workplace",
            "Web Scraping with Python",
            "Agile Project Management",
            "Digital Storytelling",
        ];
            

        foreach ($titles as $title){
            $course = Course::create([
                'user_id'=>User::all()->random()->id,
                'category_id'=>Category::all()->random()->id,
                'language_id'=>Language::all()->random()->id,
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
                    'duration'=>'00:00:45',
                    'position'=>$i,
                    'is_published'=>1
                ]);
            }
        }


    }
}
