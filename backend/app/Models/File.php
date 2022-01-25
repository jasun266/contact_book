<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'filename',
        'total_uploaded',
        'total_processed',
        'user_id'
    ];
    function file_groups() {
        return $this->hasMany(FileGroup::class, 'file_id', 'id');
    }
}
