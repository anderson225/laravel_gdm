<?php

namespace App\Http\Controllers;

use App\Models\Realisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RealisateurController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.verify');
    }

    public function count()
    {
        $realisateurs = Realisateur::count();
        return response()->json($realisateurs);
    }

    public function index()
    {
        $realisateurs = Realisateur::all();
        return response()->json([
            'success' => true,
            'realisateurs' => $realisateurs
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255',
                'photo' => 'required|mimes:jpg,jpeg,png'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'error' =>
                        $validator->errors()->toArray()
                ], 400);
            }

            if ($request->file()) {
                $file_name = time() . '_' . $request->photo->getClientOriginalName();
                $file_path = $request->file('photo')->storeAs('uploads', $file_name, 'public');

                $realisateur = new Realisateur();
                $realisateur->name = $request->input('nom');
                $realisateur->photo = '/storage/' . $file_path;
                $realisateur->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'realisateur created.'
            ]);

        } catch (\Exception $ex) {
            return response()->json([
                'success' => false,
                'status' => $ex->getCode(),
                'message' => $ex->getMessage()
            ]);
        }
    }

    public function show(string $slug)
    {
        $realisateurs = Realisateur::where('slug', '=', $slug)->first();
        return response()->json([
            'realisateur' => $realisateurs
        ]);
    }

    public function update(Request $request, string $slug)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'error' =>
                        $validator->errors()->toArray()
                ], 400);
            }

            $realisateur = Realisateur::where('slug', '=', $slug)->first();
            if ($request->file()) {
                $file_name = time() . '_' . $request->photo->getClientOriginalName();
                $file_path = $request->file('photo')->storeAs('uploads', $file_name, 'public');

                $realisateur->name = $request->input('nom');
                $realisateur->photo = '/storage/' . $file_path;
                $realisateur->save();
            } else {
                $realisateur->name = $request->input('nom');
                $realisateur->save();
            }

            return response()->json([
                'success' => true,
                'realisateur' => $realisateur
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
        $realisateurs = Realisateur::where('slug', '=', $slug)->first();
        $realisateurs->delete();

        return response()->json([
            'success' => true,
            'realisateur' => $realisateurs
        ]);
    }

}
