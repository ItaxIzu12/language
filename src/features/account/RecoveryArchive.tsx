import { useStore } from "../../state/learningStore";

export default function RecoveryArchive() {
  const { username, lang } = useStore();
  const prefix = "linguaflow.recovery." + JSON.stringify([username, lang.code]) + ".";
  let keys: string[] = [];
  try {
    keys = Object.keys(localStorage)
      .filter((key) => key.startsWith(prefix))
      .sort()
      .reverse();
  } catch {
    return null;
  }
  if (!keys.length) return null;
  function download(key: string, side: "device" | "server") {
    const archive = JSON.parse(localStorage.getItem(key)!);
    const state = side === "device" ? archive.device : archive.server.document;
    if (!state) return;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify({ app: "linguaflow", lang: lang.code, ...state }, null, 2)], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `linguaflow-recovery-${side}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <details className="my-3">
      <summary>Wiederherstellungsarchiv dieses Geräts</summary>
      <p className="my-2">
        Lade einen früheren Stand herunter. Unter „Daten“ kannst du ihn bei Bedarf wieder einlesen.
      </p>
      <ul>
        {keys.map((key) => (
          <li className="my-3" key={key}>
            <span>{new Date(Number(key.slice(prefix.length))).toLocaleString("de-DE")}</span>
            <button className="btn-line ml-2" onClick={() => download(key, "device")}>
              Gerätesicherung
            </button>
            <button className="btn-line ml-2" onClick={() => download(key, "server")}>
              Serversicherung
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
