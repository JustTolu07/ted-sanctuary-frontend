<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mood_entries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->enum('mood', ['great', 'good', 'okay', 'low', 'rough']);
            $table->string('emoji')->nullable();
            $table->text('note')->nullable();
            $table->date('entry_date');
            $table->unsignedTinyInteger('energy_level')->nullable(); // 1-5
            $table->timestamps();

            $table->unique(['user_id', 'entry_date']);
            $table->index('entry_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mood_entries');
    }
};
