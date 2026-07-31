<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('letters', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete(); // recipient
            $table->enum('type', ['birthday', 'open_when', 'custom'])->default('custom');
            $table->string('trigger_label')->nullable(); // "Open when you're sad"
            $table->string('title');
            $table->string('preview')->nullable();
            $table->text('content');
            $table->string('signature')->nullable();
            $table->string('emoji')->nullable();
            $table->string('color_theme')->nullable();
            $table->timestamp('unlock_at')->nullable(); // for scheduled/future letters
            $table->timestamp('opened_at')->nullable();
            $table->unsignedInteger('open_count')->default(0);
            $table->timestamps();

            $table->index('type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('letters');
    }
};
