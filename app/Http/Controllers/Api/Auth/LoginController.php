<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Логин или пароль неверный',
                'errors' => 'Unauthorised'
            ], 401);
        }

        if (!Auth::user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Эмейл не подтвержден',
                'errors' => 'Forbidden'
            ], 403);
        }

        $response = $this->createToken(Auth::user(), $request->remember);

        return $response;
    }
}
