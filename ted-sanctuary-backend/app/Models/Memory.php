<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Memory extends Model
{
    use HasUuids;

    protected $table = 'memories';

    protected $fillable = [
        'user_id', 'title', 'slug', 'date_label', 'memory_date', 'description',
        'detailed_story', 'category', 'heart_color', 'cover_media_id', 'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'memory_date' => 'date',
            'is_featured' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cover(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'cover_media_id');
    }

    public function gallery(): MorphMany
    {
        return $this->morphMany(Media::class, 'mediable')->orderBy('sort_order');
    }
}
