<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ted_interactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->enum('sender', ['user', 'ted']);
            $table->text('message');
            $table->enum('interaction_type', ['chat', 'greeting', 'check_in'])->default('chat');
            $table->foreignUuid('mood_entry_id')->nullable()
                ->constrained('mood_entries')->nullOnDelete();
            $table->json('context_used')->nullable(); // e.g. which ted_memories informed the reply
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
            $table->index('interaction_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ted_interactions');
    }
};
