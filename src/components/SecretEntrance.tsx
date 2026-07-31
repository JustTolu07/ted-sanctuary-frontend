import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Smile, Sun, HelpCircle, X, Gift } from 'lucide-react';

async function sha256(message: string) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default function SecretEntrance({ onUnlock }: { onUnlock: () => void }) {
  const [question, setQuestion] = useState<string>('How do you usually say hello to me?');
  const [hint, setHint] = useState<string>('Think about our usual greeting...');
  const [input, setInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storedHash, setStoredHash] = useState<string | null>(null);

  const STORAGE_Q = 'smadar_secret_question';
  const STORAGE_HINT = 'smadar_secret_hint';
  const STORAGE_HASH = 'smadar_secret_answer_hash';

  useEffect(() => {
    // Load configured question/hint/answer-hash from localStorage if present
    const q = localStorage.getItem(STORAGE_Q);
    const h = localStorage.getItem(STORAGE_HINT);
    const hash = localStorage.getItem(STORAGE_HASH);
    if (q) setQuestion(q);
    if (h) setHint(h);

    const initializeHash = async () => {
      if (hash) {
        setStoredHash(hash);
      } else {
        // default answer: "sunrisekiss" — harmless but private
        const hx = await sha256('sunrisekiss');
        localStorage.setItem(STORAGE_HASH, hx);
        setStoredHash(hx);
      }
    };

    initializeHash();
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!storedHash) {
      setFeedback('TED is still waking up. Please wait a moment and try again.');
      return;
    }

    setLoading(true);
    setFeedback(null);
    const answerHash = await sha256(input.trim().toLowerCase());
    // gentle timing delay to make it feel thoughtful
    setTimeout(() => {
      if (answerHash === storedHash) {
        // success
        setFeedback("Welcome home, Smadar. I've been waiting for you. ❤️");
        localStorage.setItem('smadar_is_logged_in', 'true');
        setTimeout(() => onUnlock(), 900);
      } else {
        setFeedback("Hmm... That doesn't sound like something we'd say. Try again ❤️");
      }
      setLoading(false);
    }, 700);
  };

  // Dev helper: set secret (visible only in dev)
  const devSetSecret = async () => {
    const q = prompt('Question (e.g. How do I say hello?)', question) || question;
    const h = prompt('Hint (short) ', hint) || hint;
    const ans = prompt('Answer (cleartext) — this will be hashed locally', 'sunrisekiss') || 'sunrisekiss';
    const hh = await sha256(ans.trim().toLowerCase());
    localStorage.setItem(STORAGE_Q, q);
    localStorage.setItem(STORAGE_HINT, h);
    localStorage.setItem(STORAGE_HASH, hh);
    setQuestion(q);
    setHint(h);
    alert('Secret updated (dev only).');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#241323] to-[#2A1828] text-white flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-xl w-full bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md"
      >
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg">
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-4xl">🧸</div>
            </motion.div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-serif font-bold">Welcome home, beautiful. <span className="text-rose-300">❤️</span></h1>
            <p className="mt-2 text-sm text-white/85">This little corner of the internet was built only for you. Before we begin, TED has a tiny question only you would know.</p>

            <form onSubmit={(e) => handleSubmit(e)} className="mt-4">
              <div className="text-sm text-white/90 mb-2">{question}</div>
              <div className="flex gap-2">
                <input
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none placeholder-white/60"
                  placeholder="Type your answer..."
                />
                <button type="button" onClick={() => setShowHint(true)} className="px-3 py-2 rounded-xl bg-white/10">Need a hint?</button>
              </div>

              {showHint && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-white/70 p-3 rounded-lg bg-white/5 border border-white/6">
                  <div className="flex items-center justify-between">
                    <div>{hint}</div>
                    <button onClick={() => setShowHint(false)} className="ml-2 p-1 rounded-full bg-white/8"><X className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              )}

              <div className="mt-4 flex items-center justify-between gap-3">
                <button type="submit" disabled={loading || !storedHash} className="px-6 py-3 bg-rose-500 hover:bg-rose-600 rounded-2xl font-semibold disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? 'Thinking...' : !storedHash ? 'Waking up TED...' : 'Enter Sanctuary'}
                </button>
                <button type="button" onClick={() => { setInput(''); setFeedback(null); }} className="px-4 py-2 bg-white/5 rounded-xl">Clear</button>
              </div>

              {feedback && <div className="mt-3 text-sm text-white/90">{feedback}</div>}
            </form>

            <div className="mt-4 text-xs text-white/60">TED will never ask for your password. This is our little, private door.</div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 border-t border-white/6 pt-3 text-xs">
                <div className="flex items-center gap-2">
                  <button onClick={devSetSecret} className="px-3 py-2 bg-white/10 rounded">Set Secret (dev)</button>
                  <div className="text-white/60">(dev only)</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
