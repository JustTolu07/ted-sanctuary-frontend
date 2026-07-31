<?php

namespace Database\Seeders;

use App\Models\AcrosticEntry;
use App\Models\CyclePrediction;
use App\Models\FutureDream;
use App\Models\ImportantDate;
use App\Models\Letter;
use App\Models\Media;
use App\Models\Memory;
use App\Models\MoodEntry;
use App\Models\Notification;
use App\Models\PeriodLog;
use App\Models\Playlist;
use App\Models\Setting;
use App\Models\Song;
use App\Models\TedInteraction;
use App\Models\TedMemory;
use App\Models\TimeCapsule;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // --- The two users ---
        $smadar = User::create([
            'name' => 'Smadar',
            'email' => 'smadar@example.com',
            'password' => Hash::make('change-me'),
            'role' => 'recipient',
            'city' => 'Montreal',
            'country' => 'Canada',
            'timezone' => 'America/Montreal',
            'birthday' => '2000-07-17',
            'bio' => 'The whole reason this app exists.',
        ]);

        $toluwani = User::create([
            'name' => 'Toluwani',
            'email' => 'toluwani@example.com',
            'password' => Hash::make('change-me'),
            'role' => 'admin',
            'city' => 'Abuja',
            'country' => 'Nigeria',
            'timezone' => 'Africa/Lagos',
        ]);

        // --- TED memories (facts learned about Smadar) ---
        TedMemory::insert([
            [
                'id' => Str::uuid(),
                'user_id' => $smadar->id,
                'category' => 'preference',
                'key' => 'favorite_drink',
                'value' => 'Warm coffee with oat milk',
                'confidence' => 0.95,
                'source' => 'conversation',
                'last_referenced_at' => now()->subDays(2),
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'user_id' => $smadar->id,
                'category' => 'trigger',
                'key' => 'stress_source',
                'value' => 'Exam weeks and tight deadlines',
                'confidence' => 0.8,
                'source' => 'inferred',
                'last_referenced_at' => now()->subDays(10),
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'user_id' => $smadar->id,
                'category' => 'comfort_item',
                'key' => 'plushie',
                'value' => 'TED the teddy bear',
                'confidence' => 1,
                'source' => 'manual',
                'created_at' => now(), 'updated_at' => now(),
            ],
        ]);

        // --- Mood entries (last 5 days) ---
        collect(range(4, 0))->each(function (int $daysAgo) use ($smadar) {
            MoodEntry::create([
                'user_id' => $smadar->id,
                'mood' => ['good', 'okay', 'great', 'low', 'good'][$daysAgo],
                'emoji' => ['🙂', '😐', '🥰', '😔', '🙂'][$daysAgo],
                'note' => $daysAgo === 3 ? 'Rough day with coursework.' : null,
                'entry_date' => now()->subDays($daysAgo)->toDateString(),
                'energy_level' => [3, 2, 4, 2, 3][$daysAgo],
            ]);
        });

        // --- Period tracking ---
        $log1 = PeriodLog::create([
            'user_id' => $smadar->id,
            'start_date' => now()->subDays(35)->toDateString(),
            'end_date' => now()->subDays(30)->toDateString(),
            'flow_intensity' => 'medium',
            'symptoms' => ['cramps', 'fatigue'],
        ]);

        $log2 = PeriodLog::create([
            'user_id' => $smadar->id,
            'start_date' => now()->subDays(7)->toDateString(),
            'end_date' => now()->subDays(2)->toDateString(),
            'flow_intensity' => 'light',
            'symptoms' => ['headache'],
        ]);

        CyclePrediction::create([
            'user_id' => $smadar->id,
            'predicted_start_date' => now()->addDays(21)->toDateString(),
            'predicted_ovulation_date' => now()->addDays(7)->toDateString(),
            'average_cycle_length' => 28,
            'based_on_logs_count' => 2,
            'confidence' => 0.6,
            'generated_at' => now(),
        ]);

        // --- Memories (Our Story) ---
        $memoryData = [
            [
                'title' => 'Our Late Night Coffee Dates',
                'date_label' => 'Every Single Day',
                'description' => 'Separated by oceans, but sitting side-by-side with our warm mugs on camera.',
                'detailed_story' => 'Remember our coffee video calls, Smadar? ...',
                'category' => 'cozy',
                'heart_color' => 'from-amber-300 to-rose-400',
            ],
            [
                'title' => 'The Same Horizon Connects Us',
                'date_label' => 'An Unbroken Promise',
                'description' => 'Looking out at the sky from Nigeria, knowing it stretches all the way to Canada.',
                'detailed_story' => 'Whenever I look at the sunset here in Nigeria...',
                'category' => 'romantic',
                'heart_color' => 'from-rose-400 to-pink-600',
            ],
            [
                'title' => 'A Permanent Sanctuary for You',
                'date_label' => 'Now & Forever',
                'memory_date' => '2026-07-17',
                'description' => 'A little corner of the web built to remind you how deeply you are adored.',
                'detailed_story' => 'I built this digital sanctuary because the internet is permanent...',
                'category' => 'milestone',
                'heart_color' => 'from-pink-500 to-rose-500',
                'is_featured' => true,
            ],
        ];

        foreach ($memoryData as $data) {
            $cover = Media::create([
                'mediable_type' => Memory::class,
                'mediable_id' => Str::uuid(), // placeholder, reassigned below
                'type' => 'photo',
                'file_path' => 'memories/'.Str::slug($data['title']).'-cover.jpg',
            ]);

            $memory = Memory::create([
                'user_id' => $smadar->id,
                'slug' => Str::slug($data['title']),
                'cover_media_id' => $cover->id,
                ...$data,
            ]);

            $cover->update(['mediable_id' => $memory->id]);

            Media::create([
                'mediable_type' => Memory::class,
                'mediable_id' => $memory->id,
                'type' => 'photo',
                'file_path' => 'memories/'.Str::slug($data['title']).'-gallery-1.jpg',
                'sort_order' => 1,
            ]);
        }

        // --- Letters (birthday + "open when") ---
        Letter::create([
            'user_id' => $smadar->id,
            'type' => 'birthday',
            'title' => 'To My Sweet Smadar, Across the Miles',
            'preview' => 'To my dearest Smadar, on your special day...',
            'content' => "My beautiful Smadar,\n\nI am writing this to you with all my heart...",
            'signature' => 'Yours completely, holding you close',
        ]);

        Letter::create([
            'user_id' => $smadar->id,
            'type' => 'open_when',
            'trigger_label' => "Open when you're sad",
            'title' => "Open when you're sad",
            'preview' => 'To my precious baby, when the light feels a bit dim...',
            'content' => "My sweet Smadar,\n\nIt breaks my heart to know that you are feeling sad...",
            'signature' => 'Your protector, Toluwani',
            'emoji' => '🥺',
            'color_theme' => 'bg-rose-50/90 border-rose-300',
        ]);

        // --- Important dates ---
        ImportantDate::create([
            'user_id' => $smadar->id,
            'title' => "Smadar's Birthday",
            'event_date' => '2026-07-17',
            'is_recurring' => true,
            'reminder_days_before' => 7,
        ]);

        // --- Time capsule ---
        TimeCapsule::create([
            'user_id' => $smadar->id,
            'title' => 'For the day we finally close the distance',
            'message' => 'By the time you read this, I hope we are in the same room...',
            'unlock_date' => now()->addMonths(6)->toDateString(),
        ]);

        // --- Future dreams ---
        FutureDream::create([
            'user_id' => $smadar->id,
            'title' => 'Walk together in the Montreal snow',
            'description' => 'First winter together, in person, holding hands the whole time.',
            'target_date' => now()->addYear()->toDateString(),
            'status' => 'dreaming',
        ]);

        // --- Songs & playlist ---
        $song1 = Song::create([
            'title' => 'Coffee Date Anthem',
            'artist' => 'Sample Artist',
            'provider' => 'spotify',
            'external_url' => 'https://open.spotify.com/track/sample1',
            'note' => 'Playing this during our first video call.',
            'added_by' => $toluwani->id,
        ]);

        $song2 = Song::create([
            'title' => 'Miles Apart',
            'artist' => 'Another Artist',
            'provider' => 'youtube',
            'external_url' => 'https://youtube.com/watch?v=sample2',
            'note' => 'This one always makes me think of you.',
            'added_by' => $toluwani->id,
        ]);

        $playlist = Playlist::create([
            'user_id' => $smadar->id,
            'name' => 'Coffee Date Mix',
            'description' => 'Songs for our late-night video calls.',
        ]);

        $playlist->songs()->attach([
            $song1->id => ['position' => 1],
            $song2->id => ['position' => 2],
        ]);

        // --- TED chat log ---
        TedInteraction::create([
            'user_id' => $smadar->id,
            'sender' => 'ted',
            'message' => "Good morning, Smadar. I've been waiting to see you.",
            'interaction_type' => 'greeting',
        ]);

        TedInteraction::create([
            'user_id' => $smadar->id,
            'sender' => 'user',
            'message' => 'Hi TED, I had a stressful day today.',
            'interaction_type' => 'chat',
        ]);

        // --- Notifications ---
        Notification::create([
            'user_id' => $smadar->id,
            'type' => 'daily_greeting',
            'title' => 'TED is waiting to say good morning',
            'channel' => 'in_app',
            'scheduled_at' => now()->addDay()->setTime(8, 0),
        ]);

        // --- Settings ---
        Setting::create(['user_id' => $smadar->id, 'key' => 'theme', 'value' => ['mode' => 'cozy-light']]);
        Setting::create(['user_id' => $smadar->id, 'key' => 'notifications_enabled', 'value' => ['daily_greeting' => true, 'period_reminders' => true]]);

        // --- Acrostic entries (S-M-A-D-A-R) ---
        $acrostic = [
            ['letter' => 'S', 'word' => 'Sincere', 'badge' => 'Miss Sincerity', 'meaning' => 'An honest and trustworthy person', 'story' => 'You are one of the most honest people I know.'],
            ['letter' => 'M', 'word' => 'My Anchor', 'badge' => 'Our Grounding Force', 'meaning' => 'My coping mechanism when life is lifeing.', 'story' => "You're the one I take comfort in."],
            ['letter' => 'A', 'word' => 'Absolutely Adorable', 'badge' => 'My pookie', 'meaning' => 'So adorable my heart melts every time.', 'story' => 'Your smile lights up my whole day.'],
            ['letter' => 'D', 'word' => 'Darling', 'badge' => 'My loff', 'meaning' => 'Sweetheart, I love you and your name.', 'story' => 'Everything about you makes me fall for you more.'],
            ['letter' => 'A', 'word' => 'Amazing', 'badge' => 'My Amazing baby', 'meaning' => 'The prettiest laugh and my favorite daily happiness.', 'story' => 'Your laugh is my absolute favorite sound.'],
            ['letter' => 'R', 'word' => 'Rare Treasure', 'badge' => 'One in a Billion', 'meaning' => 'A beautiful soul I will cherish forever.', 'story' => 'I built this sanctuary because you deserve to be celebrated.'],
        ];

        foreach ($acrostic as $i => $entry) {
            AcrosticEntry::create([...$entry, 'sort_order' => $i]);
        }
    }
}
