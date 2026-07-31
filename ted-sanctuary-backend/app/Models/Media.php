<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Media extends Model
{
    use HasUuids;

    protected $table = 'media';

    protected $fillable = [
        'mediable_type', 'mediable_id', 'type', 'file_path', 'thumbnail_path',
        'caption', 'duration_seconds', 'file_size_bytes', 'taken_at', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'taken_at' => 'date',
        ];
    }

    public function mediable(): MorphTo
    {
        return $this->morphTo();
    }
}
