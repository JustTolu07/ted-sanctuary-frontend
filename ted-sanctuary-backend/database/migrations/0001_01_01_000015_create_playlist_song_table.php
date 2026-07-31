<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('playlist_song', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('playlist_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('song_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('position')->default(0);
            $table->timestamps();

            $table->unique(['playlist_id', 'song_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('playlist_song');
    }
};
