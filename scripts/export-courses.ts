// The image build uses the same registry and parsing rules used in the offline frontend.
import { writeFileSync } from "node:fs";
import { languages } from "../src/data/languages";

const courses = languages.filter(l => l.available).map(({ culture, ...course }) => ({
  ...course, theme: culture.theme,
}));
writeFileSync(process.argv[2], JSON.stringify(courses));
