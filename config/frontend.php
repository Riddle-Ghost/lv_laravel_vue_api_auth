<?php

return [


    /*
    |--------------------------------------------------------------------------
    | Front URL
    |--------------------------------------------------------------------------
    |
    | This URL is used for email verification in frontend
    | 
    | 
    |
    */

    'url' => env('FRONTEND_URL', 'http://localhost/laravue-test/public'),

    'email_verify_url' => env('FRONTEND_EMAIL_VERIFY_URL', '/verify-email?queryURL='),
    'password_reset_url' => env('FRONTEND_PASSWORD_RESET_URL', '/reset-password?queryURL='),
];
