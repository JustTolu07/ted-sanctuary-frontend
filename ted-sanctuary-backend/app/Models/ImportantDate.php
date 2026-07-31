<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImportantDate extends Model
{
    use HasUuids;

    protected $table = 'important_dates';

    protected $fillable = [
        'user_id', 'title', 'event_date', 'is_recurring', 'reminder_days_before', 'notes',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date',
            'is_recurring' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
