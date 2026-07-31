<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('artist')->nullable();
            $table->enum('provider', ['spotify', 'youtube', 'soundcloud', 'other'])->nullable();
            $table->string('external_url')->nullable();
            $table->string('cover_art_url')->nullable();
            $table->text('note')->nullable(); // why this song matters
            $table->foreignUuid('added_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
