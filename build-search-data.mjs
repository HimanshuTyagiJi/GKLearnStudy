import fs from "fs";
import path from "path";

// dist folder path
const outputDir = path.join(".", "dist");

// अगर folder नहीं है तो बनाओ
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// search-data.json को dist में लिखो
fs.writeFileSync(
  path.join(outputDir, "search-data.json"),
  JSON.stringify(data, null, 2)
);

console.log(
  `✅ search-data.json has been generated successfully in ${outputDir} with ${data.length} entries!`
);
