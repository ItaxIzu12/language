import { languages } from "../../languages/registry";
export type { Scenario } from "../../languages/types";
export const getScenarios = (language: string) => languages.find((item) => item.code === language)?.scenarios ?? [];
export const scenarioKey = (language: string, id: string) => `scenario:${language}:${id}`;
