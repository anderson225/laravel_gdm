<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disque extends Model
{
    use HasFactory, Sluggable;

    protected $table = "disques";
    protected $fillable = ["nom", "slug", "img", "description", "categorie_id", "realisateur_id"];

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'nom'
            ]
        ];
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function realisateur()
    {
        return $this->belongsTo(Realisateur::class);
    }
}
