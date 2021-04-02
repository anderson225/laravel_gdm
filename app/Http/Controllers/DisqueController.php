<?php

namespace App\Http\Controllers;

use App\Models\Disque;
use App\Models\Rayon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DisqueController extends Controller
{
    public function count()
    {
        $disques = Disque::count();
        return response()->json($disques);
    }

    public function index()
    {
        $disques = Disque::with('realisateur', 'categorie')->get();
        return response()->json([
            'disques' => $disques
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255',
                'img' => 'required|mimes:jpg,jpeg,png',
                'description' => 'required',
                'categorie_id' => 'required',
                'realisateur_id' => 'required',
                'date_sortie' => 'required|date',
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
                $file_name = time() . '_' . $request->img->getClientOriginalName();
                $file_path = $request->file('img')->storeAs('uploads', $file_name, 'public');
                $disque = new Disque();
                $disque->nom = $request->input('nom');
                $disque->img = '/storage/' . $file_path;
                $disque->description = $request->input('description');
                $disque->categorie_id = $request->input('categorie_id');
                $disque->realisateur_id = $request->input('realisateur_id');
                $disque->date_sortie = $request->input('date_sortie');
                $disque->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Disque created.',
                'disque' => $disque
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
        $disque = Disque::where('slug', '=', $slug)->first();
        return response()->json([
            'success' => true,
            'disque' => $disque
        ]);
    }

    public function update(Request $request, string $slug)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255',
                'description' => 'required',
                'categorie_id' => 'required',
                'realisateur_id' => 'required',
                'date_sortie' => 'required|date'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'error' =>
                        $validator->errors()->toArray()
                ], 400);
            }
            /* enregistrement */
            $disques = Disque::where('slug', '=', $slug)->first();
            if ($request->file()) {
                $file_name = time() . '_' . $request->img->getClientOriginalName();
                $file_path = $request->file('img')->storeAs('uploads', $file_name, 'public');
                $disques->img = '/storage/' . $file_path;
            }
            $disques->nom = $request->input('nom');
            $disques->description = $request->input('description');
            $disques->categorie_id = $request->input('categorie_id');
            $disques->realisateur_id = $request->input('realisateur_id');
            $disques->date_sortie = $request->input('date_sortie');
            $disques->save();

            return response()->json([
                'success' => true,
                'disque' => $disques
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
        $disques = Disque::where('slug', '=', $slug)->first();
        $disques->delete();
        return response()->json([
            'disque' => $disques
        ]);
    }
}
