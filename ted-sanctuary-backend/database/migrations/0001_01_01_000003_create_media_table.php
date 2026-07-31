<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Created before memories/letters/time_capsules so those tables can FK cover_media_id into it.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->uuid('id')->primary();
            // Polymorphic target: memories, letters, or time_capsules.
            $table->string('mediable_type');
            $table->uuid('mediable_id');
            $table->enum('type', ['photo', 'video', 'voice_note']);
            $table->string('file_path');
            $table->string('thumbnail_path')->nullable();
            $table->string('caption')->nullable();
            $table->unsignedInteger('duration_seconds')->nullable(); // video/voice only
            $table->unsignedInteger('file_size_bytes')->nullable();
            $table->date('taken_at')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['mediable_type', 'mediable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
