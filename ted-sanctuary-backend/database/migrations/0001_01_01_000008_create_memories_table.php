<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('memories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('date_label')->nullable(); // poetic label, e.g. "Every Single Day"
            $table->date('memory_date')->nullable();  // real date, for sorting
            $table->text('description');
            $table->text('detailed_story');
            $table->enum('category', ['adventure', 'cozy', 'milestone', 'romantic']);
            $table->string('heart_color')->nullable(); // tailwind gradient classes
            $table->foreignUuid('cover_media_id')->nullable()
                ->constrained('media')->nullOnDelete();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index('category');
            $table->index('memory_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memories');
    }
};
