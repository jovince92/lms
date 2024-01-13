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
        $positions = ["ACCOUNTING HEAD","ACCOUNTING STAFF","ACTING TEAM MANAGER 1","ACTING TEAM MANAGER 2","ACTING TEAM MANAGER 3","ACTING TEAM MANAGER 4","ADMIN STAFF","ADMINISTRATION MANAGER","ADVISOR","ADVISOR 1","AIMS HEAD","AIMS STAFF","AIRCON TECHNICIAN","ASSISTANT OPERATIONS MANAGER","ASSISTANT OPERATIONS MANAGER 1","ASSISTANT OPERATIONS MANAGER 2","ASSISTANT OPERATIONS MANAGER 3","ASSISTANT PROJECT COORDINATOR","ASSISTANT PROJECT SUPERVISOR","ASSISTANT TEAM LEADER","BACK OFFICE SUPPORT","BACK-UP PROJECT COORDINATOR","BACK-UP SUPERVISOR","BILLER","CEO AND PRESIDENT","CLERK","COMPANY DRIVER","CUSTOMER SERVICE REPRESENTATIVE","DATA ANALYST","DATA CONTROLLER","DATA ENCODER","DATA ENCOER","DATA MANAGER","DOCUMENTATION OFFICER","ENGINEERING INDEXER","EXECUTIVE ASSISTANT","FACILITIES MAINTENANCE SUPERVISOR","FINANCIAL DATA ANALYST","GENERAL MANAGER","GRAPHIC DESIGNER","GROUP TEAM LEADER","HEAD PROCESSOR","HEAD PROJECT COORDINATOR","HR MANAGER","HRD STAFF","INSIDE SALES REPRESENTATIVE","IT MANAGER","IT MONITORING","IT REMOTE SUPPORT SPECIALIST","IT STAFF","KEY ENTRY OPERATOR","LEAD QUALITY CONTROLLER","MAIN PROJECT COORDINATOR","MAINTENANCE","MEDICAL INDEXER","MESSENGER","NETSUITE ADMINISTRATOR","NETWORK ADMINISTRATOR","OPERATION CLERK","OPERATIONS MANAGER","OPERATIONS MANAGER 1","OPERATIONS MANAGER 2","OPERATIONS SUPERVISOR","PAYROLL CLERK","PC MONITORING/CLERK","PROCESSOR","PRODUCTION ANALYST","PRODUCTION ASSISTANT","PRODUCTION SUPERVISOR","PROGRAMMER","PROJECT CONSULTANT","PROJECT COORDINATOR","PROJECT COORDINATOR 2","PROJECT MANAGER","PROJECT SUPERVISOR","PURCHASING ASSISTANT","PURCHASING STAFF","QC - EDITOR","QC SUPERVISOR","QUALITY ANALYST","QUALITY ANALYST 1","QUALITY ANALYST 2","QUALITY ANALYST 3","QUALITY ANALYST 4","QUALITY ASSURANCE OFFICER","QUALITY CONTROLLER","QUALITY SUPERVISOR","R & D STAFF","RATER","REAL TIME ANALYST","RECEPTIONIST","RELIEVER","REPORTS ANALYST","REVIEWER","SENIOR TECHNICIAN","SITE MANAGER","SITE SUPERVISOR","SOCIAL MEDIA STAFF","SOFTWARE MANAGER","SUPERVISOR","SUPERVISOR 1","SUPERVISOR 2","SYSTEM ADMINISTRATOR","SYSTEM TESTER","TEAM LEADER","TEAM LEADER 1","TEAM LEADER 2","TEAM LEADER 3","TEAM LEADER 4","TEAM LEADER 5","TEAM MANAGER 1","TEAM MANAGER 2","TEAM MANAGER 3","TIMEKEEPER","TRAINER","TRAINER 1","TRAINER 2","TRAINING & LANGUAGE COACH","TRAINING & QUALITY OFFICER","UTILITY","VERIFIER","VP - FINANCE","WORKFORCE PLANNING MANAGEMENT"];
        $depts = ["AACT","AACT, EXLA, MORAN, PITD, SEFL","ACCOUNTING","ADMIN","AIMS/PURCHASING","APAC ODC","ASGL","ASGL, DYLT, TFF","AVRT","AVRT, CTBV_FBE, PMLI, SMTL, WARD","BAKER HUGHES","BOOHOO","BR MATCHING","BR MATCHING, GB MATCHING, MY MATCHING","BROKERAGE","CA ODC","CCO","CCO - CTBV","CCO - EORI","CCO - GLS","CCO - IL200","CCO - PACE","CCO - SUTTON","CCO - TFF","CCO - VALC","CCO - WWEX","CLNI, CTBV_POD, DDXE, FRNT,IL200, PFEG, DOHRN","CMFC","CSUK","CTBV_FBE","CTBV_POD","DATA TEAM","DDXE","DOHRN","DYLT","ENGINEERING INDEXING","EU ODC","EXLA","EXLA BT","FPO","FRNT","FTSC, MTVL, OAKH, OFFEN, PMLI, RIST, RRTS, SU","GB ARCHIVE","GB ARCHIVE, GB MATCHING, MY MATC","GB MATCHING","GLS","HONORLOCK","HUMAN RESOURCES","IL200","INDEXING","IT","MANAGEMENT","MGUL","MINI PROJECT - EU ODC","MORAN","MTVL","MTVL, OAKH, RLCA,VALC","MY MATCHING","N-FPO","OAKH","OFFEN","OFFEN, SUTTON, RRTS, CMFC, RIST, TSTO","PC","PFEG","PITD","PRODUCTION","PRODUCTION - BSD ONLINE JOB","PRODUCTION - CAS","PRODUCTION - CS GLOBAL","PRODUCTION - CS US ONLINE","PRODUCTION - CS-US (QUICKBOOKS)","PRODUCTION - CSUS ONLINE/MULTI PROJECTS","PRODUCTION - DATA CONTROL","PRODUCTION - E-MARKER/MORPHEUS","PRODUCTION - E-RECEIPT/MORPHEUS","PRODUCTION - KCK GLOBAL","PRODUCTION - MEDISTREAM COMMERCIAL","PRODUCTION - MEDISTREAM ONLINE(COMMERCIAL)","PRODUCTION - MEDISTREAM ONLINE(CORRESPONDENCE","PRODUCTION - MEDISTREAM ONLINE(CROSS TRAINEE)","PRODUCTION - MEDISTREAM ONLINE(EMORY)","PRODUCTION - MEDISTREAM ONLINE(PP&PM)","PRODUCTION - MORPHEUS","PRODUCTION - MULTI PROJECTS","PRODUCTION - ROCKWELL COLLINS","PRODUCTION - TAPING","PRODUCTION - TIE","PROFILE PENSION","QC","RIST","RLCA","RRTS","SEFL","SMTL","SOFTWARE","SUON","TFF","TSTO","UPS GLOBAL MANAGEMENT","UPSG","US MATCHING","US ODC","US ODC, CA ODC","VALC","VOLKSWAGEN","WARD","WARD, CTBV, FRNT, OAKH, TSTO, DYLT, MTVL, TFF","WORKFORCE TEAM","ZA BROKERAGE","ZA BROKERAGE, ZA MATCHING"];

        Language::create(['name'=>'English']);
        Language::create(['name'=>'Filipino']);
        for($i=0;$i<=25;$i++){
            User::create([
                'first_name'=>$faker->firstName(),
                'last_name'=>$faker->lastName(),
                'company_id'=>$faker->bothify('??#?'),
                'photo'=>'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?',
                'position'=>$faker->randomElement($positions),
                'department'=>$faker->randomElement($depts),
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
