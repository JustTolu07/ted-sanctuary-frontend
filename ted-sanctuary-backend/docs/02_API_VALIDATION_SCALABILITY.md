# API Structure, Validation, and Scalability

## 1. REST API structure

All routes under `/api/v1`, auth via Sanctum (single-tenant app, but session/token
auth still makes sense since two people log in from different devices).

```
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me

GET    /api/v1/home                      # aggregated: today's greeting quote,
                                          # today's mood status, memory-of-the-day,
                                          # dual clocks (derived, not stored)

# Mood
GET    /api/v1/mood-entries
POST   /api/v1/mood-entries
GET    /api/v1/mood-entries/{id}
PATCH  /api/v1/mood-entries/{id}
DELETE /api/v1/mood-entries/{id}

# Care / cycle
GET    /api/v1/period-logs
POST   /api/v1/period-logs
PATCH  /api/v1/period-logs/{id}
DELETE /api/v1/period-logs/{id}
GET    /api/v1/cycle-predictions/latest   # recomputed on demand or served from cache
GET    /api/v1/ted-insights               # read-only, derived from mood/period history

# Our Story
GET    /api/v1/memories
POST   /api/v1/memories
GET    /api/v1/memories/{id}
PATCH  /api/v1/memories/{id}
DELETE /api/v1/memories/{id}
POST   /api/v1/memories/{id}/media        # attach photo/video/voice note
DELETE /api/v1/media/{id}

GET    /api/v1/time-capsules
POST   /api/v1/time-capsules
GET    /api/v1/time-capsules/{id}         # 403/locked response if unlock_date not reached
POST   /api/v1/time-capsules/{id}/media

GET    /api/v1/future-dreams
POST   /api/v1/future-dreams
PATCH  /api/v1/future-dreams/{id}

GET    /api/v1/important-dates
POST   /api/v1/important-dates

# Letters
GET    /api/v1/letters?type=open_when
GET    /api/v1/letters/{id}
POST   /api/v1/letters/{id}/open          # marks opened_at, increments open_count

# Songs / playlists
GET    /api/v1/songs
POST   /api/v1/songs
GET    /api/v1/playlists
POST   /api/v1/playlists
POST   /api/v1/playlists/{id}/songs       # attach {song_id, position}
DELETE /api/v1/playlists/{id}/songs/{songId}

# TED
GET    /api/v1/ted/interactions           # paginated chat history
POST   /api/v1/ted/interactions           # send a message, get TED's reply
GET    /api/v1/ted/memories               # what TED has learned
POST   /api/v1/ted/memories               # teach TED a fact manually

# Notifications & settings
GET    /api/v1/notifications
PATCH  /api/v1/notifications/{id}/read
GET    /api/v1/settings
PUT    /api/v1/settings/{key}
```

Conventions: plural nouns, nested attach/detach endpoints for pivots
(`playlists/{id}/songs`), sub-resources use their parent's ID in the path only
where the child truly can't exist independently (`memories/{id}/media`); a
first-class `media` resource still gets its own `DELETE` since one photo can be
deleted without touching its parent.

## 2. Validation rules (Form Request highlights)

```php
// StoreMoodEntryRequest
'mood' => 'required|in:great,good,okay,low,rough',
'emoji' => 'nullable|string|max:8',
'note' => 'nullable|string|max:2000',
'entry_date' => 'required|date|before_or_equal:today',
'energy_level' => 'nullable|integer|between:1,5',
// + unique(user_id, entry_date) enforced via Rule::unique('mood_entries')
//   ->where('user_id', auth()->id())->ignore($this->route('mood_entry'))

// StorePeriodLogRequest
'start_date' => 'required|date|before_or_equal:today',
'end_date' => 'nullable|date|after_or_equal:start_date',
'flow_intensity' => 'nullable|in:light,medium,heavy',
'symptoms' => 'nullable|array',
'symptoms.*' => 'string|max:50',

// StoreMemoryRequest
'title' => 'required|string|max:255',
'description' => 'required|string|max:1000',
'detailed_story' => 'required|string|max:10000',
'category' => 'required|in:adventure,cozy,milestone,romantic',
'memory_date' => 'nullable|date',
'date_label' => 'nullable|string|max:100',

// StoreLetterRequest
'type' => 'required|in:birthday,open_when,custom',
'trigger_label' => 'required_if:type,open_when|string|max:255',
'title' => 'required|string|max:255',
'content' => 'required|string|max:20000',
'unlock_at' => 'nullable|date|after:now',

// StoreMediaRequest
'type' => 'required|in:photo,video,voice_note',
'file' => 'required|file|max:51200|mimes:jpg,jpeg,png,heic,mp4,mov,m4a,mp3',
'caption' => 'nullable|string|max:500',
'taken_at' => 'nullable|date',

// StoreTimeCapsuleRequest
'title' => 'required|string|max:255',
'message' => 'required|string|max:10000',
'unlock_date' => 'required|date|after:today',

// StoreSongRequest
'title' => 'required|string|max:255',
'artist' => 'nullable|string|max:255',
'provider' => 'nullable|in:spotify,youtube,soundcloud,other',
'external_url' => 'nullable|url|max:2048',
'note' => 'nullable|string|max:1000',

// StoreTedInteractionRequest
'message' => 'required|string|max:4000',
'interaction_type' => 'nullable|in:chat,greeting,check_in',

// UpdateSettingRequest
'value' => 'required', // shape depends on key; validate per-key in the controller
```

General rules applied everywhere: `Str::slug()` uniqueness checks are scoped
per-table (not per-user, since this is single-tenant); all date comparisons
use the user's stored `timezone`, not server time, so "today" means Smadar's
today; file uploads validated by MIME + size before touching storage, and
streamed to S3-compatible storage rather than the local disk.

## 3. Scalability & future-proofing notes

- **EAV tables (`ted_memories`, `settings`) absorb schema growth.** New TED
  facts or new app settings ship as data, not migrations — this is the single
  biggest lever for keeping the schema stable as features grow.
- **`cycle_predictions` and TED insights are computed, cached, and
  regenerated** — never becomes a second source of truth that drifts from
  `period_logs`/`mood_entries`.
- **Media stays out of the database.** `media.file_path` stores an object-key,
  actual bytes live in S3/R2/Spaces behind a CDN — the DB never grows past
  metadata, so switching storage backends later doesn't touch the schema.
- **UUIDs make a future move to offline-first/local-first sync trivial** (e.g.
  a mobile app that writes locally and syncs later) since IDs never collide.
- **Read-heavy home/dashboard queries** (today's mood, latest cycle
  prediction, next unlock date) are natural candidates for a lightweight
  cache layer (Redis, 60–300s TTL) once interaction volume grows — none of
  the schema needs to change to add this.
- **If this ever needs to support more than one couple** (unlikely by design,
  but worth naming): the only structural change needed is introducing a
  `households` table and adding `household_id` to the currently-implicit
  "shared" tables (`memories`, `letters`, `songs`, `playlists`) — every table
  already scopes through `user_id`, so this is additive, not a rewrite.
- **`ted_interactions.context_used` (JSON)** stores which `ted_memories` rows
  informed a given reply — this is what would let a future version show "TED
  remembered X" or retrain/audit its personalization logic without any schema
  change.
- **Soft deletes** are worth adding to `memories`, `letters`, and `media` in
  particular (`SoftDeletes` trait + `deleted_at` column) so an accidental
  delete of something irreplaceable (a memory, a voice note) is recoverable —
  omitted from the initial migrations to keep them minimal, but it's a
  one-line addition per table when needed.
