<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Note: named Notification (custom model), not Laravel's notifications facade —
// this is app-level reminder data, queried directly rather than fired via ->notify().
class Notification extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'type', 'title', 'body', 'channel', 'scheduled_at', 'sent_at', 'read_at',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
            'sent_at' => 'datetime',
            'read_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function markRead(): void
    {
        $this->update(['read_at' => now()]);
    }
}
