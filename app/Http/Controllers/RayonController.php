<?php

namespace App\Http\Controllers;

use App\Models\Rayon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RayonController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.verify');
    }

    public function index()
    {
        $rayons = Rayon::all();
        return response()->json([
            'rayons' => $rayons
        ]);
    }

    public function count()
    {
        $rayons = Rayon::count();
        return response()->json($rayons);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255|unique:rayons'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'success' => false,
                'error' =>
                    $validator->errors()->toArray()
            ], 400);
        }

        $rayon = new Rayon();
        $rayon->nom = $request->input('nom');
        $rayon->save();

        return response()->json([
            'message' => 'Rayon created.',
            'rayon' => $rayon
        ]);
    }


    public function update(Request $request, string $slug)
    {
        $rayons = Rayon::where('slug', '=', $slug)->first();
        $rayons->nom = $request->input('nom');
        $rayons->save();

        return response()->json([
            'message' => 'updated',
            'success' => true,
            'rayons' => $rayons
        ]);
    }

    public function show(string $slug)
    {
        $rayons = Rayon::where('slug', '=', $slug)->first();
        return response()->json([
            'success' => true,
            'rayons' => $rayons
        ]);
    }

    public function delete(string $slug)
    {
        $rayons = Rayon::where('slug', '=', $slug)->first();
        $rayons->delete();
        return response()->json([
            'message' => 'deleted',
            'success' => true,
            'rayons' => $rayons
        ]);
    }
}
