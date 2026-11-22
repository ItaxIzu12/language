import type { ComponentType } from "react";
import MandarinHome from "../languages/zh/presentation/MandarinHome";
import TonePractice from "../languages/zh/exercises/tones/TonePractice";

/** UI extensions are separate from the data registry consumed by the backend exporter. */
export const languageViews: Record<string, { Home?: ComponentType }> = {
  zh: { Home: MandarinHome },
};

export const toneViews = { mandarin: TonePractice };
