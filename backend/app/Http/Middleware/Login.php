<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class Login
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $authtoken = $request->bearerToken();
        $token = explode('::', $authtoken)[0];
        $user_id = explode('::', $authtoken)[1];
        $user = User::where('id', '=', $user_id)->where('token', '=', $token)->first();
        if($user !== null) {
            $request->user = $user;
            return $next($request);
        } else {
            return response()->json([
                'error' => 'Authentication failed'
            ]);
        }
        return $next($request);
    }
}
