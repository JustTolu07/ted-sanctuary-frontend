<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TedInteraction extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'sender', 'message', 'interaction_type', 'mood_entry_id', 'context_used',
    ];

    protected function casts(): array
    {
        return ['context_used' => 'array'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function moodEntry(): BelongsTo
    {
        return $this->belongsTo(MoodEntry::class);
    }
}
