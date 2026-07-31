<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Letter extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'type', 'trigger_label', 'title', 'preview', 'content',
        'signature', 'emoji', 'color_theme', 'unlock_at', 'opened_at', 'open_count',
    ];

    protected function casts(): array
    {
        return [
            'unlock_at' => 'datetime',
            'opened_at' => 'datetime',
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

    public function markOpened(): void
    {
        $this->update(['opened_at' => now(), 'open_count' => $this->open_count + 1]);
    }
}
