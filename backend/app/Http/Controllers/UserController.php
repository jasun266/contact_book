<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getAll()
    {
        $users = User::where('type', 'user')->get();
        return $users;
    }
    public function get($id)
    {
        $user = User::find($id);
        return response()->json($user, 200);
    }
    public function changeActiveStatus(Request $req)
    {
        $user = User::find($req->id);
        $user->status = $req->status;
        $user->save();

        return response()->json($user, 200);
    }
    public function edit(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name'  => 'required|min:3',
            'email' => 'required|email'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->getMessages(), 400);
        }
        
        $user = User::find($req->id);
        $user->name = $req->name;
        $user->email = $req->email;
        $user->save();

        return response()->json($user, 200);
        
    }
    public function delete(Request $req) {
        $user = User::find($req->id)->delete();
        if($user === null) {
            return response()->json(['error' => '404 user not found'], 404);
        }
        return response()->json($user, 200);
    }
}
