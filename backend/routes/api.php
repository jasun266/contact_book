<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FileController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['api-cors', 'web']], function() {
    Route::post('/login', [Auth::class, 'login']);
    Route::post('/register', [Auth::class, 'register']);
    Route::post('/file/upload', [FileController::class, 'upload']);
    Route::get('/file/all', [FileController::class, 'allFiles']);
    Route::get('/file/groups/all/{id}', [FileController::class, 'allGroupFiles']);
    Route::get('/file/groups/all-data/{id}', [FileController::class, 'allData']);

    Route::group(['middleware' => ['login']], function() {
        Route::get('/logout', [Auth::class, 'logout']);
        Route::get('/user/{id}', [UserController::class, 'get']);

        Route::post('/file/upload', [FileController::class, 'upload']);
        Route::group(['middleware' => ['admin-login']], function() {
            Route::get('/users', [UserController::class, 'getAll']);
            Route::post('/change-active-status', [UserController::class, 'changeActiveStatus']);
            Route::post('/edit/user', [UserController::class, 'edit']);
            Route::post('/delete/user', [UserController::class, 'delete']);
        });
    });
});