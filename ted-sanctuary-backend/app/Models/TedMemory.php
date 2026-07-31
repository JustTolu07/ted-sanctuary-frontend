<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TedMemory extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'category', 'key', 'value', 'confidence', 'source', 'last_referenced_at',
    ];

    protected function casts(): array
    {
        return [
            'confidence' => 'float',
            'last_referenced_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
