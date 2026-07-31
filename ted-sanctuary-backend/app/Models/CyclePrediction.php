<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CyclePrediction extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id', 'predicted_start_date', 'predicted_end_date', 'predicted_ovulation_date',
        'average_cycle_length', 'based_on_logs_count', 'confidence', 'generated_at',
    ];

    protected function casts(): array
    {
        return [
            'predicted_start_date' => 'date',
            'predicted_end_date' => 'date',
            'predicted_ovulation_date' => 'date',
            'generated_at' => 'datetime',
            'confidence' => 'float',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
