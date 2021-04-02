<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.verify');
    }

    public function count()
    {
        $categories = Categorie::count();
        return response()->json($categories);
    }

    public function index()
    {
        $categories = Categorie::all();
        return response()->json([
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255|unique:categories'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'error' =>
                        $validator->errors()->toArray()
                ], 400);
            }

            $categorie = new Categorie();
            $categorie->nom = $request->input('nom');
            $categorie->save();

            return response()->json([
                'message' => 'categorie created.',
                'categorie' => $categorie
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                'status' => $ex->getCode(),
                'message' => $ex->getMessage()
            ]);
        }
    }

    public function show(string $slug)
    {
        $categories = Categorie::where('slug', '=', $slug)->first();
        return response()->json([
            'success' => true,
            'categorie' => $categories
        ]);
    }

    public function update(Request $request, string $slug)
    {
        try {
            $categories = Categorie::where('slug', '=', $slug)->first();
            $categories->nom = $request->input('nom');
            $categories->save();
            return response()->json([
                'message' => 'updated',
                'success' => true,
                'categorie' => $categories
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                'success' => false,
                'status' => $ex->getCode(),
                'message' => $ex->getMessage()
            ]);
        }
    }

    public function delete(string $slug)
    {
        $categories = Categorie::where('slug', '=', $slug)->first();
        $categories->delete();
        return response()->json([
            'message' => 'deleted',
            'success' => true,
            'categorie' => $categories
        ]);
    }
}
