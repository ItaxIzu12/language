import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({ title, children, confirmLabel, onConfirm, onCancel }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return createPortal(
    <dialog
      ref={ref}
      aria-labelledby={id}
      aria-describedby={id + "-description"}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[min(90vw,26rem)] overflow-auto rounded-xl bg-paper p-6 text-ink shadow-xl backdrop:bg-black/60"
    >
      <h2 id={id} className="text-xl font-bold">
        {title}
      </h2>
      <p id={id + "-description"} className="my-4 break-words">
        {children}
      </p>
      <div className="flex flex-wrap justify-end gap-2">
        <button type="button" autoFocus className="btn-line" onClick={onCancel}>
          Abbrechen
        </button>
        <button type="button" className="btn-ink" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>,
    document.body,
  );
}
