<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FutureDream extends Model
{
    use HasUuids;

    protected $fillable = ['user_id', 'title', 'description', 'target_date', 'status'];

    protected function casts(): array
    {
        return ['target_date' => 'date'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
