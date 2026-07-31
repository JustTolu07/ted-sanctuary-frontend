<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasUuids, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'avatar_url',
        'city', 'country', 'timezone', 'birthday', 'bio', 'last_login_at',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'birthday' => 'date',
            'last_login_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function tedMemories(): HasMany
    {
        return $this->hasMany(TedMemory::class);
    }

    public function moodEntries(): HasMany
    {
        return $this->hasMany(MoodEntry::class);
    }

    public function periodLogs(): HasMany
    {
        return $this->hasMany(PeriodLog::class);
    }

    public function cyclePredictions(): HasMany
    {
        return $this->hasMany(CyclePrediction::class);
    }

    public function memories(): HasMany
    {
        return $this->hasMany(Memory::class);
    }

    public function letters(): HasMany
    {
        return $this->hasMany(Letter::class);
    }

    public function importantDates(): HasMany
    {
        return $this->hasMany(ImportantDate::class);
    }

    public function timeCapsules(): HasMany
    {
        return $this->hasMany(TimeCapsule::class);
    }

    public function futureDreams(): HasMany
    {
        return $this->hasMany(FutureDream::class);
    }

    public function playlists(): HasMany
    {
        return $this->hasMany(Playlist::class);
    }

    public function tedInteractions(): HasMany
    {
        return $this->hasMany(TedInteraction::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function settings(): HasMany
    {
        return $this->hasMany(Setting::class);
    }

    public function isRecipient(): bool
    {
        return $this->role === 'recipient';
    }
}
