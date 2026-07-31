<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MoodEntry extends Model
{
    use HasUuids;

    protected $fillable = ['user_id', 'mood', 'emoji', 'note', 'entry_date', 'energy_level'];

    protected function casts(): array
    {
        return ['entry_date' => 'date'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tedInteractions(): HasMany
    {
        return $this->hasMany(TedInteraction::class);
    }
}
