<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class TimeCapsule extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'title', 'message', 'unlock_date', 'is_unlocked', 'unlocked_at',
    ];

    protected function casts(): array
    {
        return [
            'unlock_date' => 'date',
            'is_unlocked' => 'boolean',
            'unlocked_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function attachments(): MorphMany
    {
        return $this->morphMany(Media::class, 'mediable')->orderBy('sort_order');
    }
}
