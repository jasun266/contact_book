<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class Auth extends Controller
{
    public function login(Request $req)
    {
        $email = $req->email;
        $password = $req->password;
        $user = User::where('email', $email)->first();
        if($user === null) {
            return response()->json(['error' => 'Invalid Credential'], 200);
        } 
        // Checks if saved password requires hashing
        if (Hash::needsRehash($user->password))
        {
            if($password !== $user->password) {
                return respons()->json(['error' => 'Invalid Credential'], 200);
            } else {
                // Rehash the password and save again to the database
                $hashed = Hash::make($password);
                $user->password = $hashed;
                $token = Hash::make(Str::random(60));
                $user->token = $token;
                $user->save();

                return response()->json(['user' => $user, 'token' => $token], 200);
            }
        } else {
            if(!Hash::check($password, $user->password)) {
                return response()->json(['error' => 'Invalid Credential'], 200);
            }  else {
                $token = Hash::make(Str::random(60));
                $user->token = $token;
                $user->save();
                return response()->json(['user'=> $user, 'token' => $token], 200);
            }
        }
    }
    public function register(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name'  => 'required|min:3',
            'email'     => 'required|unique:users|email',
            'password'  => 'required|min:6|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/',
            'cpassword' => 'required|same:password'
        ]);
        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()->getMessages()], 200);
        }
        $user = User::insert([
            'name' => $req->name,
            'email' => $req->email,
            'password' => Hash::make($req->password),
            'status' => 1,
            'type' => 'user'
        ]);
        return response()->json($user, 201);
    }
    public function logout(Request $req)
    {
        $user = User::find($req->user->id);
        $user->token = null;
        $user->save();
    }
}
