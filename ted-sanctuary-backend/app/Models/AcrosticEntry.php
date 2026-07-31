<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class AcrosticEntry extends Model
{
    use HasUuids;

    protected $table = 'acrostic_entries';

    protected $fillable = ['letter', 'word', 'badge', 'meaning', 'story', 'sort_order'];
}
