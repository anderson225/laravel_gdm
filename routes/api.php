<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/


Route::get('stat', [App\Http\Controllers\StatController::class, 'index']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('logout', [App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('refresh', [App\Http\Controllers\AuthController::class, 'refresh']);
    Route::get('me', [App\Http\Controllers\AuthController::class, 'me']);
    Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);

    /* rayons */
    Route::get('rayons', [App\Http\Controllers\RayonController::class, 'index']);
    Route::post('rayon', [App\Http\Controllers\RayonController::class, 'store']);
    Route::get('rayon/{slug}', [App\Http\Controllers\RayonController::class, 'update']);
    Route::delete('rayon/{slug}', [App\Http\Controllers\RayonController::class, 'delete']);

    /* categorie */
    Route::get('categories', [App\Http\Controllers\CategorieController::class, 'index']);
    Route::post('categorie', [App\Http\Controllers\CategorieController::class, 'store']);
    Route::get('categorie/{slug}', [App\Http\Controllers\CategorieController::class, 'show']);
    Route::put('categorie/{slug}', [App\Http\Controllers\CategorieController::class, 'update']);
    Route::delete('categorie/{slug}', [App\Http\Controllers\CategorieController::class, 'delete']);

    /* disques */
    Route::get('disques', [App\Http\Controllers\DisqueController::class, 'index']);
    Route::post('disque', [App\Http\Controllers\DisqueController::class, 'store']);
    Route::get('disque/{slug}', [App\Http\Controllers\DisqueController::class, 'show']);
    Route::put('disque/{slug}', [App\Http\Controllers\DisqueController::class, 'update']);
    Route::delete('disque/{slug}', [App\Http\Controllers\DisqueController::class, 'delete']);

    /* realisateurs */
    Route::get('realisateurs', [App\Http\Controllers\RealisateurController::class, 'index']);
    Route::post('realisateur', [App\Http\Controllers\RealisateurController::class, 'store']);
    Route::get('realisateur/{slug}', [App\Http\Controllers\RealisateurController::class, 'show']);
    Route::put('realisateur/{slug}', [App\Http\Controllers\RealisateurController::class, 'update']);
    Route::delete('realisateur/{slug}', [App\Http\Controllers\RealisateurController::class, 'delete']);
});
