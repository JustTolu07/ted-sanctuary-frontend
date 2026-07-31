<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ted_memories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->string('category'); // e.g. preference, routine, trigger, comfort_item
            $table->string('key');      // e.g. favorite_drink
            $table->text('value');
            $table->float('confidence')->default(1); // 0-1, how sure TED is
            $table->enum('source', ['conversation', 'manual', 'mood_entry', 'inferred'])
                ->default('manual');
            $table->timestamp('last_referenced_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'key']);
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ted_memories');
    }
};
