// Speech output (Text-to-Speech) via the browser's Web Speech API.
// Works offline when the device has a voice for the language installed.

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const base = lang.split("-")[0].toLowerCase();
  return (
    voices.find((v) => v.lang.replace("_", "-").toLowerCase() === lang.toLowerCase()) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(base))
  );
}

export function hasVoice(lang: string): boolean {
  return ttsSupported() && !!pickVoice(lang);
}

function clean(text: string): string {
  return text.replace(/…/g, " ");
}

/** Speaks text and resolves when finished (or immediately if unsupported). */
export function speak(text: string, lang: string, rate = 1): Promise<void> {
  return new Promise((resolve) => {
    if (!ttsSupported()) return resolve();
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(clean(text));
    u.lang = lang;
    u.rate = rate;
    const v = pickVoice(lang);
    if (v) u.voice = v;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    synth.speak(u);
  });
}

export function stopSpeaking(): void {
  if (ttsSupported()) window.speechSynthesis.cancel();
}

// Voices load asynchronously in some browsers – trigger loading early.
if (ttsSupported()) {
  window.speechSynthesis.getVoices();
}
