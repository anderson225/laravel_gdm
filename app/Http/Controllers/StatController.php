<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Disque;
use App\Models\Rayon;
use Illuminate\Http\Request;

class StatController extends Controller
{
    public function index()
    {
        $rayons = Disque::count();
        $realisateurs = Disque::count();
        $disques = Disque::count();
        $categories = Categorie::count();
        return response()->json([
            'rayons' => $rayons,
            'realisateurs' => $realisateurs,
            'disques' => $disques,
            'categories' => $categories
        ]);
    }
}
