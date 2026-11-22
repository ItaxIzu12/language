import type { VocabItem } from "../../languages/types";
import { useStore } from "../../state/learningStore";

/** Optional content, shared by every language; never infer a split from spelling. */
export default function WordUnderstanding({ word }: { word: VocabItem }) {
  const { lang } = useStore();
  const content = word.understanding;
  // Imported personal backups may predate validation; malformed optional content is ignored.
  if (
    !content ||
    !Array.isArray(content.parts) ||
    content.parts.length < 2 ||
    typeof content.explanation !== "string" ||
    typeof content.sourceNote !== "string" ||
    !["draft", "reviewed"].includes(content.status) ||
    (content.mnemonic !== undefined && typeof content.mnemonic !== "string") ||
    content.parts.some(
      (part) =>
        !part ||
        typeof part.target !== "string" ||
        typeof part.meaning !== "string" ||
        (part.reading !== undefined && typeof part.reading !== "string"),
    )
  )
    return null;
  return (
    <details className="my-4 rounded-lg border border-rule bg-paper p-4">
      <summary className="cursor-pointer py-1 text-base font-bold focus-visible:outline focus-visible:outline-2">
        Wort verstehen <span className="ml-2 text-sm font-normal text-dim">Bestandteile und Bedeutung</span>
      </summary>
      <div className="mt-4 space-y-4">
        <ol aria-label="Wortbestandteile in ihrer Reihenfolge" className="flex flex-wrap gap-3">
          {content.parts.map((part, index) => (
            <li key={index} className="min-w-0 flex-1 basis-28 border-l-2 border-cinnabar pl-3">
              <span lang={lang.code} className="block break-words text-2xl font-semibold">
                {part.target}
              </span>
              {part.reading && <span className="reading block text-sm">{part.reading}</span>}
              <span className="block text-sm">{part.meaning}</span>
            </li>
          ))}
        </ol>
        <p className="text-base leading-relaxed">{content.explanation}</p>
        {content.mnemonic && (
          <p className="text-sm">
            <strong>Merkhilfe:</strong> {content.mnemonic}
          </p>
        )}
        <p className="text-xs text-dim">
          {content.status === "draft" ? "Redaktioneller Entwurf · " : "Redaktionell geprüft · "}
          {content.sourceNote}
        </p>
      </div>
    </details>
  );
}
