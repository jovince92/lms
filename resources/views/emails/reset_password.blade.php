<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Temporary Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #333333;
        }

        p {
            color: #666666;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 3px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Temporary Password Email</h2>
        <p>Hello {{ $name }},</p>
        <p>Your temporary password is: <strong>{{ $password }}</strong></p>
        <p>Please log in using this temporary password and change it as soon as possible.</p>
        <p>If you did not request this password change, please contact support immediately.</p>
        
    </div>

</body>
</html>
