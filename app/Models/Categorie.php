<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory, Sluggable;

    protected $table = "categories";
    protected $fillable = ["nom", "slug"];

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'nom'
            ]
        ];
    }
}
